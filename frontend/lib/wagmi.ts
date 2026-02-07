import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
  ],
  transports: {
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`),
  },
})

// Contract addresses (to be filled after deployment)
export const KITCHEN_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_KITCHEN_TOKEN_ADDRESS as `0x${string}`
export const INGREDIENTS_ADDRESS = process.env.NEXT_PUBLIC_INGREDIENTS_ADDRESS as `0x${string}`
export const DISH_NFT_ADDRESS = process.env.NEXT_PUBLIC_DISH_NFT_ADDRESS as `0x${string}`