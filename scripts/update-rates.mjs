// Kurs JPY -> IDR: API Wise Comparisons + scrape sederhana + data manual. Output: public/rates.json
import { readFileSync, writeFileSync } from 'node:fs'

const AMOUNTS = [50000, 100000, 300000, 500000, 1000000]
const MANUAL_MAX_AGE_DAYS = 3
const read = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url)))
const cfg = read('../data/providers.json').providers
const manual = read('../data/manual-rates.json').rates ?? {}

const getJson = async (url) => {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 kurs-bot' } })
  if (!res.ok) throw new Error(`${url} -> ${res.status}`)
  return res.json()
}

// 1) Wise comparisons
const wise = {}
for (const amount of AMOUNTS) {
  try {
    const data = await getJson(`https://api.wise.com/v4/comparisons/?sourceCurrency=JPY&targetCurrency=IDR&sendAmount=${amount}&sourceCountry=JP&targetCountry=ID`)
    for (const p of data.providers ?? []) {
      const q = p.quotes?.[0]
      if (!q?.rate) continue
      ;(wise[p.alias] ??= {})[amount] = { rate: q.rate, fee: q.fee, received: q.receivedAmount, feeKnown: true }
    }
  } catch (e) { console.error('wise gagal', amount, e.message) }
}

// 2) Mid-market
let mid = null
try { mid = (await getJson('https://api.frankfurter.app/latest?from=JPY&to=IDR')).rates.IDR } catch (e) { console.error('mid gagal', e.message) }

// sanity check: kurs harus dalam +-15% dari kurs tengah (cegah data salah scrape)
const sane = (rate) => !mid || (rate > mid * 0.85 && rate < mid * 1.15)

async function scrape(url) {
  const html = await (await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 kurs-bot' } })).text()
  const m = html.match(/1\s*JPY\s*=\s*([\d.,]+)\s*IDR/i)
  return m ? parseFloat(m[1].replace(/,/g, '')) : null
}

const providers = []
for (const c of cfg) {
  const quotes = {}
  let source = 'none', asOf = null
  if (c.rateSource === 'wise-api' && wise[c.alias]) {
    Object.assign(quotes, wise[c.alias]); source = 'api'; asOf = new Date().toISOString()
  } else if (c.rateSource === 'scrape') {
    try {
      const rate = await scrape(c.scrapeUrl)
      if (rate && sane(rate)) {
        for (const a of AMOUNTS) quotes[a] = { rate, fee: null, received: a * rate, feeKnown: false }
        source = 'scrape'; asOf = new Date().toISOString()
      }
    } catch (e) { console.error('scrape gagal', c.alias, e.message) }
  }
  const m = manual[c.alias]
  if (source === 'none' && m?.rate && sane(m.rate)) {
    const ageDays = (Date.now() - new Date(m.updatedAt).getTime()) / 864e5
    if (ageDays <= MANUAL_MAX_AGE_DAYS) {
      for (const a of AMOUNTS) quotes[a] = { rate: m.rate, fee: m.fee ?? null, received: a * m.rate - (m.fee ?? 0), feeKnown: m.fee != null }
      source = 'manual'; asOf = new Date(m.updatedAt).toISOString()
    }
  }
  providers.push({ alias: c.alias, name: c.name, affiliateUrl: c.affiliateUrl, source, asOf, quotes })
}

if (!providers.some((p) => p.source !== 'none')) { console.error('Tidak ada data, tidak menimpa.'); process.exit(1) }
writeFileSync(new URL('../public/rates.json', import.meta.url), JSON.stringify({ updatedAt: new Date().toISOString(), amounts: AMOUNTS, midMarket: mid, providers }, null, 2) + '\n')
console.log('OK', providers.map((p) => `${p.alias}:${p.source}`).join(' '))
