// Contract ABIs and configuration
import kitchenTokenAbi from '../../contracts/out/KitchenToken.sol/KitchenToken.json'
import ingredientsAbi from '../../contracts/out/Ingredients.sol/Ingredients.json'
import dishNFTAbi from '../../contracts/out/DishNFT.sol/DishNFT.json'

// Extract just the ABI from the JSON files
export const KITCHEN_TOKEN_ABI = kitchenTokenAbi.abi
export const INGREDIENTS_ABI = ingredientsAbi.abi
export const DISH_NFT_ABI = dishNFTAbi.abi

// Contract addresses from environment
export const KITCHEN_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_KITCHEN_TOKEN_ADDRESS as `0x${string}`
export const INGREDIENTS_ADDRESS = process.env.NEXT_PUBLIC_INGREDIENTS_ADDRESS as `0x${string}`
export const DISH_NFT_ADDRESS = process.env.NEXT_PUBLIC_DISH_NFT_ADDRESS as `0x${string}`

// Verify addresses are available
if (!KITCHEN_TOKEN_ADDRESS || !INGREDIENTS_ADDRESS || !DISH_NFT_ADDRESS) {
  throw new Error('Contract addresses not configured. Please check your .env.local file.')
}