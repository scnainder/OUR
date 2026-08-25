'use client'

import Link from 'next/link'

export default function Registration() {
  const steps = [
    {
      number: 1,
      title: 'Klik Link Pendaftaran',
      description: 'Buka link pendaftaran melalui bio Instagram OUR Medan atau gunakan link di bawah ini.',
      details: [
        'Klik link: bit.ly/PendaftaranSiswaOURMEDAN',
        'Atau ikuti webinar gratis untuk informasi lebih lengkap',
        'Pastikan koneksi internet stabil'
      ]
    },
    {
      number: 2,
      title: 'Pahami Program dengan Baik',
      description: 'Sebelum mengisi formulir, pastikan Anda benar-benar memahami program dan mampu memenuhi semua syarat.',
      details: [
        'Baca semua informasi program di website ini',
        'Hubungi kami untuk pertanyaan melalui WhatsApp',
        'Pastikan Anda siap berkomitmen 7 bulan'
      ]
    },
    {
      number: 3,
      title: 'Isi Formulir Pendaftaran',
      description: 'Isi formulir pendaftaran Batch 55 dengan data yang BENAR dan SESUAI dengan ketentuan.',
      details: [
        'Isi semua kolom yang diperlukan',
        'Periksa kembali data sebelum submit',
        'Gunakan data yang sama dengan dokumen resmi'
      ]
    },
    {
      number: 4,
      title: 'Upload Dokumen Asli',
      description: 'Saat mengisi formulir, upload berkas asli (BUKAN FOTOCOPY) sesuai ketentuan.',
      details: [
        'Pas foto berwarna (4x6 cm)',
        'Foto KTP (Kartu Tanda Penduduk)',
        'Foto Ijazah Pendidikan Terakhir'
      ]
    },
    {
      number: 5,
      title: 'Konfirmasi Pendaftaran',
      description: 'Setelah submit formulir, lakukan konfirmasi pendaftaran melalui WhatsApp yang tercantum dalam formulir.',
      details: [
        'Hubungi nomor WhatsApp di formulir',
        'Konfirmasi bahwa data Anda sudah diterima',
        'Tunggu konfirmasi dari admin OUR'
      ]
    },
    {
      number: 6,
      title: 'Hasil Pendaftaran',
      description: 'Admin akan memverifikasi dokumen dan menghubungi Anda untuk tahap selanjutnya.',
      details: [
        'Verifikasi dokumen oleh admin',
        'Pemberitahuan status diterima/ditolak',
        'Jika diterima, Anda akan diundang ke orientation'
      ]
    }
  ]

  return (
    <main className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-purple-100 hover:text-white mb-6 transition">
            ← Kembali ke Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold">Cara Mendaftar</h1>
          <p className="text-xl text-purple-100 mt-4">Langkah demi Langkah Proses Pendaftaran Batch 55</p>
        </div>
      </section>

      {/* Registration Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {steps.map((step, idx) => (
              <div key={idx} className="mb-12">
                <div className="flex gap-6 md:gap-12">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 text-white flex items-center justify-center text-3xl font-bold">
                      {step.number}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="w-1 h-24 bg-purple-300 mx-auto mt-2"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-12">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{step.title}</h3>
                    <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                    <ul className="space-y-3">
                      {step.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-3 text-gray-700">
                          <span className="text-purple-600 font-bold text-xl">→</span>
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

      {/* Important Checklist */}
      <section className="py-20 bg-yellow-50 border-t-4 border-yellow-500">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Checklist Sebelum Mendaftar</h2>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="space-y-4">
              {[
                'Saya telah membaca dan memahami semua syarat & ketentuan program',
                'Saya memenuhi SEMUA persyaratan yang telah ditetapkan',
                'Saya memiliki dokumen asli yang diperlukan (pas foto, KTP, ijazah)',
                'Saya mendapat izin dari orang tua/wali untuk mengikuti program',
                'Saya bersedia berkomitmen selama 7 bulan pelatihan',
                'Saya memahami bahwa akan bekerja di Jepang dalam kondisi berbeda dengan Indonesia',
                'Saya siap dengan koneksi internet yang stabil untuk isi formulir',
                'Saya telah menyiapkan nomor WhatsApp yang aktif untuk konfirmasi'
              ].map((item, idx) => (
                <label key={idx} className="flex items-start gap-4 cursor-pointer hover:bg-gray-50 p-3 rounded">
                  <input type="checkbox" className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Support */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Hubungi Kami untuk Bantuan</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-4">WhatsApp</h3>
              <p className="text-blue-100 mb-6">Hubungi kami melalui WhatsApp untuk pertanyaan atau konfirmasi</p>
              <a href="tel:+6281168888844" className="inline-block px-6 py-3 bg-white text-blue-800 font-bold rounded hover:bg-blue-50 transition">
                0811 6888 8844
              </a>
            </div>

            <div className="bg-gradient-to-br from-pink-600 to-pink-800 text-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-4">📸</div>
              <h3 className="text-xl font-bold mb-4">Instagram</h3>
              <p className="text-pink-100 mb-6">Ikuti Instagram OUR Medan untuk info & update terbaru</p>
              <a href="https://instagram.com/onoderauserrun.mdn" target="_blank" className="inline-block px-6 py-3 bg-white text-pink-800 font-bold rounded hover:bg-pink-50 transition">
                @onoderauserrun.mdn
              </a>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-800 text-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-xl font-bold mb-4">Lokasi</h3>
              <p className="text-green-100 mb-6">Kunjungi kami langsung untuk konsultasi</p>
              <a href="https://maps.google.com/?q=Universitas+Sari+Mutiara+Indonesia+Medan" target="_blank" className="inline-block px-6 py-3 bg-white text-green-800 font-bold rounded hover:bg-green-50 transition text-sm">
                Lihat Lokasi
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Pertanyaan Pendaftaran</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                q: 'Berapa biaya pendaftaran?',
                a: 'GRATIS! Tidak ada biaya pendaftaran sama sekali. Semua biaya ditanggung oleh program OUR.'
              },
              {
                q: 'Apakah saya bisa mendaftar jika tinggal di luar Medan?',
                a: 'Ya, Anda bisa mendaftar dari mana saja. Namun, Anda harus hadir untuk mengikuti pelatihan di Medan mulai 7 September 2026.'
              },
              {
                q: 'Apakah formulir bisa diisi berkali-kali?',
                a: 'Sebaiknya isi formulir dengan data yang benar sekali saja. Jika ada kesalahan, hubungi admin melalui WhatsApp untuk perbaikan.'
              },
              {
                q: 'Berapa lama waktu verifikasi dokumen?',
                a: 'Biasanya dokumen diverifikasi dalam 1-2 minggu setelah Anda melakukan konfirmasi via WhatsApp.'
              },
              {
                q: 'Apa yang terjadi jika dokumen saya ditolak?',
                a: 'Jika dokumen tidak sesuai syarat, admin akan menghubungi Anda untuk perbaikan atau penjelasan lebih lanjut.'
              },
              {
                q: 'Kapan hasil pendaftaran akan diumumkan?',
                a: 'Admin akan menghubungi Anda secara langsung via WhatsApp dengan hasil pendaftaran.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200 shadow">
                <h3 className="font-bold text-lg text-gray-800 mb-3">Q: {faq.q}</h3>
                <p className="text-gray-700 pl-4 border-l-4 border-purple-600">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap untuk Mendaftar?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Ikuti 6 langkah di atas dan mulai perjalanan Anda menuju karir internasional di Jepang!
          </p>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSfuEPShTwZYYtfSCGo8_y6S3_YPyfF4Aq2uDt1R7pGmeHP6-w/viewform"
            target="_blank"
            className="inline-block px-10 py-4 bg-yellow-400 text-purple-900 font-bold rounded-lg hover:bg-yellow-300 transition text-lg"
          >
            Buka Formulir Pendaftaran →
          </Link>
        </div>
      </section>
    </main>
  )
}
