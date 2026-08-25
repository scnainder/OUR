import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'OUR Medan - Program Perawat Lansia di Jepang',
  description: 'Program Zero Based KAIGO OUR Medan. Pelatihan gratis untuk bekerja sebagai perawat lansia di Jepang dengan visa Tokutei Ginou. Batch 55 dimulai 7 September 2026.',
  keywords: 'OUR, Medan, perawat lansia, kaigo, Jepang, tokutei ginou, pelatihan gratis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
