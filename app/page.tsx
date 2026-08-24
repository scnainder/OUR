export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Welcome to OUR
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-12">
          Beautiful landing pages built with Next.js
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
          <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-slate-900 transition">
            Learn More
          </button>
        </div>
      </div>
    </main>
  )
}
