import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import MetaPixelTracker from '@/components/MetaPixelTracker'

export const metadata: Metadata = {
  title: 'OUR Blooming Academy - Program Kerja di Jepang',
  description: 'Pilih bidang: Perawat Lansia (KAIGO) atau Layanan Makanan. Pelatihan gratis untuk bekerja di Jepang dengan visa Tokutei Ginou.',
  keywords: 'OUR, OUR Blooming Academy, perawat lansia, kaigo, layanan makanan, Jepang, tokutei ginou, pelatihan gratis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '4441109292802290');
              fbq('track', 'ViewContent');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=4441109292802290&ev=ViewContent&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="flex flex-col min-h-screen">
        <MetaPixelTracker />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  )
}
