'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { sepolia } from 'wagmi/chains'

export default function ConnectWallet() {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors, isPending, error } = useConnect()
  const { disconnect } = useDisconnect()

  // Check if connected to correct network
  const isCorrectNetwork = chain?.id === sepolia.id

  if (isConnected && isCorrectNetwork) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Connected to Sepolia</p>
            <p className="font-mono text-sm text-gray-800 break-all">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </div>
          <button
            onClick={() => disconnect()}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
          >
            Disconnect
          </button>
        </div>
      </div>
    )
  }

  if (isConnected && !isCorrectNetwork) {
    return (
      <div className="bg-amber-100 p-6 rounded-xl border-2 border-amber-300">
        <div className="text-center">
          <p className="text-amber-800 font-medium mb-2">Wrong Network</p>
          <p className="text-amber-700 text-sm mb-4">
            Please switch to Sepolia testnet in your wallet
          </p>
          <button
            onClick={() => disconnect()}
            className="px-4 py-2 text-sm bg-amber-200 text-amber-800 rounded-lg hover:bg-amber-300 transition-colors"
          >
            Disconnect & Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Connect Your Wallet
        </h3>
        <p className="text-gray-600 text-sm mb-6">
          Connect to Sepolia testnet to start your Web3 cooking adventure
        </p>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mb-4">
            {error.message}
          </div>
        )}

        <div className="space-y-3">
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              disabled={isPending}
              className="w-full px-6 py-3 bg-blue-100 text-blue-800 font-medium rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Connecting...' : `Connect ${connector.name}`}
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Make sure you're on Sepolia testnet before connecting
        </p>
      </div>
    </div>
  )
}