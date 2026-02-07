import { createConfig, http } from 'wagmi'
import { sepolia, localhost } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

// Define Anvil local chain (same as localhost but with explicit config)
const anvil = {
  ...localhost,
  id: 31337,
  name: 'Anvil',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
    public: {
      http: ['http://127.0.0.1:8545'],
    },
  },
} as const

// Determine which network to use based on environment variable
const isAnvil = process.env.NEXT_PUBLIC_NETWORK === 'anvil'
const chains = isAnvil ? [anvil] : [sepolia]

// Configure transports based on network
const transports = isAnvil
  ? {
      [anvil.id]: http('http://127.0.0.1:8545'),
    }
  : {
      [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`),
    }

export const config = createConfig({
  chains,
  connectors: [
    injected(),
  ],
  transports,
})

// Contract addresses (to be filled after deployment)
export const KITCHEN_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_KITCHEN_TOKEN_ADDRESS as `0x${string}`
export const INGREDIENTS_ADDRESS = process.env.NEXT_PUBLIC_INGREDIENTS_ADDRESS as `0x${string}`
export const DISH_NFT_ADDRESS = process.env.NEXT_PUBLIC_DISH_NFT_ADDRESS as `0x${string}`