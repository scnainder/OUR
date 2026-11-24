'use client'

import { useEffect, useMemo, useState } from 'react'

type Quote = { rate: number; fee: number | null; received: number; feeKnown: boolean }
type Provider = { alias: string; name: string; affiliateUrl: string | null; source: 'api' | 'scrape' | 'manual' | 'none'; asOf: string | null; quotes: Record<string, Quote> }
type Rates = { updatedAt: string; amounts: number[]; midMarket: number | null; providers: Provider[] }
type Store = { score: number; count: number; url: string }
type Ratings = { updatedAt: string; ratings: Record<string, { ios?: Store; play?: Store }> }

const fmt = (n: number) => Math.round(n).toLocaleString('id-ID')
const fmtDate = (s: string) => new Date(s).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
const avg = (r?: { ios?: Store; play?: Store }) => {
  const xs = [r?.ios, r?.play].filter(Boolean) as Store[]
  const n = xs.reduce((s, x) => s + x.count, 0)
  return n ? xs.reduce((s, x) => s + x.score * x.count, 0) / n : 0
}

function Stars({ label, s }: { label: string; s?: Store }) {
  if (!s) return <span className="text-xs text-gray-400">{label} –</span>
  return (
    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-600 hover:underline">
      {label} <b className="text-amber-500">★ {s.score.toFixed(1)}</b> ({s.count.toLocaleString('id-ID')})
    </a>
  )
}

export default function KursTable() {
  const [rates, setRates] = useState<Rates | null>(null)
  const [ratings, setRatings] = useState<Ratings | null>(null)
  const [amount, setAmount] = useState(100000)
  const [sort, setSort] = useState<'kurs' | 'rating'>('kurs')
  const [error, setError] = useState(false)

  useEffect(() => {
    const t = Math.floor(Date.now() / 600000)
    fetch(`/rates.json?t=${t}`).then((r) => r.json()).then(setRates).catch(() => setError(true))
    fetch(`/ratings.json?t=${t}`).then((r) => r.json()).then(setRatings).catch(() => {})
  }, [])

  const { live, nodata } = useMemo(() => {
    if (!rates) return { live: [] as (Provider & { q: Quote; stars: number })[], nodata: [] as Provider[] }
    const withQ = rates.providers.filter((p) => p.quotes[amount]).map((p) => ({ ...p, q: p.quotes[amount], stars: avg(ratings?.ratings[p.alias]) }))
    withQ.sort((a, b) => (sort === 'rating' ? b.stars - a.stars : b.q.received - a.q.received))
    const nodata = rates.providers.filter((p) => !p.quotes[amount]).sort((a, b) => avg(ratings?.ratings[b.alias]) - avg(ratings?.ratings[a.alias]))
    return { live: withQ, nodata }
  }, [rates, ratings, amount, sort])

  if (error) return <p className="text-red-600">Gagal memuat kurs. Coba refresh halaman.</p>
  if (!rates) return <p className="text-gray-500">Memuat kurs…</p>

  const best = Math.max(0, ...live.map((p) => p.q.received))
  const bestAlias = [...live].sort((a, b) => b.q.received - a.q.received)[0]?.alias

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        {rates.amounts.map((a) => (
          <button key={a} onClick={() => setAmount(a)} className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${a === amount ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-500'}`}>
            ¥{fmt(a)}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-sm text-gray-600">
        <span>
          Kurs diperbarui: <b>{fmtDate(rates.updatedAt)}</b>
          {rates.midMarket ? <> · Kurs tengah: <b>¥1 = Rp {rates.midMarket.toLocaleString('id-ID')}</b></> : null}
        </span>
        <span className="flex gap-1">
          Urutkan:
          {(['kurs', 'rating'] as const).map((s) => (
            <button key={s} onClick={() => setSort(s)} className={`px-2 rounded ${sort === s ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}>
              {s === 'kurs' ? 'Terima terbanyak' : 'Rating aplikasi'}
            </button>
          ))}
        </span>
      </div>

      <div className="space-y-3">
        {live.map((p) => {
          const r = ratings?.ratings[p.alias]
          return (
            <div key={p.alias} className={`bg-white rounded-xl p-4 shadow-sm border ${p.alias === bestAlias ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-gray-200'}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-gray-900">{p.name}</span>
                    {p.alias === bestAlias && <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded">KURS TERBAIK</span>}
                  </div>
                  <div className="text-sm text-gray-600">
                    Kurs ¥1 = Rp {p.q.rate.toLocaleString('id-ID', { maximumFractionDigits: 2 })} ·{' '}
                    {p.q.feeKnown ? `Biaya ¥${fmt(p.q.fee ?? 0)}` : 'Biaya: cek di aplikasi'}
                  </div>
                  <div className="flex gap-3 mt-1">
                    <Stars label="App Store" s={r?.ios} />
                    <Stars label="Play Store" s={r?.play} />
                  </div>
                  {p.source === 'manual' && p.asOf && <div className="text-xs text-gray-400 mt-1">Kurs per {fmtDate(p.asOf)}</div>}
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Penerima dapat{p.q.feeKnown ? '' : ' (sebelum biaya)'}</div>
                  <div className="text-xl font-bold text-emerald-700">Rp {fmt(p.q.received)}</div>
                  {p.alias !== bestAlias && <div className="text-xs text-red-500">-Rp {fmt(best - p.q.received)} dari terbaik</div>}
                </div>
                {p.affiliateUrl && (
                  <a href={p.affiliateUrl} target="_blank" rel="sponsored noopener noreferrer" className="px-5 py-2.5 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-300 transition">
                    Kirim sekarang
                  </a>
                )}
              </div>
            </div>
          )
        })}

        {nodata.map((p) => {
          const r = ratings?.ratings[p.alias]
          return (
            <div key={p.alias} className="bg-white rounded-xl p-4 border border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-bold text-lg text-gray-900">{p.name}</span>
                <div className="flex gap-3 mt-1">
                  <Stars label="App Store" s={r?.ios} />
                  <Stars label="Play Store" s={r?.play} />
                </div>
                <div className="text-sm text-gray-500 mt-1">Kurs hari ini belum tersedia, cek langsung di situs</div>
              </div>
              {p.affiliateUrl && (
                <a href={p.affiliateUrl} target="_blank" rel="sponsored noopener noreferrer" className="px-5 py-2.5 border border-emerald-600 text-emerald-700 font-bold rounded-lg hover:bg-emerald-50 transition">
                  Cek kurs
                </a>
              )}
            </div>
          )
        })}
      </div>
      {ratings && <p className="text-xs text-gray-400 mt-4">Rating dari App Store &amp; Play Store Jepang, diperbarui {fmtDate(ratings.updatedAt)}.</p>}
    </div>
  )
}
