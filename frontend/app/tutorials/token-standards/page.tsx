import Link from 'next/link'
import DuckMascot from '../../../components/DuckMascot'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Token Standards Explained (ERC-20, ERC-721, ERC-1155) | Trustless Academy',
  description: 'Understand ERC-20, ERC-721, and ERC-1155 token standards with real-world analogies. Learn the blueprints that power all of Web3.',
  openGraph: {
    title: 'Token Standards Explained | Trustless Academy',
    description: 'Master ERC-20, ERC-721, and ERC-1155 with simple analogies: dollars, trading cards, and game inventories.',
    url: 'https://trustless.academy/tutorials/token-standards',
  },
  twitter: {
    title: 'Token Standards Explained | Trustless Academy',
    description: 'Master ERC-20, ERC-721, and ERC-1155 with simple analogies: dollars, trading cards, and game inventories.',
  },
}

export default function TokenStandards() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Token Standards Explained</h1>
          <p className="text-lg text-gray-400">
            The blueprints that power everything from currencies to collectibles!
          </p>
        </div>

        {/* Duck Introduction */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start space-x-4">
            <DuckMascot size="large" expression="curious" />
            <div className="flex-1">
              <div className="bg-green-100 rounded-xl p-4">
                <p className="text-gray-300">
                  <strong>Ready for the final piece? 🦆</strong> You've learned about blockchain and Ethereum.
                  Now let's discover token standards — the rules that tell smart contracts how to create
                  different types of digital assets. This is where it all comes together!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What Are Standards */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">📐 What Are Token Standards?</h2>

          <div className="space-y-4 text-gray-300">
            <p>
              Token standards are like blueprints or templates that tell smart contracts how to behave.
              Think of them as instruction manuals!
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 my-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🏗️</div>
                  <div className="font-semibold mb-1">Building a House</div>
                  <div className="text-sm">You need blueprints</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🍰</div>
                  <div className="font-semibold mb-1">Baking a Cake</div>
                  <div className="text-sm">You need a recipe</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🪙</div>
                  <div className="font-semibold mb-1">Creating Tokens</div>
                  <div className="text-sm">You need standards</div>
                </div>
              </div>
            </div>

            <p>
              Standards ensure that all tokens of the same type work the same way, so wallets, exchanges,
              and other apps know exactly how to handle them!
            </p>
          </div>
        </div>

        {/* ERC-20 */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">💵 ERC-20: Digital Dollars</h2>

          <div className="space-y-4 text-gray-300">
            <p>
              <strong>ERC-20 tokens are fungible</strong> — meaning each token is identical and interchangeable,
              just like regular money!
            </p>

            {/* Dollar Analogy */}
            <div className="bg-green-900/20 rounded-xl p-6 my-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">💵</div>
                <div className="font-bold text-lg">Think: Dollar Bills</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="font-semibold mb-2">Real Dollars:</div>
                  <ul className="text-sm space-y-1">
                    <li>• Every $1 bill has same value</li>
                    <li>• You can exchange any $1 for another</li>
                    <li>• Divisible: 1 dollar = 100 cents</li>
                    <li>• Can be sent to anyone</li>
                  </ul>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="font-semibold mb-2">ERC-20 Tokens:</div>
                  <ul className="text-sm space-y-1">
                    <li>• Every token has same value</li>
                    <li>• You can exchange any token for another</li>
                    <li>• Divisible into smaller pieces</li>
                    <li>• Can be sent to any address</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-100 rounded-xl p-4">
              <p className="text-sm text-gray-900">
                <strong>🦆 Examples you might know:</strong> USDC (digital dollars), DAI (stable currency),
                UNI (Uniswap governance), and yes — the KitchenTokens in our tutorial are ERC-20 tokens!
              </p>
            </div>
          </div>
        </div>

        {/* ERC-721 */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">🎨 ERC-721: Unique Trading Cards</h2>

          <div className="space-y-4 text-gray-300">
            <p>
              <strong>ERC-721 tokens are non-fungible (NFTs)</strong> — meaning each token is unique and special,
              just like trading cards or artwork!
            </p>

            {/* Trading Card Analogy */}
            <div className="bg-purple-900/20 rounded-xl p-6 my-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">🃏</div>
                <div className="font-bold text-lg">Think: Trading Cards</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="font-semibold mb-2">Trading Cards:</div>
                  <ul className="text-sm space-y-1">
                    <li>• Each card is unique</li>
                    <li>• Different stats and artwork</li>
                    <li>• Can't be divided into pieces</li>
                    <li>• Have different rarities and values</li>
                    <li>• You own the specific card</li>
                  </ul>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="font-semibold mb-2">ERC-721 NFTs:</div>
                  <ul className="text-sm space-y-1">
                    <li>• Each token is unique</li>
                    <li>• Different metadata and traits</li>
                    <li>• Can't be divided into pieces</li>
                    <li>• Have different rarities and values</li>
                    <li>• You own the specific token</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-100 rounded-xl p-4">
              <p className="text-sm text-gray-900">
                <strong>🦆 Examples:</strong> CryptoKitties (digital cats), Bored Apes (profile pictures),
                digital art, virtual real estate, and the Dish NFTs you create in our Kitchen tutorial!
              </p>
            </div>
          </div>
        </div>

        {/* ERC-1155 */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">🎒 ERC-1155: The Ultimate Backpack</h2>

          <div className="space-y-4 text-gray-300">
            <p>
              <strong>ERC-1155 tokens are multi-tokens</strong> — one contract can manage many different types
              of tokens, both fungible and non-fungible!
            </p>

            {/* Backpack Analogy */}
            <div className="bg-orange-50 rounded-xl p-6 my-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">🎒</div>
                <div className="font-bold text-lg">Think: Gaming Inventory</div>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="font-semibold mb-3">Your Game Backpack Contains:</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-sm">
                    <div className="bg-blue-100 rounded p-2">
                      <div className="text-xl">🪙</div>
                      <div className="font-medium">Gold Coins</div>
                      <div className="text-xs">(x 450)</div>
                    </div>
                    <div className="bg-green-100 rounded p-2">
                      <div className="text-xl">🍄</div>
                      <div className="font-medium">Health Potions</div>
                      <div className="text-xs">(x 12)</div>
                    </div>
                    <div className="bg-purple-100 rounded p-2">
                      <div className="text-xl">⚔️</div>
                      <div className="font-medium">Magic Sword</div>
                      <div className="text-xs">(x 1)</div>
                    </div>
                    <div className="bg-red-100 rounded p-2">
                      <div className="text-xl">🏆</div>
                      <div className="font-medium">Achievement</div>
                      <div className="text-xs">(x 1)</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-sm">
                    Some items are stackable (coins, potions), others are unique (sword, achievement)
                  </p>
                </div>
              </div>
            </div>

            <p>
              ERC-1155 is perfect for games, marketplaces, and any situation where you need multiple
              types of tokens in one place!
            </p>

            <div className="bg-yellow-100 rounded-xl p-4">
              <p className="text-sm text-gray-900">
                <strong>🦆 In our Kitchen:</strong> The Ingredients contract uses ERC-1155!
                It manages multiple ingredient types (tomato, cheese, meat) — you can own many of each type,
                but they're all stored efficiently in one contract.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">📊 Quick Comparison</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Standard</th>
                  <th className="text-left p-3 font-semibold">Like</th>
                  <th className="text-left p-3 font-semibold">Each Token</th>
                  <th className="text-left p-3 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b bg-green-900/20">
                  <td className="p-3 font-medium">ERC-20</td>
                  <td className="p-3">💵 Dollar bills</td>
                  <td className="p-3">Identical value</td>
                  <td className="p-3">Currencies, governance tokens</td>
                </tr>
                <tr className="border-b bg-purple-900/20">
                  <td className="p-3 font-medium">ERC-721</td>
                  <td className="p-3">🃏 Trading cards</td>
                  <td className="p-3">Unique & different</td>
                  <td className="p-3">Art, collectibles, real estate</td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="p-3 font-medium">ERC-1155</td>
                  <td className="p-3">🎒 Game inventory</td>
                  <td className="p-3">Mix of both</td>
                  <td className="p-3">Games, multi-asset platforms</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Why This Matters for On-Chain Kitchen */}
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">🍳 How On-Chain Kitchen Uses All Three!</h2>

          <div className="space-y-6">
            <p className="text-gray-300 font-medium">
              Our cooking tutorial demonstrates all three token standards working together:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">🪙</div>
                  <div className="font-bold text-green-600">ERC-20</div>
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <div><strong>KitchenTokens</strong></div>
                  <div>• Currency for buying ingredients</div>
                  <div>• Claim from faucet</div>
                  <div>• Spend in the shop</div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">🥕</div>
                  <div className="font-bold text-orange-600">ERC-1155</div>
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <div><strong>Ingredients</strong></div>
                  <div>• Multiple types in one contract</div>
                  <div>• Stack identical ingredients</div>
                  <div>• Burn to create dishes</div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">🍕</div>
                  <div className="font-bold text-purple-600">ERC-721</div>
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <div><strong>Dish NFTs</strong></div>
                  <div>• Unique recipes and artwork</div>
                  <div>• Generated based on ingredients</div>
                  <div>• Truly yours forever</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-4 mt-6">
              <p className="text-center text-gray-300">
                <strong>The Journey:</strong> Claim tokens (ERC-20) → Buy ingredients (ERC-1155) → Cook dishes (ERC-721)
              </p>
            </div>
          </div>
        </div>

        {/* Duck Summary */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start space-x-4">
            <DuckMascot size="medium" expression="excited" />
            <div className="flex-1">
              <div className="bg-green-100 rounded-xl p-4">
                <p className="text-gray-300">
                  <strong>🦆 You did it!</strong> You now understand the three main token standards:
                  ERC-20 (fungible like money), ERC-721 (unique like trading cards), and ERC-1155 (multi-token like game inventories).
                  These are the building blocks of the entire Web3 ecosystem!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl shadow-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Experience It All? 🎉</h3>
            <p className="text-gray-300 mb-6">
              Now that you understand the theory, let's see these token standards in action!
              Experience blockchain by using it in our interactive On-Chain Kitchen.
            </p>
            <Link
              href="/tutorials/on-chain-kitchen"
              className="inline-flex items-center bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-200 font-medium text-lg shadow-lg"
            >
              🍳 Start Cooking with On-Chain Kitchen →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}