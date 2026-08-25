'use client'

import Link from 'next/link'

export default function Program() {
  return (
    <main className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-green-100 hover:text-white mb-6 transition">
            ← Kembali ke Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold">Program ZERO BASED KAIGO</h1>
          <p className="text-xl text-green-100 mt-4">Pelatihan Perawat Lansia untuk Bekerja di Jepang</p>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Tentang Program OUR</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                <strong>OUR (ONODERA USER RUN)</strong> adalah program pelatihan internasional yang membuka kesempatan bagi talenta berbakat dari seluruh dunia untuk bekerja di Jepang sebagai <strong>KAIGO (Perawat Lansia)</strong> dengan visa <strong>Tokutei Ginou (SSW - Specified Skilled Worker)</strong>.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Program ini sudah beroperasi di berbagai negara termasuk <strong>Indonesia, Filipina, Myanmar, Laos, Uzbekistan, dan India</strong> dengan total lebih dari <strong>9,357 siswa</strong> yang telah lulus dan bekerja di Jepang.
              </p>
              <p className="text-lg text-gray-700">
                OUR Medan dimulai pada <strong>7 September 2026 (Batch 55)</strong> dan berlokasi di <strong>Universitas Sari Mutiara Indonesia</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Manfaat Program OUR</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                icon: '🎓',
                title: 'Pelatihan 100% GRATIS',
                details: [
                  'Tidak ada biaya pendaftaran',
                  'Tidak ada biaya pelatihan dari awal hingga akhir',
                  'Tidak ada sistem bayar di depan atau cicilan setelah kerja di Jepang'
                ]
              },
              {
                icon: '🏠',
                title: 'Asrama GRATIS',
                details: [
                  'Tinggal gratis di asrama selama pelatihan',
                  'Disediakan khusus untuk peserta perempuan',
                  'Dekat dengan pusat pelatihan'
                ]
              },
              {
                icon: '✈️',
                title: 'Visa & Tiket GRATIS',
                details: [
                  'Pengurusan visa Tokutei Ginou 100% gratis',
                  'Tiket pesawat ke Jepang 100% gratis',
                  'Difasilitasi oleh ONODERA USER RUN Co., Ltd.'
                ]
              },
              {
                icon: '👨‍🏫',
                title: 'Sensei Berpengalaman',
                details: [
                  'Semua pengajar pernah tinggal di Jepang',
                  'Semua pengajar pernah bekerja di Jepang',
                  'Memahami budaya dan sistem kerja Jepang'
                ]
              },
              {
                icon: '🤝',
                title: 'Dukungan Menyeluruh',
                details: [
                  'Pelatihan persiapan wawancara dengan perusahaan',
                  'Pelatihan pra-berangkat ke Jepang',
                  'Dukungan berkelanjutan setelah tiba di Jepang'
                ]
              },
              {
                icon: '🏆',
                title: 'Tingkat Kelulusan Tinggi',
                details: [
                  'Siswa OUR: 93-97% lulus ujian nasional',
                  'Rata-rata umum: 68-78% lulus ujian',
                  'Materi ajar khusus yang efektif'
                ]
              }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-start gap-6">
                  <div className="text-6xl flex-shrink-0">{benefit.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{benefit.title}</h3>
                    <ul className="space-y-2">
                      {benefit.details.map((detail, dIdx) => (
                        <li key={dIdx} className="text-gray-700 flex items-start gap-3">
                          <span className="text-green-600 font-bold mt-1">✓</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Schedule */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Jadwal Program</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">📅 Waktu Pelatihan</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-blue-200">Mulai Pelatihan</p>
                    <p className="text-3xl font-bold">7 September 2026</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Durasi</p>
                    <p className="text-3xl font-bold">±7 Bulan</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Jam Belajar (Senin-Jumat)</p>
                    <p className="text-3xl font-bold">08:00 - 17:00 WIB</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-600 to-green-800 text-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">📍 Lokasi</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-green-200">Universitas</p>
                    <p className="font-semibold">Universitas Sari Mutiara Indonesia</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-200">Alamat</p>
                    <p className="font-semibold">Jl. Kapten Muslim No.79, Helvetia Tengah,<br/>Medan Helvetia, Kota Medan, Sumatera Utara 20118</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Kurikulum Pelatihan</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-lg shadow">
                <h3 className="text-xl font-bold text-blue-600 mb-4">1. Pendidikan Dasar (±6 bulan)</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-semibold text-gray-700 mb-3">📚 Bahasa Jepang (538 jam)</p>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>✓ Hiragana & Katakana</li>
                      <li>✓ Kanji (324 karakter)</li>
                      <li>✓ Level JLPT N5-N4</li>
                      <li>✓ Percakapan & Komunikasi</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 mb-3">🏥 Perawatan Lansia (163 jam)</p>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>✓ Dasar Keperawatan</li>
                      <li>✓ Mekanik Fisik & Mental</li>
                      <li>✓ Keterampilan Dukungan</li>
                      <li>✓ Persiapan Ujian SSW</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow">
                <h3 className="text-xl font-bold text-blue-600 mb-4">2. Persiapan Pra-Berangkat (±1 bulan)</h3>
                <p className="text-gray-700 mb-4">Setelah menerima penawaran kerja dari perusahaan Jepang</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="text-sm text-gray-600">
                    <p className="font-semibold mb-2">Bahasa & Budaya:</p>
                    <ul className="space-y-1 pl-4">
                      <li>✓ Review Bahasa Jepang</li>
                      <li>✓ Perbedaan Budaya Jepang</li>
                    </ul>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="font-semibold mb-2">Persiapan Praktis:</p>
                    <ul className="space-y-1 pl-4">
                      <li>✓ Pelatihan Layanan</li>
                      <li>✓ Pengelolaan Keuangan</li>
                      <li>✓ Pencegahan Kejahatan</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow">
                <h3 className="text-xl font-bold text-blue-600 mb-4">3. Dukungan Setelah Bekerja (±5 tahun)</h3>
                <p className="text-gray-700">Pembelajaran berkelanjutan untuk memastikan kesuksesan jangka panjang di Jepang</p>
                <ul className="space-y-2 text-gray-600 text-sm mt-4 pl-4">
                  <li>✓ Program level 1-5 sesuai pengalaman</li>
                  <li>✓ Persiapan Ujian Nasional Perawat Lansia</li>
                  <li>✓ Dukungan JLPT (N3, N2)</li>
                  <li>✓ Adaptasi budaya berkelanjutan</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Rate */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Tingkat Kesuksesan OUR</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <p className="text-6xl font-bold mb-4">93.3%</p>
              <p className="text-xl">Kelulusan Ujian Bahasa Jepang</p>
              <p className="text-green-100 text-sm mt-2">(Rata-rata umum hanya 68.6%)</p>
            </div>
            <div className="text-center">
              <p className="text-6xl font-bold mb-4">96.9%</p>
              <p className="text-xl">Kelulusan Ujian Keterampilan</p>
              <p className="text-green-100 text-sm mt-2">(Rata-rata umum hanya 77.5%)</p>
            </div>
          </div>
          <p className="text-center text-green-100 mt-12 text-lg">
            Data per 22 Agustus 2022 | Sumber: Kementrian Kesehatan, Tenaga Kerja, dan Kesejahteraan Jepang
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap Memulai Perjalanan Anda?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Pastikan Anda memenuhi semua syarat, kemudian daftarkan diri Anda sekarang untuk Batch 55!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/requirements"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              Lihat Syarat Lengkap
            </Link>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSfuEPShTwZYYtfSCGo8_y6S3_YPyfF4Aq2uDt1R7pGmeHP6-w/viewform"
              target="_blank"
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
            >
              Daftar Sekarang →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
