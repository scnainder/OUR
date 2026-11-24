import { bodyText, num, must, waitText } from './_util.mjs'
export const alias = 'brastel'
// Kurs: halaman /eng/rates (baris Indonesia, setoran bank). Biaya bertingkat: /eng/fees setelah memilih Indonesia.
export async function scan(page) {
  await page.goto('https://www.brastelremit.jp/eng/rates', { waitUntil: 'domcontentloaded', timeout: 30000 })
  await waitText(page, /Indonesia[\s|]*1\s*JPY\s*=[\s|]*[\d.,]+\s*IDR/)
  const r = await bodyText(page)
  const rate = must(r.match(/Indonesia[\s|]*1\s*JPY\s*=[\s|]*([\d.,]+)\s*IDR/), 'Kurs Indonesia tidak ditemukan')
  await page.goto('https://www.brastelremit.jp/eng/fees', { waitUntil: 'domcontentloaded', timeout: 30000 })
  await page.waitForTimeout(3000)
  await page.selectOption('select', { label: 'Indonesia' })
  await waitText(page, /Transfer Fee[\s\S]{0,40}From\s*¥/)
  const f = await bodyText(page)
  const tiers = [...f.matchAll(/From\s*¥([\d,]+)\s*to\s*¥([\d,]+)\s+¥([\d,]+)/g)].map((m) => [num(m[2]), num(m[3])])
  if (tiers.length < 3) throw new Error('Tabel biaya tidak ditemukan')
  const max = f.match(/Max\.\s*remittance\s*amount\s*per\s*transaction\s*¥([\d,]+)/)
  return { rate: num(rate[1]), tiers, max: max ? num(max[1]) : null, note: 'Belum termasuk biaya transfer bank di Jepang ke rekening Brastel' }
}
