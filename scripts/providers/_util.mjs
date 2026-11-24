import { createRequire } from 'node:module'
import { execSync } from 'node:child_process'

// Playwright di sesi cloud terpasang global; di GitHub Actions di-install global juga.
export function loadPlaywright() {
  const req = createRequire(import.meta.url)
  try { return req('playwright') } catch {}
  const root = execSync('npm root -g').toString().trim()
  return createRequire(root + '/')('playwright')
}
export const num = (s) => parseFloat(String(s).replace(/,/g, ''))
export const bodyText = async (page) => (await page.innerText('body')).replace(/\s*\n+\s*/g, ' | ')
export const must = (m, msg) => { if (!m) throw new Error(msg); return m }
// Tunggu sampai teks halaman cocok dengan pola (konten sering dimuat terlambat oleh JavaScript).
// Jika tidak muncul dalam batas waktu, halaman dimuat ulang sekali (situs penyedia kadang lambat).
export async function waitText(page, re, timeout = 30000) {
  const check = () => page.waitForFunction((src) => new RegExp(src).test(document.body.innerText), re.source, { timeout })
  try { await check() } catch { await page.reload({ waitUntil: 'domcontentloaded' }); await check() }
}
