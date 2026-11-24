import { bodyText, num, must, waitText } from './_util.mjs'
export const alias = 'city-express'
// Kurs: https://cityremit.com/en/exchange-rates/ (baris INDONESIA | IDR | kurs). Sama dengan kalkulator beranda.
// Biaya: https://cityremit.com/en/service-fees/ (panel Indonesia). Total yang dikirim sudah TERMASUK biaya:
// diterima = (total - biaya) x kurs (terverifikasi: ¥100.000 -> biaya ¥1.000 -> Rp 11.271.150 di kalkulator).
export async function scan(page) {
  await page.goto('https://cityremit.com/en/exchange-rates/', { waitUntil: 'domcontentloaded', timeout: 30000 })
  await waitText(page, /INDONESIA[\s|]*IDR[\s|]*[\d.]+/i)
  const r = await bodyText(page)
  const rate = must(r.match(/INDONESIA[\s|]*IDR[\s|]*([\d.,]+)/i), 'Kurs Indonesia tidak ditemukan')
  const upd = r.match(/Last updated\s*([^·|]+?)\s*(?:·|\|)/i)
  await page.goto('https://cityremit.com/en/service-fees/', { waitUntil: 'domcontentloaded', timeout: 30000 })
  await waitText(page, /AMOUNT RANGE[\s\S]*¥/)
  const f = await bodyText(page)
  const panel = must(f.match(/Indonesia[\s|]*AMOUNT RANGE([\s\S]*?)Maximum payout/i), 'Panel biaya Indonesia tidak ditemukan')[1]
  // kolom: rentang | cash pickup | bank transfer -> pakai bank transfer
  const tiers = [...panel.matchAll(/¥[\d,]+\s*[–-]\s*¥([\d,]+)[\s|]+¥([\d,]+)[\s|]+¥([\d,]+)/g)].map((m) => [num(m[1]), num(m[3])])
  if (tiers.length < 3) throw new Error('Tangga biaya tidak terbaca')
  return {
    rate: num(rate[1]),
    tiers,
    max: tiers.at(-1)[0],
    note: `Kurs indikatif (halaman City Express: diperbarui ${upd ? upd[1].trim() : 'tanggal tidak tertera'}); kurs final tampil di aplikasi`,
  }
}
