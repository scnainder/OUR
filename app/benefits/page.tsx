'use client'

import Link from 'next/link'

export default function Benefits() {
  return (
    <main className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-indigo-100 hover:text-white mb-6 transition">
            ← Kembali ke Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold">Biaya yang Ditanggung Program</h1>
          <p className="text-xl text-indigo-100 mt-4">Apa yang Gratis dan Apa yang Perlu Disiapkan</p>
        </div>
      </section>

      {/* YANG GRATIS Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-green-600">🎉 Yang GRATIS dari OUR</h2>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
            {[
              { icon: '🎓', title: 'Pelatihan Bahasa Jepang', desc: '100% gratis selama 6 bulan' },
              { icon: '🏥', title: 'Pelatihan Perawat Lansia', desc: '100% gratis dengan materi sendiri' },
              { icon: '🏠', title: 'Asrama', desc: 'Gratis untuk peserta perempuan' },
              { icon: '✈️', title: 'Tiket Pesawat', desc: 'Gratis ke Jepang' },
              { icon: '📋', title: 'Pengurusan Visa', desc: 'Visa Tokutei Ginou gratis' },
              { icon: '🤝', title: 'Persiapan Wawancara', desc: 'Gratis dengan perusahaan Jepang' },
              { icon: '📚', title: 'Pelatihan Pra-Berangkat', desc: 'Gratis setelah dapat pekerjaan' },
              { icon: '👨‍💼', title: 'Dukungan 5 Tahun', desc: 'Gratis selama bekerja di Jepang' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-600">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIAYA SELAMA PELATIHAN */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Biaya Selama Pelatihan (6 Bulan)</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Siswa perlu menyiapkan biaya untuk buku, medical check up, ujian, dan biaya hidup
          </p>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                num: '01',
                title: 'Buku Pembelajaran',
                items: [
                  'Buku level N5 (3 buku): Rp 380.000',
                  'Buku level N4 (5 buku): Rp 370.000',
                  'Buku Kaigo (2 buku): Rp 220.000',
                  'Buku Latihan: Rp 62.000 - 81.000',
                  'Buku Percakapan Kaigo: Rp 61.000'
                ]
              },
              {
                num: '02',
                title: 'Medical Check Up Pra-Pendidikan',
                items: [
                  'Rp 800.000 - Rp 1.200.000',
                  '(Tergantung RS/Klinik yang dipilih)'
                ]
              },
              {
                num: '03',
                title: 'Biaya Ujian',
                items: [
                  'JFT-Basic: Rp 550.000',
                  'JLPT N4: Rp 180.000',
                  'Ujian SSW Perawat Lansia: Rp 220.000',
                  '(Pilih jenis ujian yang sesuai kebutuhan)'
                ]
              },
              {
                num: '04',
                title: 'Biaya Hidup',
                items: [
                  'Tidak bisa dinominalkan pasti karena berbeda per orang',
                  'Persiapkan dana untuk kebutuhan makan, transport, dll'
                ]
              }
            ].map((cost, idx) => (
              <div key={idx} className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-lg border-l-4 border-indigo-600">
                <div className="flex items-start gap-6">
                  <div className="text-3xl font-bold text-indigo-600 flex-shrink-0">{cost.num}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{cost.title}</h3>
                    <ul className="space-y-2">
                      {cost.items.map((item, iIdx) => (
                        <li key={iIdx} className="text-gray-700 flex items-start gap-3">
                          <span className="text-indigo-600 font-bold mt-1">•</span>
                          <span>{item}</span>
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

      {/* BIAYA SETELAH LULUS INTERVIEW */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Biaya Setelah Lulus Interview User Jepang</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Setelah mendapat penawaran kerja, siswa perlu menyiapkan biaya untuk persiapan keberangkatan
          </p>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                num: '01',
                title: 'Medical Check Up Pasca Lulus Interview',
                items: [
                  'Rp 800.000 - Rp 1.200.000',
                  '(Tergantung RS/Klinik yang ditunjuk)'
                ]
              },
              {
                num: '02',
                title: 'Asuransi Ketenagakerjaan & Psikotest',
                items: [
                  'BPJS Ketenagakerjaan: Rp 189.000',
                  'Psikotest (RS yang ditunjuk): ± Rp 300.000'
                ]
              },
              {
                num: '03',
                title: 'Paspor',
                items: [
                  'Paspor Biasa: Rp 350.000',
                  'Paspor Elektronik (E-Paspor): Rp 650.000',
                  '(Pilih jenis sesuai ketersediaan di imigrasi)'
                ]
              },
              {
                num: '04',
                title: 'Biaya Hidup di Jepang',
                items: [
                  'Minimal Rp 10.000.000 atau lebih untuk 1 bulan pertama',
                  'Untuk memastikan kenyamanan selama adaptasi awal'
                ]
              }
            ].map((cost, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg border-l-4 border-orange-600 shadow-lg">
                <div className="flex items-start gap-6">
                  <div className="text-3xl font-bold text-orange-600 flex-shrink-0">{cost.num}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{cost.title}</h3>
                    <ul className="space-y-2">
                      {cost.items.map((item, iIdx) => (
                        <li key={iIdx} className="text-gray-700 flex items-start gap-3">
                          <span className="text-orange-600 font-bold mt-1">•</span>
                          <span>{item}</span>
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

      {/* CATATAN PENTING */}
      <section className="py-16 bg-yellow-50 border-t-4 border-yellow-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg border-l-4 border-yellow-600 shadow-lg">
            <h3 className="text-2xl font-bold text-yellow-600 mb-6 flex items-center gap-2">
              <span className="text-3xl">⚠️</span> Catatan Penting Tentang Biaya
            </h3>
            <div className="space-y-4 text-gray-800">
              <p>
                <span className="font-semibold text-yellow-600">1. Harga Buku Sewaktu-waktu Berubah</span> -
                Harga buku pembelajaran bisa berubah sesuai dengan biaya percetakan terkini.
              </p>
              <p>
                <span className="font-semibold text-yellow-600">2. Biaya Medical Check Up Berbeda</span> -
                Biaya kesehatan tergantung RS/Klinik yang Anda pilih. Hubungi kami untuk rekomendasi.
              </p>
              <p>
                <span className="font-semibold text-yellow-600">3. Ujian Bisa Dipilih</span> -
                Untuk ujian bahasa Jepang, Anda bisa memilih antara JFT-Basic atau JLPT N4 sesuai kebutuhan.
              </p>
              <p>
                <span className="font-semibold text-yellow-600">4. Biaya Hidup Tidak Pasti</span> -
                Setiap orang memiliki kebutuhan berbeda. Biaya hidup tergantung gaya hidup dan prioritas Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ada Pertanyaan Tentang Biaya?</h2>
          <p className="text-xl text-indigo-100 mb-8">Hubungi kami untuk penjelasan lebih detail</p>
          <a href="tel:+6281168888844" className="inline-block px-8 py-3 bg-yellow-400 text-indigo-900 font-bold rounded-lg hover:bg-yellow-300 transition">
            Hubungi via WhatsApp: 0811 6888 8844
          </a>
        </div>
      </section>
    </main>
  )
}
