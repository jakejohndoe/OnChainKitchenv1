import Link from 'next/link'
import DuckMascot from '../../../components/DuckMascot'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What is Ethereum? | Trustless Academy',
  description: 'Discover Ethereum, smart contracts, gas fees, and the EVM. Learn how Ethereum adds programmability to blockchain with simple explanations.',
  openGraph: {
    title: 'What is Ethereum? | Trustless Academy',
    description: 'Discover Ethereum, smart contracts, gas fees, and the EVM. Learn how blockchain becomes programmable.',
    url: 'https://trustless.academy/tutorials/what-is-ethereum',
  },
  twitter: {
    title: 'What is Ethereum? | Trustless Academy',
    description: 'Discover Ethereum, smart contracts, gas fees, and the EVM. Learn how blockchain becomes programmable.',
  },
}

export default function WhatIsEthereum() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">What is Ethereum?</h1>
          <p className="text-lg text-gray-600">
            Blockchain with superpowers — let's discover what makes Ethereum special!
          </p>
        </div>

        {/* Duck Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start space-x-4">
            <DuckMascot size="large" expression="excited" />
            <div className="flex-1">
              <div className="bg-purple-100 rounded-xl p-4">
                <p className="text-gray-700">
                  <strong>Quack quack! 🦆</strong> Welcome back! You already understand blockchain —
                  now let's explore Ethereum, which takes those concepts and adds programmable magic!
                  Think of it as blockchain 2.0!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bitcoin vs Ethereum */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🪙 Bitcoin vs Ethereum: The Simple Difference</h2>

          <div className="space-y-4 text-gray-700">
            <p>
              If Bitcoin is digital gold, Ethereum is a digital computer that the whole world shares!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-orange-50 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">₿</div>
                  <div className="font-bold text-lg">Bitcoin</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <span className="mr-2">📊</span>
                    <span>Digital money ledger</span>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-2">💰</span>
                    <span>Tracks who owns how much Bitcoin</span>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-2">🔄</span>
                    <span>Can only send and receive money</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-300">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">Ξ</div>
                  <div className="font-bold text-lg">Ethereum</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <span className="mr-2">💻</span>
                    <span>World computer</span>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-2">🤖</span>
                    <span>Runs programs (smart contracts)</span>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-2">🎮</span>
                    <span>Can build apps, games, and more!</span>
                  </div>
                </div>
              </div>
            </div>

            <p>
              Think of Bitcoin as a calculator that only does addition and subtraction,
              while Ethereum is a full computer that can run any program!
            </p>
          </div>
        </div>

        {/* Smart Contracts */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🤖 Smart Contracts: Digital Vending Machines</h2>

          <div className="space-y-4 text-gray-700">
            <p>
              Smart contracts are programs that live on the blockchain. Think of them as digital vending machines:
            </p>

            {/* Vending Machine Analogy */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 my-6">
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">🥤</div>
                <div className="font-bold text-lg">Real Vending Machine</div>
              </div>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 flex items-center">
                  <span className="text-xl mr-3">1️⃣</span>
                  <span>Insert money</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center">
                  <span className="text-xl mr-3">2️⃣</span>
                  <span>Press button for your choice</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center">
                  <span className="text-xl mr-3">3️⃣</span>
                  <span>Machine automatically gives you the item</span>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center">
                  <span className="text-xl mr-3">✅</span>
                  <span>No cashier needed!</span>
                </div>
              </div>
            </div>

            <p>
              Smart contracts work the same way — they automatically execute when conditions are met,
              without needing a middleman!
            </p>

            <div className="bg-yellow-50 rounded-xl p-4 mt-6">
              <p className="text-sm">
                <strong>🦆 Duck Example:</strong> Imagine buying a concert ticket. With a smart contract,
                when you send payment, you automatically receive the digital ticket. No ticket office needed!
                The contract handles everything automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Gas Explained */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">⛽ Gas: Fuel for the World Computer</h2>

          <div className="space-y-4 text-gray-700">
            <p>
              Just like a car needs fuel, Ethereum needs "gas" to run programs. But what is gas?
            </p>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 my-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🚗</div>
                  <div className="font-semibold mb-1">Real Car</div>
                  <div className="text-sm">Needs gas to drive</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">💻</div>
                  <div className="font-semibold mb-1">Ethereum</div>
                  <div className="text-sm">Needs gas to compute</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">💰</div>
                  <div className="font-semibold mb-1">Gas = ETH</div>
                  <div className="text-sm">Pay in Ethereum's currency</div>
                </div>
              </div>
            </div>

            <p>
              <strong>Why gas exists:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Prevents spam (costs money to run programs)</li>
              <li>Rewards computers that process transactions</li>
              <li>Ensures fair use of the network</li>
            </ul>

            <div className="bg-blue-50 rounded-xl p-4 mt-6">
              <p className="text-sm">
                <strong>🦆 Simple Analogy:</strong> It's like paying for electricity to power your devices.
                Simple tasks (like sending ETH) use little gas, complex programs use more gas.
              </p>
            </div>
          </div>
        </div>

        {/* Accounts */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">👤 Accounts: Your Identity on Ethereum</h2>

          <div className="space-y-4 text-gray-700">
            <p>
              On Ethereum, your account is like your digital identity and wallet combined:
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 my-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl mb-2">🔑</div>
                  <div className="font-semibold mb-2">Your Account Has:</div>
                  <ul className="text-sm space-y-1">
                    <li>• An address (like an email)</li>
                    <li>• A balance (ETH you own)</li>
                    <li>• A private key (your password)</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl mb-2">📬</div>
                  <div className="font-semibold mb-2">Your Address:</div>
                  <div className="font-mono text-xs bg-gray-100 p-2 rounded mt-2 break-all">
                    0x742d35Cc6634C053...
                  </div>
                  <p className="text-xs mt-2">Like a bank account number anyone can send to</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-xl p-4">
              <p className="text-sm text-red-800">
                <strong>⚠️ Important:</strong> Your private key is like the key to your house.
                Never share it! Anyone with your private key can take everything in your account.
              </p>
            </div>
          </div>
        </div>

        {/* EVM */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎮 The EVM: Ethereum's Game Console</h2>

          <div className="space-y-4 text-gray-700">
            <p>
              The Ethereum Virtual Machine (EVM) is like a game console that runs smart contracts:
            </p>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 my-6">
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">🎮</div>
              </div>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3">
                  <strong>Just like a PlayStation runs games...</strong><br/>
                  The EVM runs smart contracts!
                </div>
                <div className="bg-white rounded-lg p-3">
                  <strong>Every computer on the network has the EVM...</strong><br/>
                  So everyone can run the same programs!
                </div>
                <div className="bg-white rounded-lg p-3">
                  <strong>Programs run exactly the same everywhere...</strong><br/>
                  Ensuring everyone gets the same results!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What Can You Build? */}
        <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 What Can You Build on Ethereum?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="text-xl mb-2">💸 DeFi</div>
              <div className="text-sm text-gray-600">Banking without banks</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-xl mb-2">🎨 NFTs</div>
              <div className="text-sm text-gray-600">Digital collectibles & art</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-xl mb-2">🎮 Games</div>
              <div className="text-sm text-gray-600">Games where you truly own items</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-xl mb-2">🗳️ DAOs</div>
              <div className="text-sm text-gray-600">Organizations run by code</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-xl mb-2">🪙 Tokens</div>
              <div className="text-sm text-gray-600">Create your own currencies</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-xl mb-2">🤝 Marketplaces</div>
              <div className="text-sm text-gray-600">Trade without intermediaries</div>
            </div>
          </div>

          <p className="text-gray-700 mt-6 text-center font-medium">
            The possibilities are endless — if you can imagine it, you can probably build it on Ethereum!
          </p>
        </div>

        {/* Duck Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start space-x-4">
            <DuckMascot size="medium" expression="happy" />
            <div className="flex-1">
              <div className="bg-green-100 rounded-xl p-4">
                <p className="text-gray-700">
                  <strong>🦆 Let's Recap:</strong> Ethereum is blockchain + programmability.
                  It's a world computer where smart contracts (programs) run automatically,
                  powered by gas (fees), managed through accounts (digital identities),
                  all running on the EVM (the computer's operating system).
                  Ready to see how tokens work?
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl shadow-lg p-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">One More Concept to Master!</h3>
            <p className="text-gray-700 mb-6">
              Now let's explore token standards — the blueprints that power everything from currencies to collectibles!
            </p>
            <Link
              href="/tutorials/token-standards"
              className="inline-flex items-center bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors font-medium"
            >
              Next Tutorial: Token Standards Explained →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}