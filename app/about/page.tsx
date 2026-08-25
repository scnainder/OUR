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
          <h1 className="text-4xl md:text-5xl font-bold">Tentang OUR & Visi Kami</h1>
          <p className="text-xl text-cyan-100 mt-4">Memahami Misi dan Nilai-nilai Onodera User Run</p>
        </div>
      </section>

      {/* Arti OUR */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Arti OUR (Onodera User Run)</h2>
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-10 rounded-lg border-l-4 border-cyan-600 shadow-lg">
              <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                <span className="font-bold text-cyan-600">OUR</span> memiliki arti <span className="font-bold">"membuka tempat bagi semua orang yang belajar di sini (USER) untuk dapat berperan aktif dalam masyarakat (RUN)"</span>.
              </p>
              <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                Bila menggabungkan huruf pertama setiap kata, menjadi <span className="font-bold text-cyan-600">OUR = kami, keluarga</span> yang merepresentasikan sikap kami dalam menjalankan bisnis dengan perasaan yang sama seperti keluarga terhadap:
              </p>
              <ul className="space-y-3 text-gray-800">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold text-2xl">→</span>
                  <span><span className="font-bold">Fasilitas penerima</span> (panti jompo)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold text-2xl">→</span>
                  <span><span className="font-bold">Perusahaan penerima</span> (di Jepang)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold text-2xl">→</span>
                  <span><span className="font-bold">SDM asing</span> (peserta program)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Visi & Misi OUR</h2>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-lg shadow-lg border-t-4 border-cyan-600">
              <h3 className="text-2xl font-bold text-cyan-600 mb-4">🎯 Visi Kami</h3>
              <p className="text-gray-800 text-lg leading-relaxed">
                Membina SDM asing berbakat dari seluruh dunia dan mendukung mereka untuk dapat berperan aktif di Jepang. Kami percaya bahwa setiap individu memiliki potensi untuk berkembang dan berkontribusi positif.
              </p>
            </div>

            <div className="bg-white p-10 rounded-lg shadow-lg border-t-4 border-blue-600">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">💫 Impian Kami</h3>
              <p className="text-gray-800 text-lg leading-relaxed">
                Berkontribusi demi kebahagiaan semua orang - baik peserta program, perusahaan penerima, maupun masyarakat Jepang. Kami ingin menciptakan dampak positif yang berkelanjutan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Konsep SDM OUR */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Konsep SDM yang Kami Harapkan</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Kami mencari individu yang memiliki 5 karakteristik utama untuk menjadi perawat lansia yang sukses di Jepang
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  num: '❶',
                  title: 'Tidak Berhenti Bekerja 5 Tahun',
                  desc: 'Komitmen penuh selama kontrak kerja berlangsung'
                },
                {
                  num: '❷',
                  title: 'Serius dalam Pekerjaan',
                  desc: 'Penyambutan baik dan sikap profesional terhadap tugas'
                },
                {
                  num: '❸',
                  title: 'Mampu Berbahasa Jepang',
                  desc: 'Kemampuan komunikasi yang mumpuni dengan pasien & rekan kerja'
                },
                {
                  num: '❹',
                  title: 'Pendidikan Profesional',
                  desc: 'Bersedia mengikuti pelatihan teknis berkelanjutan'
                },
                {
                  num: '❺',
                  title: 'Berambisi',
                  desc: 'Memiliki mimpi menjadi perawat lansia bersertifikat & berusaha keras'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg shadow-lg border-t-4 border-purple-600 hover:shadow-xl transition">
                  <div className="text-4xl font-bold mb-3">{item.num}</div>
                  <h3 className="font-bold text-lg text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-700 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pelayanan Komprehensif */}
      <section className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Pelayanan Komprehensif OUR</h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            OUR menawarkan berbagai layanan lengkap bagi para orang asing untuk tinggal dan bekerja di Jepang dengan nyaman dan tenang
          </p>

          <div className="max-w-5xl mx-auto space-y-6">
            {[
              {
                icon: '🎓',
                title: 'Perekrutan & Pendidikan',
                details: [
                  'Pelatihan di 5 negara (Myanmar, Filipina, Indonesia, Laos, Uzbekistan)',
                  'Pendidikan gratis lengkap untuk bahasa Jepang dan keterampilan perawatan',
                  'Berpengalaman merekrut dari berbagai latar belakang'
                ]
              },
              {
                icon: '🤝',
                title: 'Perkenalan dengan Perusahaan Jepang',
                details: [
                  'Berpengalaman dalam memperkenalkan SDM asing di bidang perawatan lansia',
                  'Juga aktif di industri layanan makanan, produksi makanan & minuman',
                  'Jaringan luas dengan employer Jepang'
                ]
              },
              {
                icon: '📋',
                title: 'Bantuan Pengurusan Visa',
                details: [
                  'Membantu proses pembuatan visa Tokutei Ginou (Specified Skilled Worker)',
                  'Dukungan lengkap dari persiapan dokumen hingga approval',
                  'Didukung oleh tim yang ahli di bidangnya'
                ]
              },
              {
                icon: '✈️',
                title: 'Dukungan Persiapan Penerimaan',
                details: [
                  'Tempat tinggal sementara untuk adaptasi awal',
                  'Pelatihan menghadapi budaya kerja Jepang',
                  'Persiapan mental dan praktis sebelum masuk pekerjaan'
                ]
              },
              {
                icon: '💪',
                title: 'Bantuan Bertahan Lama Bekerja',
                details: [
                  'Dukungan pendidikan berkelanjutan selama 5 tahun bekerja',
                  'Program mentoring dari staff luar negeri (native speaker)',
                  'Komunitas support dan networking dengan alumni OUR'
                ]
              }
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-indigo-600">
                <div className="flex items-start gap-6">
                  <div className="text-5xl flex-shrink-0">{service.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-indigo-600 mb-4">{service.title}</h3>
                    <ul className="space-y-3">
                      {service.details.map((detail, dIdx) => (
                        <li key={dIdx} className="text-gray-700 flex items-start gap-3">
                          <span className="text-indigo-600 font-bold text-lg mt-1">✓</span>
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

      {/* Global Presence */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Kehadiran Global OUR</h2>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-green-600 mb-6">🌍 Lokasi Sekolah OUR</h3>
              <div className="space-y-3 text-gray-800">
                <p className="flex items-center gap-2"><span className="text-2xl">🇲🇾</span> Myanmar (Yangon)</p>
                <p className="flex items-center gap-2"><span className="text-2xl">🇵🇭</span> Filipina (Marikina, Davao)</p>
                <p className="flex items-center gap-2"><span className="text-2xl">🇮🇩</span> Indonesia (Medan, Jakarta)</p>
                <p className="flex items-center gap-2"><span className="text-2xl">🇱🇦</span> Laos (Vientiane)</p>
                <p className="flex items-center gap-2"><span className="text-2xl">🇺🇿</span> Uzbekistan</p>
                <p className="flex items-center gap-2"><span className="text-2xl">🇮🇳</span> India (New Delhi - akan dibuka Juli 2024)</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-teal-600 mb-6">📊 Statistik Keberhasilan</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Total Siswa</p>
                  <p className="text-4xl font-bold text-teal-600">9,357+</p>
                  <p className="text-gray-600 text-sm">siswa terkumulatif (per 31 Juli 2025)</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Lulus SSW Test</p>
                  <p className="text-4xl font-bold text-green-600">7,512+</p>
                  <p className="text-gray-600 text-sm">siswa lulus ujian evaluasi keterampilan</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Bekerja di Jepang</p>
                  <p className="text-4xl font-bold text-indigo-600">5,077+</p>
                  <p className="text-gray-600 text-sm">kandidat tersebar di berbagai wilayah Jepang</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-cyan-600 to-cyan-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Tertarik Bergabung dengan OUR?</h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Jadilah bagian dari ribuan alumni OUR yang telah sukses bekerja di Jepang
          </p>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSfuEPShTwZYYtfSCGo8_y6S3_YPyfF4Aq2uDt1R7pGmeHP6-w/viewform"
            target="_blank"
            className="inline-block px-10 py-4 bg-yellow-400 text-cyan-900 font-bold rounded-lg hover:bg-yellow-300 transition text-lg"
          >
            Daftar Sekarang →
          </Link>
        </div>
      </section>
    </main>
  )
}
