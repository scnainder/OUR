import { bodyText, num, must } from './_util.mjs'
export const alias = 'remitly'
// Kalkulator default menampilkan tarif PROMO pelanggan baru. Tarif standar baru muncul untuk nominal > ¥100.000,
// maka kita isi ¥300.000 lalu baca "Standard rate". Biaya dasar ¥100 (rata untuk semua nominal yang dites).
export async function scan(page) {
  await page.goto('https://www.remitly.com/jp/en/indonesia', { waitUntil: 'domcontentloaded', timeout: 30000 })
  await page.waitForTimeout(4000)
  const a = page.locator('#calculator-send')
  await a.click(); await a.fill(''); await a.type('300000', { delay: 40 })
  await page.waitForTimeout(3500)
  const t = await bodyText(page)
  const std = must(t.match(/Standard rate\s*1 JPY\s*=\s*([\d.,]+)\s*IDR/i), 'Standard rate tidak ditemukan')
  const fee = must(t.match(/Fee\s*\|\s*JPY\s*([\d,]+)/i), 'Fee tidak ditemukan')
  const promo = t.match(/Welcome rate\s*\|\s*1 JPY\s*=\s*([\d.,]+)\s*IDR/i)
  return {
    rate: num(std[1]),
    fee: num(fee[1]),
    note: promo ? `Promo pelanggan baru: ¥1 = Rp ${promo[1]}, bebas biaya (untuk ¥100.000 pertama)` : null,
  }
}
