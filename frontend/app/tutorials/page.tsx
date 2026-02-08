import Link from 'next/link'
import DuckMascot from '../../components/DuckMascot'

interface Tutorial {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  status: 'available' | 'coming-soon'
  icon: string
  topics: string[]
}

const tutorials: Tutorial[] = [
  {
    id: 'blockchain-basics',
    title: 'Lesson 1: What is Blockchain?',
    description: 'Understand the fundamental concepts of blockchain technology, distributed ledgers, and consensus mechanisms.',
    difficulty: 'Beginner',
    duration: '30 mins',
    status: 'coming-soon',
    icon: '⛓️',
    topics: ['Blocks', 'Transactions', 'Mining', 'Consensus']
  },
  {
    id: 'ethereum-intro',
    title: 'Lesson 2: What is Ethereum?',
    description: 'Dive into Ethereum, smart contracts, gas fees, and how the Ethereum Virtual Machine works.',
    difficulty: 'Beginner',
    duration: '45 mins',
    status: 'coming-soon',
    icon: '💎',
    topics: ['Smart Contracts', 'Gas', 'EVM', 'Accounts']
  },
  {
    id: 'token-standards',
    title: 'Lesson 3: Token Standards Explained',
    description: 'Explore the most important token standards: ERC-20, ERC-721, and ERC-1155 with practical examples.',
    difficulty: 'Intermediate',
    duration: '1 hour',
    status: 'coming-soon',
    icon: '🪙',
    topics: ['ERC-20', 'ERC-721', 'ERC-1155', 'Token Economics']
  },
  {
    id: 'on-chain-kitchen',
    title: 'Lesson 4: On-Chain Kitchen',
    description: 'Learn by doing! Experience tokens, NFTs, and inventories through a fun, interactive cooking tutorial.',
    difficulty: 'Beginner',
    duration: '2 hours',
    status: 'available',
    icon: '👨‍🍳',
    topics: ['ERC-20 Faucet', 'ERC-1155 Shop', 'NFT Minting', 'Interactive Experience']
  }
]

export default function TutorialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-indigo-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <DuckMascot size="small" expression="happy" />
              <h1 className="text-xl font-bold text-gray-800">Trustless Academy</h1>
            </Link>
          </div>
          <nav className="flex items-center space-x-6">
            <Link href="/tutorials" className="text-blue-600 font-medium">
              Tutorials
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <DuckMascot size="large" expression="excited" className="mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Web3 Learning Path
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Start from the basics and progress through interactive experiences. Each lesson builds on the previous one, creating a complete learning journey.
          </p>
        </div>

        {/* Tutorials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {tutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className={`relative overflow-hidden rounded-2xl transition-all ${
                tutorial.status === 'available'
                  ? 'bg-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                  : 'bg-gray-100 opacity-75'
              }`}
            >
              {tutorial.status === 'available' ? (
                <Link href={`/tutorials/${tutorial.id}`} className="block p-8">
                  <TutorialCard tutorial={tutorial} />
                </Link>
              ) : (
                <div className="p-8 cursor-not-allowed">
                  <TutorialCard tutorial={tutorial} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Learning Path Info */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 Your Learning Path</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold text-gray-800">Start with Blockchain Basics</h3>
                <p className="text-gray-600">Understand the foundational technology</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold text-gray-800">Learn Ethereum & Smart Contracts</h3>
                <p className="text-gray-600">Discover how programmable blockchains work</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold text-gray-800">Explore Token Standards</h3>
                <p className="text-gray-600">Understand ERC-20, ERC-721, and ERC-1155 tokens</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-semibold text-gray-800">Experience Web3 Hands-On</h3>
                <p className="text-gray-600">Apply everything in the On-Chain Kitchen tutorial</p>
              </div>
            </div>
          </div>
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

function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  return (
    <>
      <div className="flex items-start justify-between mb-4">
        <div className="text-5xl">{tutorial.icon}</div>
        {tutorial.status === 'coming-soon' && (
          <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
            Coming Soon
          </span>
        )}
        {tutorial.status === 'available' && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            Available Now
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2">{tutorial.title}</h3>
      <p className="text-gray-600 mb-4">{tutorial.description}</p>

      <div className="flex items-center gap-4 text-sm mb-4">
        <span className={`px-2 py-1 rounded ${
          tutorial.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
          tutorial.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {tutorial.difficulty}
        </span>
        <span className="text-gray-500">⏱ {tutorial.duration}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {tutorial.topics.map((topic) => (
          <span
            key={topic}
            className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-sm"
          >
            {topic}
          </span>
        ))}
      </div>

      {tutorial.status === 'available' && (
        <div className="mt-6 text-blue-600 font-medium flex items-center">
          Start Learning →
        </div>
      )}
    </>
  )
}