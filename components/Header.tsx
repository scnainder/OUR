export default function Header() {
  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">OUR</div>
        <nav className="flex gap-6">
          <a href="#" className="hover:text-blue-400 transition">
            Home
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            About
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            Services
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}
