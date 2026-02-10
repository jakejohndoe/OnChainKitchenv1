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
    id: 'what-is-blockchain',
    title: 'Lesson 1: What is Blockchain?',
    description: 'Understand the fundamental concepts of blockchain technology, distributed ledgers, and consensus mechanisms.',
    difficulty: 'Beginner',
    duration: '30 mins',
    status: 'available',
    icon: '⛓️',
    topics: ['Blocks', 'Transactions', 'Decentralization', 'Consensus']
  },
  {
    id: 'what-is-ethereum',
    title: 'Lesson 2: What is Ethereum?',
    description: 'Dive into Ethereum, smart contracts, gas fees, and how the Ethereum Virtual Machine works.',
    difficulty: 'Beginner',
    duration: '45 mins',
    status: 'available',
    icon: '💎',
    topics: ['Smart Contracts', 'Gas', 'EVM', 'Accounts']
  },
  {
    id: 'token-standards',
    title: 'Lesson 3: Token Standards Explained',
    description: 'Explore the most important token standards: ERC-20, ERC-721, and ERC-1155 with practical examples.',
    difficulty: 'Intermediate',
    duration: '1 hour',
    status: 'available',
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
  },
  {
    id: 'defi-garden',
    title: 'Lesson 5: The DeFi Garden',
    description: 'Plant tokens, watch them grow, and harvest your yield. Learn how DeFi staking and vaults work.',
    difficulty: 'Intermediate',
    duration: '1.5 hours',
    status: 'available',
    icon: '🌱',
    topics: ['Token Approvals', 'Staking', 'ERC-4626 Vaults', 'Auto-compounding', 'DeFi']
  }
]

export default function TutorialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="w-full bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img src="/logos/TA-Hero-Logo-White.png" alt="Trustless Academy" className="h-16 w-auto" />
              <h1 className="text-xl font-bold text-white">Trustless Academy</h1>
            </Link>
          </div>
          <nav className="flex items-center space-x-6">
            <Link href="/tutorials" className="text-purple-400 font-medium">
              Tutorials
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-purple-400 transition-colors">
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
          <h1 className="text-4xl font-bold text-white mb-4">
            Web3 Learning Path
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
                  ? 'bg-slate-800 border border-slate-700 hover:border-purple-500/50 shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1'
                  : 'bg-slate-800/50 border border-slate-700/50 opacity-75'
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
        <div className="mt-16 bg-slate-800 border border-slate-700 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">📚 Your Learning Path</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold text-white">Start with Blockchain Basics</h3>
                <p className="text-gray-400">Understand the foundational technology</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold text-white">Learn Ethereum & Smart Contracts</h3>
                <p className="text-gray-400">Discover how programmable blockchains work</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold text-white">Explore Token Standards</h3>
                <p className="text-gray-400">Understand ERC-20, ERC-721, and ERC-1155 tokens</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-semibold text-white">Experience Web3 Hands-On</h3>
                <p className="text-gray-400">Apply everything in the On-Chain Kitchen tutorial</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2026 Trustless Academy • Learn Web3 by Doing • Open Source Education
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
          <span className="bg-slate-700 text-gray-400 px-3 py-1 rounded-full text-sm font-medium">
            Coming Soon
          </span>
        )}
        {tutorial.status === 'available' && (
          <span className="bg-green-900/50 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
            Available Now
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{tutorial.title}</h3>
      <p className="text-gray-400 mb-4">{tutorial.description}</p>

      <div className="flex items-center gap-4 text-sm mb-4">
        <span className={`px-2 py-1 rounded ${
          tutorial.difficulty === 'Beginner' ? 'bg-green-900/50 text-green-400' :
          tutorial.difficulty === 'Intermediate' ? 'bg-yellow-900/50 text-yellow-400' :
          'bg-red-900/50 text-red-400'
        }`}>
          {tutorial.difficulty}
        </span>
        <span className="text-gray-500">⏱ {tutorial.duration}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {tutorial.topics.map((topic) => (
          <span
            key={topic}
            className="bg-purple-900/30 text-purple-400 px-2 py-1 rounded text-sm"
          >
            {topic}
          </span>
        ))}
      </div>

      {tutorial.status === 'available' && (
        <div className="mt-6 text-purple-400 font-medium flex items-center">
          Start Learning →
        </div>
      )}
    </>
  )
}