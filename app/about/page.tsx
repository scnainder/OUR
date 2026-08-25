'use client'

import Link from 'next/link'

export default function About() {
  return (
    <main className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-cyan-600 to-cyan-800 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-cyan-100 hover:text-white mb-6 transition">
            ← Kembali ke Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold">Tentang OUR</h1>
        </div>
      </section>

      {/* Arti OUR */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Arti OUR (Onodera User Run)</h2>
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-10 rounded-lg border-l-4 border-cyan-600 shadow-lg">
              <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                OUR adalah singkatan yang berarti kami membuka tempat bagi semua orang yang belajar untuk berperan aktif dalam masyarakat. OUR juga berarti keluarga - merepresentasikan sikap kami dalam berbisnis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}