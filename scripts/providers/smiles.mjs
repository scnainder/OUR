import { bodyText, num, must, waitText } from './_util.mjs'
export const alias = 'smiles'
// Kurs: /japan/exchange-rates/ (baris Indonesia). Biaya: /japan/remittance-fee/ setelah memilih Indonesia di #country_chooser.
// Halaman menampilkan 3 tabel "Send with <Smiles | Ria | ...>" (logo berupa gambar); tabel PERTAMA = Smiles sendiri.
export async function scan(page) {
  await page.goto('https://www.smileswallet.com/japan/exchange-rates/', { waitUntil: 'domcontentloaded', timeout: 30000 })
  await waitText(page, /Indonesia\s+[\d.,]+\s*IDR/)
  const r = await bodyText(page)
  const rate = must(r.match(/Indonesia\s*\|\s*([\d.,]+)\s*IDR/), 'Kurs Indonesia tidak ditemukan')
  await page.goto('https://www.smileswallet.com/japan/remittance-fee/', { waitUntil: 'domcontentloaded', timeout: 30000 })
  await page.locator('#country_chooser').waitFor({ timeout: 20000 })
  await page.waitForTimeout(1500)
  await page.locator('#country_chooser').selectOption({ label: 'Indonesia' })
  await waitText(page, /Send\s+with[\s\S]*Send\s+with[\s\S]*Send\s+with/)
  const f = await bodyText(page)
  const blocks = f.split('Send with')
  if (blocks.length < 3) throw new Error('Tabel biaya tidak ditemukan (halaman berubah?)')
  const tiers = [...blocks[1].matchAll(/¥[\d,]+\s*~\s*¥([\d,]+)[\s|]+¥([\d,]+)/g)].map((m) => [num(m[1]), num(m[2])])
  if (tiers.length < 3) throw new Error('Tangga biaya Smiles tidak terbaca')
  return { rate: num(rate[1]), tiers, max: tiers.at(-1)[0], note: 'Biaya & kurs kirim lewat Smiles (bukan jalur Ria)' }
}
