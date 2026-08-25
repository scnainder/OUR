'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold hover:text-blue-200 transition">
          OUR Medan
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="/" className="hover:text-blue-200 transition font-medium">
            Home
          </Link>
          <Link href="/program" className="hover:text-blue-200 transition font-medium">
            Program
          </Link>
          <Link href="/requirements" className="hover:text-blue-200 transition font-medium">
            Syarat & Ketentuan
          </Link>
          <Link href="/registration" className="hover:text-blue-200 transition font-medium">
            Cara Daftar
          </Link>
          <a href="tel:+6281168888844" className="px-4 py-2 bg-yellow-400 text-blue-900 font-bold rounded hover:bg-yellow-300 transition">
            Hubungi Kami
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-blue-800 px-4 py-4 space-y-3">
          <Link href="/" className="block hover:text-blue-200 transition font-medium py-2">
            Home
          </Link>
          <Link href="/program" className="block hover:text-blue-200 transition font-medium py-2">
            Program
          </Link>
          <Link href="/requirements" className="block hover:text-blue-200 transition font-medium py-2">
            Syarat & Ketentuan
          </Link>
          <Link href="/registration" className="block hover:text-blue-200 transition font-medium py-2">
            Cara Daftar
          </Link>
          <a href="tel:+6281168888844" className="block px-4 py-2 bg-yellow-400 text-blue-900 font-bold rounded hover:bg-yellow-300 transition text-center">
            Hubungi Kami
          </a>
        </div>
      )}
    </header>
  )
}
