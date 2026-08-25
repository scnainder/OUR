'use client'

import Link from 'next/link'

export default function Requirements() {
  const requirements = [
    {
      category: 'Umum',
      items: [
        { text: 'Pria atau Wanita', status: 'required' },
        { text: 'Usia 17-28 tahun (wajib genap 18 tahun, maksimal 5 bulan pelatihan)', status: 'required' },
      ]
    },
    {
      category: 'Pendidikan',
      items: [
        { text: 'Minimal lulusan SMA/SMK/sederajat', status: 'required' },
        { text: 'Ijazah asli pendidikan terakhir tidak sedang ditahan atau hilang', status: 'required' },
      ]
    },
    {
      category: 'Status Pekerjaan & Pendidikan',
      items: [
        { text: 'Tidak sedang bekerja', status: 'required' },
        { text: 'Tidak memiliki status pendidikan aktif dalam bentuk apa pun (termasuk sekolah, pelatihan, kuliah online, maupun cuti akademik)', status: 'required' },
      ]
    },
    {
      category: 'Kesehatan',
      items: [
        { text: 'Sehat jasmani dan rohani', status: 'required' },
        { text: 'Tidak memiliki tato', status: 'required' },
        { text: 'Tidak buta warna total atau parsial', status: 'required' },
      ]
    },
    {
      category: 'Komitmen & Izin',
      items: [
        { text: 'Diizinkan oleh orang tua/wali', status: 'required' },
        { text: 'Bersedia mengikuti pelatihan selama 7 bulan atau lebih', status: 'required' },
      ]
    }
  ]

  const documents = [
    { doc: 'Pas Foto (berwarna)', size: '4x6 cm' },
    { doc: 'KTP (Kartu Tanda Penduduk)', size: 'Asli' },
    { doc: 'Ijazah Pendidikan Terakhir', size: 'Asli' },
  ]

  return (
    <main className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition">
            ← Kembali ke Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold">Syarat & Ketentuan Program OUR</h1>
          <p className="text-xl text-blue-100 mt-4">Pastikan Anda memenuhi semua persyaratan sebelum mendaftar</p>
        </div>
      </section>

      {/* Requirements List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {requirements.map((section, idx) => (
              <div key={idx} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-600">
                  {section.category}
                </h2>
                <div className="space-y-4">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-600">
                      <div className="text-2xl mt-1">✓</div>
                      <p className="text-lg text-gray-800 flex-1">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 bg-red-50 border-t-4 border-red-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
              <span className="text-3xl">⚠️</span> Perhatian Penting
            </h2>
            <div className="space-y-4 text-gray-800">
              <div className="p-4 bg-white border-l-4 border-red-500 rounded">
                <p className="font-semibold text-red-600 mb-2">Status Pendidikan</p>
                <p>Anda TIDAK boleh sedang aktif mengikuti program pendidikan apapun, termasuk cuti akademik. Program ini membutuhkan komitmen penuh selama 7 bulan.</p>
              </div>
              <div className="p-4 bg-white border-l-4 border-red-500 rounded">
                <p className="font-semibold text-red-600 mb-2">Izin Orang Tua</p>
                <p>Izin tertulis dari orang tua/wali sangat diperlukan karena Anda akan berangkat ke Jepang untuk bekerja dalam waktu yang lama.</p>
              </div>
              <div className="p-4 bg-white border-l-4 border-red-500 rounded">
                <p className="font-semibold text-red-600 mb-2">Kesehatan & Penampilan</p>
                <p>Tidak boleh memiliki tato yang terlihat (tidak boleh ditutupi) karena budaya kerja di Jepang yang ketat. Tidak boleh buta warna karena pekerjaan memerlukan perhatian detail.</p>
              </div>
              <div className="p-4 bg-white border-l-4 border-red-500 rounded">
                <p className="font-semibold text-red-600 mb-2">Usia & Masa Pelatihan</p>
                <p>Jika Anda berusia 17 tahun, Anda harus mencapai usia 18 tahun dalam 5 bulan pertama pelatihan.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Dokumen Yang Diperlukan</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {documents.map((doc, idx) => (
                <div key={idx} className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="text-4xl mb-4">📄</div>
                  <h3 className="font-bold text-lg mb-2">{doc.doc}</h3>
                  <p className="text-gray-600">{doc.size}</p>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
              <p className="text-blue-900 font-semibold mb-2">Penting!</p>
              <p className="text-blue-800">Upload berkas ASLI (bukan photocopy) saat mengisi formulir pendaftaran. Dokumen yang tidak sesuai dapat menyebabkan pendaftaran Anda ditolak.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Pertanyaan Umum</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                q: 'Apakah saya bisa mendaftar jika saya masih kuliah?',
                a: 'Tidak. Anda tidak boleh memiliki status pendidikan aktif, termasuk sedang cuti akademik atau mengikuti program online apapun.'
              },
              {
                q: 'Bagaimana jika usia saya 17 tahun saat pendaftaran?',
                a: 'Anda tetap bisa mendaftar, tapi harus genap 18 tahun dalam 5 bulan pertama pelatihan (sebelum atau saat pelatihan dimulai).'
              },
              {
                q: 'Apa itu buta warna parsial?',
                a: 'Buta warna parsial adalah ketidakmampuan untuk membedakan beberapa warna tertentu (seperti red-green color blindness). Anda harus bebas dari kondisi ini.'
              },
              {
                q: 'Apakah tato di tempat yang tidak terlihat diperbolehkan?',
                a: 'Tidak. Ditegaskan "tidak memiliki tato" tanpa terkecuali. Budaya Jepang sangat ketat mengenai hal ini.'
              },
              {
                q: 'Berapa lama durasi pelatihan?',
                a: 'Durasi minimum 7 bulan. Anda harus bersedia mengikuti seluruh program tanpa putus.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200 shadow">
                <h3 className="font-bold text-lg text-gray-800 mb-3">Q: {faq.q}</h3>
                <p className="text-gray-700 pl-4 border-l-4 border-blue-600">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Apakah Anda Memenuhi Semua Syarat?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Jika ya, daftarkan diri Anda sekarang dan wujudkan impian bekerja di Jepang!
          </p>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSfuEPShTwZYYtfSCGo8_y6S3_YPyfF4Aq2uDt1R7pGmeHP6-w/viewform"
            target="_blank"
            className="inline-block px-10 py-4 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-300 transition text-lg"
          >
            Daftar Sekarang →
          </Link>
        </div>
      </section>
    </main>
  )
}
