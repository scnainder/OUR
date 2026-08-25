import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-4 py-2 bg-blue-400 rounded-full text-sm font-semibold">
              🎓 BATCH 55 - Pendaftaran Dibuka
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Wujudkan Impian Bekerja di Jepang
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Program Zero Based KAIGO (Perawat Lansia) - 100% Gratis Pelatihan, Asrama, Visa & Tiket Pesawat
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfuEPShTwZYYtfSCGo8_y6S3_YPyfF4Aq2uDt1R7pGmeHP6-w/viewform"
                target="_blank"
                className="px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-300 transition text-lg text-center"
              >
                📋 Daftar Sekarang →
              </a>
              <a
                href="#requirements"
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-800 transition text-lg text-center"
              >
                ✓ Lihat Syarat
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-16">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">7 SEP</div>
                <p className="text-blue-100 text-sm md:text-base">Mulai Pelatihan</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">7 Bulan</div>
                <p className="text-blue-100 text-sm md:text-base">Durasi</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">Rp 0</div>
                <p className="text-blue-100 text-sm md:text-base">Biaya Daftar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tentang OUR Section */}
      <section className="py-20 bg-cyan-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Tentang OUR</h2>
          <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-lg border-l-4 border-cyan-600 mb-12">
            <h3 className="text-2xl font-bold text-cyan-600 mb-4">Arti OUR (Onodera User Run)</h3>
            <p className="text-lg text-gray-800 mb-6 leading-relaxed">
              <span className="font-bold text-cyan-600">OUR = Kami, Keluarga</span> - Merepresentasikan sikap kami dalam menjalankan bisnis dengan perasaan yang sama seperti keluarga terhadap peserta program, perusahaan penerima, dan fasilitas penerima di Jepang.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed">
              Kami membina SDM asing berbakat dari seluruh dunia dan mendukung mereka untuk berperan aktif di Jepang. <span className="font-bold">Impian kami adalah berkontribusi demi kebahagiaan semua orang.</span>
            </p>
          </div>

          {/* 5 Konsep SDM */}
          <h3 className="text-2xl font-bold text-center mb-8">5 Konsep SDM yang Kami Harapkan</h3>
          <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-4">
            {[
              { num: '❶', text: 'Tidak berhenti bekerja 5 tahun' },
              { num: '❷', text: 'Serius dalam pekerjaan' },
              { num: '❸', text: 'Mampu berbahasa Jepang' },
              { num: '❹', text: 'Pendidikan profesional' },
              { num: '❺', text: 'Berambisi & mimpi besar' }
            ].map((item, i) => (
              <div key={i} className="bg-purple-50 p-6 rounded-lg border-t-4 border-purple-600 text-center">
                <div className="text-4xl font-bold mb-2">{item.num}</div>
                <p className="text-gray-800 font-semibold text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">🎉 Yang GRATIS dari OUR</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-6">
            {[
              { icon: '🎓', title: 'Pelatihan Bahasa', desc: '6 bulan gratis' },
              { icon: '🏥', title: 'Pelatihan Kaigo', desc: 'Gratis 100%' },
              { icon: '🏠', title: 'Asrama', desc: 'Gratis (perempuan)' },
              { icon: '✈️', title: 'Tiket Pesawat', desc: 'Gratis ke Jepang' },
              { icon: '📋', title: 'Visa', desc: 'Tokutei Ginou gratis' },
              { icon: '🤝', title: 'Wawancara', desc: 'Persiapan gratis' },
              { icon: '📚', title: 'Pra-Berangkat', desc: 'Program gratis' },
              { icon: '👨‍💼', title: 'Dukungan 5 Tahun', desc: 'Gratis berkelanjutan' }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-600 text-center">
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Program Pelatihan</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">📚 Pendidikan Dasar (6 bulan)</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-bold text-gray-700 mb-3">Bahasa Jepang (538 jam)</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>✓ Hiragana & Katakana</li>
                    <li>✓ Level JLPT N5-N4</li>
                    <li>✓ Percakapan profesional</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-gray-700 mb-3">Perawatan Lansia (163 jam)</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>✓ Dasar keperawatan</li>
                    <li>✓ Mekanisme fisik & mental</li>
                    <li>✓ Keterampilan komunikasi</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-8 rounded-lg border-l-4 border-green-600">
              <h3 className="text-2xl font-bold text-green-600 mb-4">✈️ Pra-Berangkat (1 bulan)</h3>
              <p className="text-gray-700 mb-4">Setelah mendapat penawaran kerja dari Jepang</p>
              <ul className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                <li>✓ Review bahasa Jepang</li>
                <li>✓ Perbedaan budaya Jepang</li>
                <li>✓ Pelatihan layanan</li>
                <li>✓ Pengelolaan keuangan</li>
                <li>✓ Pencegahan kejahatan</li>
                <li>✓ Pemahaman kebhinekaan</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-8 rounded-lg border-l-4 border-purple-600">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">👨‍💼 Dukungan Setelah Bekerja (5 tahun)</h3>
              <p className="text-gray-700 text-sm">
                Level 1-5 sesuai pengalaman • JLPT N3 & N2 • Ujian nasional perawat lansia • Adaptasi budaya berkelanjutan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tingkat Kelulusan */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Tingkat Kesuksesan OUR</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 text-center">
            <div className="bg-white/20 p-8 rounded-lg backdrop-blur">
              <p className="text-6xl font-bold mb-2">93.3%</p>
              <p className="text-xl font-semibold">Kelulusan Ujian Bahasa Jepang</p>
              <p className="text-green-100 text-sm mt-2">(Rata-rata umum: 68.6%)</p>
            </div>
            <div className="bg-white/20 p-8 rounded-lg backdrop-blur">
              <p className="text-6xl font-bold mb-2">96.9%</p>
              <p className="text-xl font-semibold">Kelulusan Ujian Keterampilan</p>
              <p className="text-green-100 text-sm mt-2">(Rata-rata umum: 77.5%)</p>
            </div>
          </div>
          <p className="text-center text-green-100 mt-12">
            📊 Total 9,357+ siswa | 7,512+ lulus SSW | 5,077+ bekerja di Jepang
          </p>
        </div>
      </section>

      {/* Biaya Section */}
      <section className="py-20" id="costs">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Biaya yang Perlu Disiapkan</h2>

          {/* Selama Pelatihan */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">Selama Pelatihan (6 Bulan)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-600">
                <p className="font-bold text-indigo-600 mb-3">📚 Buku Pembelajaran</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Level N5 (3 buku): Rp 380.000</li>
                  <li>• Level N4 (5 buku): Rp 370.000</li>
                  <li>• Kaigo (2 buku): Rp 220.000</li>
                  <li>• Latihan & Percakapan: Rp 123.000</li>
                </ul>
              </div>
              <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-600">
                <p className="font-bold text-indigo-600 mb-3">💉 Medical Check Up</p>
                <p className="text-sm text-gray-700 mb-3">Rp 800.000 - Rp 1.200.000</p>
                <p className="font-bold text-indigo-600 mb-3">📝 Biaya Ujian</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• JFT-Basic: Rp 550.000</li>
                  <li>• JLPT N4: Rp 180.000</li>
                  <li>• Ujian SSW: Rp 220.000</li>
                </ul>
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded mt-4 border-l-4 border-yellow-600 text-sm text-gray-700">
              💡 <span className="font-bold">Biaya Hidup:</span> Fleksibel tergantung kebutuhan (makan, transport, dll)
            </div>
          </div>

          {/* Setelah Interview */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">Setelah Lulus Interview User Jepang</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-600">
                <p className="font-bold text-orange-600 mb-3">💉 Medical Check Up</p>
                <p className="text-sm text-gray-700 mb-4">Rp 800.000 - Rp 1.200.000</p>
                <p className="font-bold text-orange-600 mb-3">🏥 Asuransi & Psikotest</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• BPJS: Rp 189.000</li>
                  <li>• Psikotest: ± Rp 300.000</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-600">
                <p className="font-bold text-orange-600 mb-3">📕 Paspor</p>
                <ul className="text-sm text-gray-700 space-y-1 mb-4">
                  <li>• Biasa: Rp 350.000</li>
                  <li>• E-Paspor: Rp 650.000</li>
                </ul>
                <p className="font-bold text-orange-600 mb-3">🏘️ Biaya Hidup Jepang</p>
                <p className="text-sm text-gray-700">Minimal Rp 10.000.000 untuk 1 bulan pertama</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Syarat & Ketentuan Section */}
      <section className="py-20 bg-red-50" id="requirements">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">⭐ Syarat & Ketentuan (PALING PENTING)</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { cat: 'Umum', items: ['Pria/Wanita', 'Usia 17-28 tahun (wajib genap 18 tahun)'] },
              { cat: 'Pendidikan', items: ['Minimal SMA/SMK/sederajat', 'Ijazah asli tidak ditahan/hilang'] },
              { cat: 'Status', items: ['TIDAK boleh sedang bekerja', 'TIDAK boleh memiliki status pendidikan aktif (kuliah, sekolah, online, cuti akademik)'] },
              { cat: 'Kesehatan', items: ['Sehat jasmani & rohani', 'TIDAK memiliki tato', 'TIDAK buta warna total/parsial'] },
              { cat: 'Komitmen', items: ['Diizinkan orang tua/wali (tertulis)', 'Bersedia pelatihan 7 bulan atau lebih'] }
            ].map((section, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border-l-4 border-red-600 shadow">
                <h3 className="text-lg font-bold text-red-600 mb-3">{section.cat}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-gray-700 flex items-start gap-3">
                      <span className="text-red-600 font-bold text-lg">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Warning Box */}
          <div className="max-w-4xl mx-auto mt-8 bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded">
            <p className="font-bold text-yellow-600 mb-3">⚠️ Perhatian Khusus:</p>
            <ul className="text-sm text-gray-800 space-y-2">
              <li>• <span className="font-bold">Status Pendidikan:</span> Tidak boleh aktif mengikuti apapun (termasuk cuti akademik)</li>
              <li>• <span className="font-bold">Tato:</span> Ditegaskan &quot;tidak memiliki tato&quot; tanpa terkecuali (budaya Jepang ketat)</li>
              <li>• <span className="font-bold">Buta Warna:</span> Perawatan lansia perlu perhatian detail, tidak diperbolehkan</li>
              <li>• <span className="font-bold">Izin Orang Tua:</span> Wajib tertulis - Anda akan bekerja jauh di Jepang</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Proses Pendaftaran */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Proses Pendaftaran (6 Langkah)</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { num: '1️⃣', title: 'Klik Link Pendaftaran', desc: 'bit.ly/PendaftaranSiswaOURMEDAN atau ikuti webinar gratis' },
              { num: '2️⃣', title: 'Pahami Program', desc: 'Baca semua info & pastikan siap berkomitmen 7 bulan' },
              { num: '3️⃣', title: 'Isi Formulir', desc: 'Data BENAR dan SESUAI dengan ketentuan yang berlaku' },
              { num: '4️⃣', title: 'Upload Dokumen Asli', desc: 'Pas foto, KTP, Ijazah (bukan fotocopy!)' },
              { num: '5️⃣', title: 'Konfirmasi via WhatsApp', desc: 'Hubungi nomor yang tertera di formulir setelah submit' },
              { num: '6️⃣', title: 'Tunggu Hasil', desc: 'Admin verifikasi dokumen & hubungi Anda dalam 1-2 minggu' }
            ].map((step, idx) => (
              <div key={idx} className="flex gap-6 bg-white p-6 rounded-lg shadow border-l-4 border-purple-600">
                <div className="text-4xl flex-shrink-0">{step.num}</div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-700">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pelayanan Komprehensif */}
      <section className="py-20 bg-gradient-to-r from-cyan-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">5 Pelayanan Komprehensif OUR</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { icon: '🎓', title: 'Perekrutan & Pendidikan', desc: 'Pelatihan gratis di 5 negara dengan pengajar berpengalaman' },
              { icon: '🤝', title: 'Perkenalan User Jepang', desc: 'Jaringan luas dengan employer di berbagai industri' },
              { icon: '📋', title: 'Bantuan Visa', desc: 'Proses lengkap visa Tokutei Ginou dari awal hingga approval' },
              { icon: '✈️', title: 'Dukungan Penerimaan', desc: 'Tempat tinggal & pelatihan adaptasi budaya Jepang' },
              { icon: '💪', title: 'Support 5 Tahun', desc: 'Pendidikan berkelanjutan & mentoring dari staff luar negeri' },
              { icon: '🌍', title: 'Kehadiran Global', desc: '7 lokasi, 9,357+ siswa, 5,077+ bekerja di Jepang' }
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-cyan-600">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-700 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Hubungi Kami</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 mb-12">
            <a href="tel:+6281168888844" className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
              <p className="text-blue-100 mb-4">Tanya & Konfirmasi</p>
              <p className="font-bold">0811 6888 8844</p>
            </a>

            <a href="https://instagram.com/onoderauserrun.mdn" target="_blank" className="bg-gradient-to-br from-pink-600 to-pink-800 text-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition">
              <div className="text-5xl mb-4">📸</div>
              <h3 className="text-xl font-bold mb-2">Instagram</h3>
              <p className="text-pink-100 mb-4">Info & Update</p>
              <p className="font-bold">@onoderauserrun.mdn</p>
            </a>

            <a href="https://maps.google.com/?q=Universitas+Sari+Mutiara+Indonesia+Medan" target="_blank" className="bg-gradient-to-br from-green-600 to-green-800 text-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-xl font-bold mb-2">Lokasi</h3>
              <p className="text-green-100 mb-4">Kunjungi Kami</p>
              <p className="font-bold text-sm">Universitas Sari Mutiara<br/>Medan</p>
            </a>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-8 text-lg">Jam Belajar: Senin-Jumat 08:00 - 17:00 WIB</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Siap Wujudkan Impianmu?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Jangan tunda lagi! Pendaftaran Batch 55 terbuka sekarang. Ribuan alumni OUR sudah sukses bekerja di Jepang.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfuEPShTwZYYtfSCGo8_y6S3_YPyfF4Aq2uDt1R7pGmeHP6-w/viewform"
            target="_blank"
            className="inline-block px-12 py-5 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-300 transition text-xl"
          >
            ✨ DAFTAR SEKARANG ✨
          </a>
          <p className="text-blue-100 mt-8 text-sm">Investasi terbaik untuk masa depanmu!</p>
        </div>
      </section>
    </>
  )
}
