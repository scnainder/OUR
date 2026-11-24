import type { Metadata } from 'next'
import KursTable from './KursTable'

export const metadata: Metadata = {
  title: 'Kurs Kirim Uang Jepang → Indonesia Hari Ini (Wise, SBI Remit, Instarem, dll)',
  description:
    'Bandingkan kurs JPY ke IDR dari Wise, SBI Remit, Instarem, Brastel, Smile Remit dan lainnya. Diperbarui otomatis setiap jam. Cari yang paling banyak diterima di Indonesia.',
}

export default function KursPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold">Kurs Kirim Uang Jepang → Indonesia</h1>
          <p className="text-emerald-100 mt-3">
            Bandingkan jumlah rupiah yang benar-benar diterima keluarga di Indonesia. Kurs diperbarui otomatis tiap jam.
          </p>
        </div>
      </section>
      <section className="container mx-auto px-4 max-w-4xl py-8">
        <KursTable />
        <p className="text-xs text-gray-500 mt-8 leading-relaxed">
          Keterbukaan: halaman ini berisi link afiliasi. Jika kamu mendaftar lewat link kami, kami bisa mendapat komisi tanpa biaya tambahan
          untukmu. Data kurs diambil dari sumber publik dan bersifat estimasi; kurs final ditentukan provider saat transaksi.
          Provider bertanda &quot;Cek kurs&quot; tidak menyediakan data otomatis.
        </p>
      </section>
    </div>
  )
}
