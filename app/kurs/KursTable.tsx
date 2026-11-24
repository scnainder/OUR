'use client'

import { useEffect, useMemo, useState } from 'react'

type Quote = { rate: number; fee: number; received: number; collectedAt: string }
type Provider = { alias: string; name: string; affiliateUrl: string | null; auto: boolean; quotes: Record<string, Quote> }
type Data = { updatedAt: string; amounts: number[]; midMarket: number | null; providers: Provider[] }

const fmt = (n: number) => Math.round(n).toLocaleString('id-ID')

export default function KursTable() {
  const [data, setData] = useState<Data | null>(null)
  const [amount, setAmount] = useState(100000)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`/rates.json?t=${Math.floor(Date.now() / 600000)}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError(true))
  }, [])

  const rows = useMemo(() => {
    if (!data) return { ranked: [] as (Provider & { q: Quote })[], manual: [] as Provider[] }
    const ranked = data.providers
      .filter((p) => p.quotes[amount])
      .map((p) => ({ ...p, q: p.quotes[amount] }))
      .sort((a, b) => b.q.received - a.q.received)
    const manual = data.providers.filter((p) => !p.quotes[amount])
    return { ranked, manual }
  }, [data, amount])

  if (error) return <p className="text-red-600">Gagal memuat kurs. Coba refresh halaman.</p>
  if (!data) return <p className="text-gray-500">Memuat kurs…</p>

  const best = rows.ranked[0]?.q.received ?? 0
  const updated = new Date(data.updatedAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {data.amounts.map((a) => (
          <button
            key={a}
            onClick={() => setAmount(a)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
              a === amount ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-500'
            }`}
          >
            ¥{fmt(a)}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Update terakhir: <b>{updated}</b>
        {data.midMarket ? <> · Kurs tengah: <b>¥1 = Rp {data.midMarket.toLocaleString('id-ID')}</b></> : null}
      </p>

      <div className="space-y-3">
        {rows.ranked.map((p, i) => (
          <div key={p.alias} className={`bg-white rounded-xl p-4 shadow-sm border ${i === 0 ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-gray-200'}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-gray-900">{p.name}</span>
                  {i === 0 && <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded">TERBAIK</span>}
                </div>
                <div className="text-sm text-gray-600">
                  Kurs ¥1 = Rp {p.q.rate.toLocaleString('id-ID', { maximumFractionDigits: 2 })} · Biaya ¥{fmt(p.q.fee)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Penerima dapat</div>
                <div className="text-xl font-bold text-emerald-700">Rp {fmt(p.q.received)}</div>
                {i > 0 && <div className="text-xs text-red-500">-Rp {fmt(best - p.q.received)} dari terbaik</div>}
              </div>
              {p.affiliateUrl && (
                <a
                  href={p.affiliateUrl}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="px-5 py-2.5 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-300 transition"
                >
                  Kirim sekarang
                </a>
              )}
            </div>
          </div>
        ))}

        {rows.manual.map((p) => (
          <div key={p.alias} className="bg-white rounded-xl p-4 border border-gray-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="font-bold text-lg text-gray-900">{p.name}</span>
              <div className="text-sm text-gray-500">Kurs tidak tersedia otomatis, cek langsung di situs</div>
            </div>
            {p.affiliateUrl && (
              <a href={p.affiliateUrl} target="_blank" rel="sponsored noopener noreferrer" className="px-5 py-2.5 border border-emerald-600 text-emerald-700 font-bold rounded-lg hover:bg-emerald-50 transition">
                Cek kurs
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
