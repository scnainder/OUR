// Kurs JPY -> IDR: API Wise Comparisons + scrape sederhana + data manual. Output: public/rates.json
import { readFileSync, writeFileSync } from 'node:fs'

const AMOUNTS = [10000, 30000, 50000, 100000, 200000, 300000, 500000, 1000000, 2000000]
const CHIPS = [50000, 100000, 300000, 500000, 1000000]
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
      ;(wise[p.alias] ??= []).push({ amount, rate: q.rate, fee: q.fee })
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
  let model = null, source = 'none', asOf = null
  if (c.rateSource === 'wise-api' && wise[c.alias]?.length) {
    // titik (nominal, kurs, biaya); halaman menginterpolasi untuk nominal bebas
    model = { type: 'points', points: wise[c.alias].sort((a, b) => a.amount - b.amount) }
    source = 'api'; asOf = new Date().toISOString()
  } else if (c.rateSource === 'scrape') {
    try {
      const rate = await scrape(c.scrapeUrl)
      if (rate && sane(rate)) { model = { type: 'flat', rate, fee: null, feePct: 0, feeKnown: false }; source = 'scrape'; asOf = new Date().toISOString() }
    } catch (e) { console.error('scrape gagal', c.alias, e.message) }
  }
  const m = manual[c.alias]
  if (!model && m?.rate && sane(m.rate)) {
    const ageDays = (Date.now() - new Date(m.updatedAt).getTime()) / 864e5
    if (ageDays <= MANUAL_MAX_AGE_DAYS) {
      model = { type: 'flat', rate: m.rate, fee: m.fee ?? 0, feePct: m.feePct ?? 0, feeKnown: m.fee != null || m.feePct != null }
      source = 'manual'; asOf = new Date(m.updatedAt).toISOString()
    }
  }
  providers.push({ alias: c.alias, name: c.name, affiliateUrl: c.affiliateUrl, source, asOf, model })
}

if (!providers.some((p) => p.source !== 'none')) { console.error('Tidak ada data, tidak menimpa.'); process.exit(1) }
writeFileSync(new URL('../public/rates.json', import.meta.url), JSON.stringify({ updatedAt: new Date().toISOString(), chips: CHIPS, minAmount: AMOUNTS[0], maxAmount: AMOUNTS.at(-1), midMarket: mid, providers }, null, 2) + '\n')
console.log('OK', providers.map((p) => `${p.alias}:${p.source}`).join(' '))
