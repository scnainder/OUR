// Ambil kurs JPY -> IDR dari API perbandingan Wise + kurs tengah (mid-market).
// Jalankan: node scripts/update-rates.mjs  -> menulis public/rates.json
import { readFileSync, writeFileSync } from 'node:fs'

const AMOUNTS = [50000, 100000, 300000, 500000, 1000000]
const cfg = JSON.parse(readFileSync(new URL('../data/providers.json', import.meta.url)))
const byAlias = Object.fromEntries(cfg.providers.map((p) => [p.alias, p]))

async function getJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'kurs-bot/1.0' } })
  if (!res.ok) throw new Error(`${url} -> ${res.status}`)
  return res.json()
}

const quotesByAlias = {}
for (const amount of AMOUNTS) {
  const url = `https://api.wise.com/v4/comparisons/?sourceCurrency=JPY&targetCurrency=IDR&sendAmount=${amount}&sourceCountry=JP&targetCountry=ID`
  try {
    const data = await getJson(url)
    for (const p of data.providers ?? []) {
      const q = p.quotes?.[0]
      if (!q || !q.rate) continue
      quotesByAlias[p.alias] ??= { name: p.name, byAmount: {} }
      quotesByAlias[p.alias].byAmount[amount] = {
        rate: q.rate,
        fee: q.fee,
        received: q.receivedAmount,
        collectedAt: q.dateCollected,
      }
    }
  } catch (e) {
    console.error('gagal ambil', amount, e.message)
  }
}

let mid = null
try {
  mid = (await getJson('https://api.frankfurter.app/latest?from=JPY&to=IDR')).rates.IDR
} catch (e) {
  console.error('gagal ambil mid-market', e.message)
}

if (Object.keys(quotesByAlias).length === 0) {
  console.error('Tidak ada data, rates.json tidak ditimpa.')
  process.exit(1)
}

const providers = []
for (const [alias, q] of Object.entries(quotesByAlias)) {
  const c = byAlias[alias]
  providers.push({ alias, name: c?.name ?? q.name, affiliateUrl: c?.affiliateUrl ?? null, auto: true, quotes: q.byAmount })
}
for (const c of cfg.providers) {
  if (!quotesByAlias[c.alias]) providers.push({ alias: c.alias, name: c.name, affiliateUrl: c.affiliateUrl, auto: false, quotes: {} })
}

writeFileSync(
  new URL('../public/rates.json', import.meta.url),
  JSON.stringify({ updatedAt: new Date().toISOString(), amounts: AMOUNTS, midMarket: mid, providers }, null, 2) + '\n'
)
console.log('OK', providers.length, 'provider')
