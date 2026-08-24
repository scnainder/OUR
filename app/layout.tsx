import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OUR - Landing Pages',
  description: 'OUR Project Landing Pages',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
