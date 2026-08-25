import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-4 py-2 bg-blue-400 rounded-full text-sm font-semibold">
              BATCH 55 - Pendaftaran Dibuka
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Wujudkan Impian Bekerja di Jepang
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Program Zero Based KAIGO (Perawat Lansia) - Gratis Pelatihan, Asrama, Visa & Tiket Pesawat
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSfuEPShTwZYYtfSCGo8_y6S3_YPyfF4Aq2uDt1R7pGmeHP6-w/viewform"
                target="_blank"
                className="px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-300 transition text-lg text-center"
              >
                Daftar Sekarang →
              </Link>
              <Link
                href="/requirements"
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-800 transition text-lg text-center"
              >
                Lihat Syarat
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-16">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">7 SEP</div>
                <p className="text-blue-100 text-sm md:text-base">Mulai Pelatihan</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">7 Bulan</div>
                <p className="text-blue-100 text-sm md:text-base">Durasi Pelatihan</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">Rp 0</div>
                <p className="text-blue-100 text-sm md:text-base">Biaya Pendaftaran</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Mengapa Memilih OUR?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Pelatihan Gratis',
                desc: '100% gratis dari awal hingga akhir. Tidak ada biaya tersembunyi.',
                icon: '🎓'
              },
              {
                title: 'Asrama Gratis',
                desc: 'Gratis tinggal di asrama selama pelatihan (khusus peserta perempuan)',
                icon: '🏠'
              },
              {
                title: 'Visa & Tiket Gratis',
                desc: 'Pengurusan visa dan tiket pesawat ke Jepang 100% gratis',
                icon: '✈️'
              },
              {
                title: 'Sensei Berpengalaman',
                desc: 'Semua pengajar pernah tinggal dan bekerja di Jepang',
                icon: '👨‍🏫'
              },
              {
                title: 'Dukungan Menyeluruh',
                desc: 'Dukungan dari persiapan hingga setelah tiba di Jepang',
                icon: '🤝'
              },
              {
                title: 'Tingkat Kelulusan 93%',
                desc: 'Siswa OUR memiliki tingkat kelulusan ujian di atas 93%',
                icon: '🏆'
              }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Mulai Sekarang</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Link href="/program" className="group p-8 bg-gradient-to-br from-green-600 to-green-800 text-white rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-green-100">Tentang Program</h3>
              <p className="text-green-100">Pelajari kurikulum, manfaat, dan tingkat kelulusan</p>
            </Link>

            <Link href="/requirements" className="group p-8 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-red-100">Syarat & Ketentuan</h3>
              <p className="text-red-100">Pastikan Anda memenuhi semua persyaratan</p>
            </Link>

            <Link href="/registration" className="group p-8 bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-100">Cara Daftar</h3>
              <p className="text-purple-100">Ikuti 6 langkah mudah untuk mendaftar</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Jangan Lewatkan Kesempatan Emas Ini!
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Pendaftaran Batch 55 terbuka sekarang. Pastikan Anda memenuhi semua syarat sebelum mendaftar.
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
    </>
  )
}
