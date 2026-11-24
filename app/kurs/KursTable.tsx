'use client'

import { useEffect, useMemo, useState } from 'react'

type Quote = { rate: number; fee: number; received: number; feeKnown: boolean }
type Model =
  | { type: 'points'; points: { amount: number; rate: number; fee: number }[] }
  | { type: 'flat'; rate: number; fee: number | null; feePct: number; feeKnown: boolean }
type Provider = { alias: string; name: string; affiliateUrl: string | null; source: 'api' | 'scrape' | 'manual' | 'none'; asOf: string | null; model: Model | null }
type Rates = { updatedAt: string; chips: number[]; minAmount: number; maxAmount: number; midMarket: number | null; providers: Provider[] }
type Store = { score: number; count: number; url: string }
type Ratings = { updatedAt: string; ratings: Record<string, { ios?: Store; play?: Store }> }

const fmt = (n: number) => Math.round(n).toLocaleString('id-ID')
const fmtDate = (s: string) => new Date(s).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
const avg = (r?: { ios?: Store; play?: Store }) => {
  const xs = [r?.ios, r?.play].filter(Boolean) as Store[]
  const n = xs.reduce((s, x) => s + x.count, 0)
  return n ? xs.reduce((s, x) => s + x.score * x.count, 0) / n : 0
}

// Rumus: diterima = (nominal - biaya) x kurs. Untuk data 'points', kurs & biaya diinterpolasi linear antar nominal.
function quote(p: Provider, amount: number): Quote | null {
  const m = p.model
  if (!m) return null
  let rate: number, fee: number, feeKnown = true
  if (m.type === 'flat') {
    rate = m.rate; fee = (m.fee ?? 0) + (m.feePct / 100) * amount; feeKnown = m.feeKnown
  } else {
    const pts = m.points
    if (!pts.length || amount < pts[0].amount || amount > pts[pts.length - 1].amount) return null
    const i = Math.max(0, pts.findIndex((x) => x.amount >= amount))
    const hi = pts[i], lo = pts[Math.max(0, i - 1)]
    const t = hi.amount === lo.amount ? 0 : (amount - lo.amount) / (hi.amount - lo.amount)
    rate = lo.rate + (hi.rate - lo.rate) * t
    fee = lo.fee + (hi.fee - lo.fee) * t
  }
  return { rate, fee, feeKnown, received: Math.max(0, (amount - fee) * rate) }
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
  const [input, setInput] = useState('100000')
  const [sort, setSort] = useState<'kurs' | 'rating'>('kurs')
  const [error, setError] = useState(false)

  useEffect(() => {
    const t = Math.floor(Date.now() / 600000)
    fetch(`/rates.json?t=${t}`).then((r) => r.json()).then(setRates).catch(() => setError(true))
    fetch(`/ratings.json?t=${t}`).then((r) => r.json()).then(setRatings).catch(() => {})
  }, [])

  const { live, nodata } = useMemo(() => {
    if (!rates) return { live: [] as (Provider & { q: Quote; stars: number })[], nodata: [] as Provider[] }
    const withQ = rates.providers.flatMap((p) => {
      const q = quote(p, amount)
      return q ? [{ ...p, q, stars: avg(ratings?.ratings[p.alias]) }] : []
    })
    withQ.sort((a, b) => (sort === 'rating' ? b.stars - a.stars : b.q.received - a.q.received))
    const nodata = rates.providers.filter((p) => !quote(p, amount)).sort((a, b) => avg(ratings?.ratings[b.alias]) - avg(ratings?.ratings[a.alias]))
    return { live: withQ, nodata }
  }, [rates, ratings, amount, sort])

  if (error) return <p className="text-red-600">Gagal memuat kurs. Coba refresh halaman.</p>
  if (!rates) return <p className="text-gray-500">Memuat kurs…</p>

  const best = Math.max(0, ...live.map((p) => p.q.received))
  const bestAlias = [...live].sort((a, b) => b.q.received - a.q.received)[0]?.alias

  return (
    <div>
      <div className="bg-white rounded-xl p-4 border border-gray-200 mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Berapa yen yang mau dikirim?</label>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-500">¥</span>
          <input
            inputMode="numeric"
            value={input}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, '').slice(0, 8)
              setInput(v)
              const n = parseInt(v || '0', 10)
              if (n >= rates.minAmount && n <= rates.maxAmount) setAmount(n)
            }}
            className="w-full text-2xl font-bold border-b-2 border-emerald-500 focus:outline-none py-1"
          />
        </div>
        {(() => {
          const n = parseInt(input || '0', 10)
          return n < rates.minAmount || n > rates.maxAmount ? (
            <p className="text-xs text-red-500 mt-1">Masukkan nominal ¥{fmt(rates.minAmount)} – ¥{fmt(rates.maxAmount)}.</p>
          ) : null
        })()}
        <div className="flex flex-wrap gap-2 mt-3">
          {rates.chips.map((a) => (
            <button key={a} onClick={() => { setAmount(a); setInput(String(a)) }} className={`px-3 py-1 rounded-full text-sm font-semibold border transition ${a === amount ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-500'}`}>
              ¥{fmt(a)}
            </button>
          ))}
        </div>
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
                    {p.q.feeKnown ? `Biaya ¥${fmt(p.q.fee)}` : 'Biaya: cek di aplikasi'}
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
