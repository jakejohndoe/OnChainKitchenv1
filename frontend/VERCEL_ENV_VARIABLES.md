# Vercel Environment Variables

## Required Environment Variables for Production

Add these environment variables in the Vercel dashboard for production deployment:

### Network Configuration
- **`NEXT_PUBLIC_NETWORK`** = `sepolia`
  - Sets the blockchain network to Sepolia testnet
  - Required: Yes

### Contract Addresses (Sepolia Deployment)
- **`NEXT_PUBLIC_KITCHEN_TOKEN_ADDRESS`** = `0xdc8832f7bc16bE8a97E6c7cB66f912B6922246B5`
  - KitchenToken ERC-20 contract address
  - Required: Yes

- **`NEXT_PUBLIC_INGREDIENTS_ADDRESS`** = `0x7A1efaf375798B6B0df2BE94CF8A13F68c9E74eE`
  - Ingredients ERC-1155 contract address
  - Required: Yes

- **`NEXT_PUBLIC_DISH_NFT_ADDRESS`** = `0xf5dC296F38B10cF65E2702a69E1d56d55d520e91`
  - DishNFT ERC-721 contract address
  - Required: Yes

### RPC Provider
- **`NEXT_PUBLIC_ALCHEMY_ID`** = `[YOUR_ALCHEMY_API_KEY]`
  - Alchemy API key for Sepolia RPC access
  - Required: Yes
  - Get your key at: https://www.alchemy.com/
  - Make sure it's enabled for Sepolia network

### Supabase Configuration (for Waitlist)
- **`NEXT_PUBLIC_SUPABASE_URL`** = `[YOUR_SUPABASE_PROJECT_URL]`
  - Your Supabase project URL
  - Required: Yes (for waitlist functionality)
  - Get from your Supabase project settings

- **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** = `[YOUR_SUPABASE_ANON_KEY]`
  - Your Supabase anonymous/public key
  - Required: Yes (for waitlist functionality)
  - Get from your Supabase project settings → API

## How to Add in Vercel Dashboard

1. Go to your project in Vercel
2. Navigate to Settings → Environment Variables
3. Add each variable with the exact names and values above
4. Make sure they're enabled for Production environment
5. Redeploy after adding all variables

## Notes

- All environment variables starting with `NEXT_PUBLIC_` are exposed to the browser
- The contract addresses are for the Trustless Academy branded deployment on Sepolia
- These contracts were deployed with the Trustless Academy branding and metadata
- The Alchemy API key should be kept private (though it's client-exposed, rate limiting should be configured in Alchemy dashboard)