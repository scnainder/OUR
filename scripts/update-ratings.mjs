// Rating & jumlah ulasan App Store (iTunes Lookup, toko Jepang) + Play Store. Output: public/ratings.json
import { readFileSync, writeFileSync } from 'node:fs'
import gplay from 'google-play-scraper'

const cfg = JSON.parse(readFileSync(new URL('../data/providers.json', import.meta.url))).providers
const prev = (() => { try { return JSON.parse(readFileSync(new URL('../public/ratings.json', import.meta.url))).ratings } catch { return {} } })()
const ratings = {}

for (const c of cfg) {
  const r = { ...(prev[c.alias] ?? {}) }
  try {
    const d = await (await fetch(`https://itunes.apple.com/lookup?id=${c.iosId}&country=jp`)).json()
    const a = d.results?.[0]
    if (a?.averageUserRating) r.ios = { score: +a.averageUserRating.toFixed(2), count: a.userRatingCount, url: a.trackViewUrl }
  } catch (e) { console.error('ios gagal', c.alias, e.message) }
  try {
    const a = await gplay.app({ appId: c.playId, country: 'jp', lang: 'ja' })
    if (a.score) r.play = { score: +a.score.toFixed(2), count: a.ratings, url: `https://play.google.com/store/apps/details?id=${c.playId}` }
  } catch (e) { console.error('play gagal', c.alias, e.message) }
  ratings[c.alias] = r
}
writeFileSync(new URL('../public/ratings.json', import.meta.url), JSON.stringify({ updatedAt: new Date().toISOString(), ratings }, null, 2) + '\n')
console.log('OK', Object.entries(ratings).map(([k, v]) => `${k}: ios ${v.ios?.score ?? '-'} play ${v.play?.score ?? '-'}`).join(' | '))
