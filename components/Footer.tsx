'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white font-bold text-xl mb-4">OUR Medan</h3>
            <p className="text-sm text-slate-400">Program pelatihan KAIGO (Perawat Lansia) untuk bekerja di Jepang</p>
            <div className="mt-4 space-y-2">
              <a href="https://instagram.com/onoderauserrun.mdn" target="_blank" className="block text-sm hover:text-white transition">
                📸 @onoderauserrun.mdn
              </a>
              <a href="tel:+6281168888844" className="block text-sm hover:text-white transition">
                📱 0811 6888 8844
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Informasi</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition">Tentang OUR</Link></li>
              <li><Link href="/program" className="hover:text-white transition">Program Details</Link></li>
              <li><Link href="/benefits" className="hover:text-white transition">Biaya</Link></li>
              <li><Link href="/requirements" className="hover:text-white transition">Syarat</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Pendaftaran</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/registration" className="hover:text-white transition">Cara Daftar</Link></li>
              <li><a href="tel:+6281168888844" className="hover:text-white transition">Hubungi WhatsApp</a></li>
              <li><a href="https://instagram.com/onoderauserrun.mdn" target="_blank" className="hover:text-white transition">Follow Instagram</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Lokasi</h4>
            <p className="text-sm text-slate-400 mb-3">Universitas Sari Mutiara Indonesia</p>
            <p className="text-sm text-slate-400">Jl. Kapten Muslim No.79, Helvetia Tengah, Medan Helvetia, Kota Medan, Sumatera Utara 20118</p>
            <a href="https://maps.google.com/?q=Universitas+Sari+Mutiara+Indonesia+Medan" target="_blank" className="inline-block mt-3 text-sm text-blue-400 hover:text-blue-300 transition">
              Lihat di Google Maps →
            </a>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h5 className="text-white font-semibold mb-3">Jam Belajar</h5>
              <p className="text-sm text-slate-400">Senin - Jumat: 08:00 - 17:00 WIB</p>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">Dimulai</h5>
              <p className="text-sm text-slate-400">7 September 2026 (Batch 55)</p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2026 OUR Medan - ONODERA USER RUN Co., Ltd. All rights reserved.</p>
            <p className="mt-2 text-xs">Difasilitasi oleh ONODERA USER RUN Co., Ltd.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
