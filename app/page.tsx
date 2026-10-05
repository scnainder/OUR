'use client'

import { useState } from 'react'
import Link from 'next/link'

type FieldKey = 'lansia' | 'makanan'

export default function Gateway() {
  const [open, setOpen] = useState<FieldKey | null>(null)

  const fields: Record<
    FieldKey,
    {
      title: string
      subtitle: string
      color: string
      requirements: string[]
      href: string
    }
  > = {
    lansia: {
      title: 'Perawat Lansia (KAIGO)',
      subtitle: 'Batch 6 — mulai 2 November 2026',
      color: 'blue',
      requirements: [
        'Usia 17-28 tahun (wajib genap 18 tahun)',
        'Minimal lulusan SMA/SMK/sederajat',
        'Sehat jasmani dan rohani',
        'Tidak memiliki tato',
        'Tidak buta warna total/parsial',
        'Bersedia mengikuti pelatihan 7 bulan atau lebih',
      ],
      href: '/perawat-lansia',
    },
    makanan: {
      title: 'Layanan Makanan',
      subtitle: 'Batch 6 — mulai 2 November 2026',
      color: 'orange',
      requirements: [
        'Bersedia mengolah, mencicipi, dan memakan bahan non-halal',
        'Bersedia tidak berpuasa selama jam kerja',
        'Bersedia tidak menggunakan hijab saat bertugas',
        'Usia 17-28 tahun (wajib genap 18 tahun)',
        'Minimal lulusan SMA/SMK/sederajat',
        'Bersedia mengikuti pelatihan 7 bulan atau lebih',
      ],
      href: '/layanan-makanan',
    },
  }

  return (
    <main className="min-h-[calc(100vh-1px)] flex items-center bg-gradient-to-br from-slate-900 to-slate-800 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="uppercase tracking-wide text-slate-400 font-semibold mb-2">OUR Blooming Academy</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Pilih Bidang Pekerjaan Anda</h1>
          <p className="text-slate-300 max-w-xl mx-auto">
            Program pelatihan gratis untuk bekerja di Jepang. Pilih salah satu bidang di bawah untuk melihat
            syaratnya.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {(Object.keys(fields) as FieldKey[]).map((key) => {
            const field = fields[key]
            const isOpen = open === key
            const isBlue = field.color === 'blue'
            return (
              <div
                key={key}
                className={`rounded-2xl overflow-hidden shadow-2xl transition ${
                  isBlue ? 'bg-blue-600' : 'bg-orange-600'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : key)}
                  className="w-full text-left p-8 text-white"
                >
                  <p className="text-sm opacity-80 mb-1">{field.subtitle}</p>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{field.title}</h2>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold opacity-90">
                    {isOpen ? 'Sembunyikan syarat ▲' : 'Lihat syarat ▼'}
                  </span>
                </button>

                {isOpen && (
                  <div className="bg-white p-6">
                    <ul className="space-y-3 mb-6">
                      {field.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-800 text-sm">
                          <span className={`font-bold ${isBlue ? 'text-blue-600' : 'text-orange-600'}`}>✓</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={field.href}
                      className={`block text-center px-6 py-3 rounded-lg font-bold text-white transition ${
                        isBlue ? 'bg-blue-600 hover:bg-blue-700' : 'bg-orange-600 hover:bg-orange-700'
                      }`}
                    >
                      Lanjut ke {field.title} →
                    </Link>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
