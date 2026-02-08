import Link from 'next/link'
import DuckMascot from '../components/DuckMascot'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <DuckMascot size="small" expression="happy" />
            <h1 className="text-xl font-bold text-gray-800">Trustless Academy</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <Link href="/tutorials" className="text-gray-700 hover:text-blue-600 transition-colors">
              Tutorials
            </Link>
            <Link href="/waitlist" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all">
              Join Waitlist
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <DuckMascot size="xlarge" expression="excited" className="mx-auto mb-8" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Trustless Academy
          </h1>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            Finally understand how blockchain actually works. Interactive experiences that let anyone explore Web3 concepts — no technical background needed.
          </p>
          <Link
            href="/tutorials"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
          >
            Browse Tutorials →
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Learn by Doing</h3>
            <p className="text-gray-600">
              No boring theory. Experience real blockchain interactions through simple clicks and guided exploration.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-4xl mb-4">🦆</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Friendly Guidance</h3>
            <p className="text-gray-600">
              Our duck mascot explains complex concepts in simple terms, making Web3 accessible to everyone.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Safe Environment</h3>
            <p className="text-gray-600">
              Practice on testnets with free tokens. Learn and explore without any financial risk.
            </p>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-12 rounded-3xl mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl">
              <div className="text-2xl mb-2">⛓️</div>
              <h4 className="font-semibold text-gray-800">Blockchain Basics</h4>
              <p className="text-sm text-gray-600 mt-2">Understand blocks, transactions, and consensus</p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <div className="text-2xl mb-2">💎</div>
              <h4 className="font-semibold text-gray-800">Smart Contracts</h4>
              <p className="text-sm text-gray-600 mt-2">Understand how smart contracts work</p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <div className="text-2xl mb-2">🪙</div>
              <h4 className="font-semibold text-gray-800">Token Standards</h4>
              <p className="text-sm text-gray-600 mt-2">Master ERC-20, ERC-721, and ERC-1155</p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <div className="text-2xl mb-2">🌐</div>
              <h4 className="font-semibold text-gray-800">DApp Interaction</h4>
              <p className="text-sm text-gray-600 mt-2">Experience using Web3 applications</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
          <DuckMascot size="medium" expression="happy" className="mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Start Learning?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Begin your Web3 journey with our interactive tutorials. No prior blockchain experience needed!
          </p>
          <Link
            href="/tutorials"
            className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl"
          >
            Start Learning Now →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            © 2024 Trustless Academy • Learn Web3 by Doing • Open Source Education
          </p>
        </div>
      </footer>
    </div>
  )
}