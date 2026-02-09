import Link from 'next/link'
import DuckMascot from '../../../components/DuckMascot'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What is Blockchain? | Trustless Academy',
  description: 'Learn blockchain fundamentals with simple explanations and visual metaphors. Understand blocks, chains, decentralization, and consensus without technical jargon.',
  openGraph: {
    title: 'What is Blockchain? | Trustless Academy',
    description: 'Learn blockchain fundamentals with simple explanations and visual metaphors. Perfect introduction to Web3 concepts.',
    url: 'https://trustless.academy/tutorials/what-is-blockchain',
  },
  twitter: {
    title: 'What is Blockchain? | Trustless Academy',
    description: 'Learn blockchain fundamentals with simple explanations and visual metaphors. Perfect introduction to Web3 concepts.',
  },
}

export default function WhatIsBlockchain() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">What is Blockchain?</h1>
          <p className="text-lg text-gray-300">
            Let's understand the magic behind Web3, explained simply!
          </p>
        </div>

        {/* Duck Introduction */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start space-x-4">
            <DuckMascot size="large" expression="happy" />
            <div className="flex-1">
              <div className="bg-yellow-100 rounded-xl p-4">
                <p className="text-gray-900">
                  <strong>Quack! 🦆</strong> I'm your friendly guide through the world of blockchain!
                  No coding required, no jargon — just simple explanations that anyone can understand.
                  Let's explore together!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: The Digital Ledger */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">📖 Imagine a Digital Notebook</h2>

          <div className="space-y-4 text-gray-300">
            <p>
              Think of blockchain as a special notebook that everyone in the world can read, but no one can erase or change what's already written.
            </p>

            {/* Visual Metaphor */}
            <div className="bg-slate-700/50 rounded-xl p-6 my-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
                  <div className="text-3xl mb-2">📝</div>
                  <div className="font-semibold">Traditional Ledger</div>
                  <div className="text-sm text-gray-400 mt-1">One owner, can be changed</div>
                </div>
                <div className="text-2xl self-center">→</div>
                <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg p-4 border-2 border-purple-500/50">
                  <div className="text-3xl mb-2">🔗</div>
                  <div className="font-semibold">Blockchain</div>
                  <div className="text-sm text-gray-400 mt-1">Everyone owns, unchangeable</div>
                </div>
              </div>
            </div>

            <p>
              Every time someone makes a transaction (like sending money), it gets written in this notebook.
              Once written, it's there forever — creating a permanent history of everything that's happened.
            </p>
          </div>
        </div>

        {/* Section 2: What are Blocks? */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">📦 What are "Blocks"?</h2>

          <div className="space-y-4 text-gray-300">
            <p>
              Each page in our special notebook is called a "block". Every block contains:
            </p>

            {/* Block Visualization */}
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-6">
              <div className="space-y-3">
                <div className="bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-600">
                  <span className="text-2xl mr-3">📋</span>
                  <strong>Transactions:</strong> A list of who sent what to whom
                </div>
                <div className="bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-600">
                  <span className="text-2xl mr-3">⏰</span>
                  <strong>Timestamp:</strong> Exactly when these transactions happened
                </div>
                <div className="bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-600">
                  <span className="text-2xl mr-3">🔐</span>
                  <strong>Special Code (Hash):</strong> A unique fingerprint for this block
                </div>
                <div className="bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-600">
                  <span className="text-2xl mr-3">⬅️</span>
                  <strong>Previous Block Link:</strong> Connection to the block before it
                </div>
              </div>
            </div>

            <p>
              Think of it like LEGO blocks — each new block connects to the previous one, creating an unbreakable chain!
            </p>
          </div>
        </div>

        {/* Section 3: The Chain */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">⛓️ Creating the Chain</h2>

          <div className="space-y-4 text-gray-300">
            <p>
              Here's where the magic happens! Each block is connected to the one before it, forming a chain:
            </p>

            {/* Chain Visualization */}
            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-xl p-6 overflow-x-auto">
              <div className="flex items-center space-x-2 min-w-max">
                <div className="bg-slate-800 rounded-lg p-4 shadow-md border border-slate-600">
                  <div className="text-center">
                    <div className="text-2xl mb-1">📦</div>
                    <div className="text-xs font-semibold">Block 1</div>
                    <div className="text-xs text-gray-400">Genesis</div>
                  </div>
                </div>
                <div className="text-2xl">→</div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-center">
                    <div className="text-2xl mb-1">📦</div>
                    <div className="text-xs font-semibold">Block 2</div>
                    <div className="text-xs text-gray-400">Links to #1</div>
                  </div>
                </div>
                <div className="text-2xl">→</div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-center">
                    <div className="text-2xl mb-1">📦</div>
                    <div className="text-xs font-semibold">Block 3</div>
                    <div className="text-xs text-gray-400">Links to #2</div>
                  </div>
                </div>
                <div className="text-2xl">→</div>
                <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-4 shadow-md border-2 border-purple-500/50">
                  <div className="text-center">
                    <div className="text-2xl mb-1">📦</div>
                    <div className="text-xs font-semibold">New Block</div>
                    <div className="text-xs text-gray-400">Links to #3</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-100 rounded-xl p-4 mt-6">
              <p className="text-sm text-gray-900">
                <strong>🦆 Duck Tip:</strong> If someone tries to change an old block, it would break the chain!
                Everyone would immediately notice because the connections wouldn't match anymore.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Decentralization */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">🌍 No Single Owner (Decentralization)</h2>

          <div className="space-y-4 text-gray-300">
            <p>
              Here's the revolutionary part: instead of one company keeping the notebook, thousands of people around the world each have an identical copy!
            </p>

            {/* Decentralization Visual */}
            <div className="grid grid-cols-2 gap-6 my-6">
              <div className="bg-red-900/20 rounded-xl p-6 text-center border border-red-900/30">
                <div className="text-4xl mb-3">🏢</div>
                <div className="font-semibold mb-2">Traditional System</div>
                <div className="text-sm">
                  One company controls everything. If they disappear or get hacked, everything is lost.
                </div>
              </div>
              <div className="bg-green-900/20 rounded-xl p-6 text-center border border-green-900/30">
                <div className="text-4xl mb-3">🌐</div>
                <div className="font-semibold mb-2">Blockchain</div>
                <div className="text-sm">
                  Thousands of copies exist. Even if many disappear, the system keeps running!
                </div>
              </div>
            </div>

            <p>
              It's like if everyone in your neighborhood had a copy of the same photo album.
              If someone tried to secretly change a photo in their album, everyone else would know it's fake because their copies wouldn't match!
            </p>
          </div>
        </div>

        {/* Section 5: Consensus */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">🤝 How Everyone Agrees (Consensus)</h2>

          <div className="space-y-4 text-gray-300">
            <p>
              With thousands of copies, how does everyone agree on what's true? They vote!
            </p>

            <div className="bg-gradient-to-r from-purple-900/20 to-purple-900/30 rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">1️⃣</div>
                  <div>Someone proposes a new block of transactions</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">2️⃣</div>
                  <div>Special computers (miners/validators) verify it's legitimate</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">3️⃣</div>
                  <div>When majority agrees, the block is added to everyone's chain</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">✅</div>
                  <div>Everyone updates their copy to match</div>
                </div>
              </div>
            </div>

            <p className="mt-6">
              This is like a group project where everyone must agree before making any changes.
              No single person can cheat because they'd need to convince the majority!
            </p>
          </div>
        </div>

        {/* Why It Matters */}
        <div className="bg-gradient-to-br from-yellow-900/20 to-amber-900/20 rounded-2xl shadow-lg p-8 mb-8 border border-yellow-900/30">
          <h2 className="text-2xl font-bold text-white mb-6">💡 Why This Matters</h2>

          <div className="space-y-4 text-gray-300">
            <p className="font-semibold">Blockchain creates something we've never had before:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
                <div className="text-xl mb-2">🔒 Trust Without Middlemen</div>
                <div className="text-sm">Send money directly without banks</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
                <div className="text-xl mb-2">📜 Permanent Records</div>
                <div className="text-sm">History that can't be erased or altered</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
                <div className="text-xl mb-2">🌍 Global Access</div>
                <div className="text-sm">Available to anyone with internet</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
                <div className="text-xl mb-2">🎯 Transparent</div>
                <div className="text-sm">Everyone can verify what's happening</div>
              </div>
            </div>
          </div>
        </div>

        {/* Duck Summary */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start space-x-4">
            <DuckMascot size="medium" expression="curious" />
            <div className="flex-1">
              <div className="bg-green-100 rounded-xl p-4">
                <p className="text-gray-900">
                  <strong>🦆 Quick Recap:</strong> Blockchain is a shared digital notebook that everyone can read but no one can change.
                  It's made of connected blocks forming an unbreakable chain, maintained by thousands of people worldwide who all agree on what's true.
                  Pretty cool, right?
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl shadow-lg p-8 border border-purple-500/30">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-4">Ready for the Next Step?</h3>
            <p className="text-gray-300 mb-6">
              Now that you understand blockchain, let's explore Ethereum — the blockchain that adds superpowers!
            </p>
            <Link
              href="/tutorials/what-is-ethereum"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium"
            >
              Next Tutorial: What is Ethereum →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}