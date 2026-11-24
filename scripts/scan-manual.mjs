// Pemindai kurs provider tanpa API. Jalankan: node scripts/scan-manual.mjs [alias ...]
// Hasil sukses ditulis ke data/manual-rates.json; yang gagal dilewati (entri lama tetap, kedaluwarsa 3 hari).
import { readFileSync, writeFileSync } from 'node:fs'
import { loadPlaywright } from './providers/_util.mjs'

const adapters = {}
for (const n of ['remitly', 'brastel', 'smiles', 'cityexpress']) adapters[n] = await import(`./providers/${n}.mjs`)
const only = process.argv.slice(2)
const file = new URL('../data/manual-rates.json', import.meta.url)
const data = JSON.parse(readFileSync(file))
const today = new Date(Date.now() + 7 * 3600e3).toISOString().slice(0, 10) // tanggal WIB

let mid = null
try { mid = (await (await fetch('https://api.frankfurter.app/latest?from=JPY&to=IDR')).json()).rates.IDR } catch {}

const { chromium } = loadPlaywright()
const browser = await chromium.launch()
let failed = 0
for (const mod of Object.values(adapters)) {
  const alias = mod.alias
  if (only.length && !only.includes(alias)) continue
  const ctx = await browser.newContext({ locale: 'en-US', viewport: { width: 1280, height: 900 } })
  const page = await ctx.newPage()
  try {
    const r = await mod.scan(page)
    if (!(r.rate > 0)) throw new Error('kurs tidak valid')
    if (mid && (r.rate < mid * 0.85 || r.rate > mid * 1.15)) throw new Error(`kurs ${r.rate} jauh dari kurs tengah ${mid}`)
    data.rates[alias] = { ...r, updatedAt: today }
    console.log('OK  ', alias, JSON.stringify(r))
  } catch (e) {
    failed++
    console.error('GAGAL', alias, '-', e.message.split('\n')[0])
  }
  await ctx.close()
}
await browser.close()
writeFileSync(file, JSON.stringify(data, null, 2) + '\n')
process.exit(failed ? 1 : 0)
