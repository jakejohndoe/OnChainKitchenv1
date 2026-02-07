# Anvil Setup Verification

## ✅ Completed Setup

### 1. Fixed foundry.toml
Added file system permissions to allow the deployment script to write files:
```toml
fs_permissions = [
    { access = "read-write", path = "./" },
    { access = "read-write", path = "../" }
]
```

### 2. Created frontend/.env.local
The file now contains:
- `NEXT_PUBLIC_NETWORK=anvil` - Configures wagmi to use Anvil chain
- Contract addresses for all three contracts:
  - KitchenToken: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
  - Ingredients: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`
  - DishNFT: `0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0`

These are the standard sequential addresses that Anvil assigns when deploying contracts to a fresh instance.

### 3. Verified Frontend Configuration
- ✅ `lib/wagmi.ts` correctly reads `NEXT_PUBLIC_NETWORK` environment variable
- ✅ Anvil chain configuration is properly set up with Chain ID 31337
- ✅ Contract addresses are exported from environment variables
- ✅ Components import addresses from the wagmi configuration

## How to Test

### 1. Start Anvil (if not already running)
```bash
cd contracts
make start-anvil
```

### 2. Deploy Contracts (if not already deployed)
```bash
cd contracts
make deploy-local
```

Note: With the fixed `foundry.toml`, the export step should now work automatically.

### 3. Start Frontend
```bash
cd frontend
npm run dev
```

### 4. Test in Browser
1. Navigate to http://localhost:3000
2. Open browser console and check for any contract address errors
3. Connect MetaMask to Anvil network (localhost:8545, Chain ID 31337)
4. Import test account: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
5. Try the faucet claim function

## Troubleshooting

### If addresses are wrong:
After deploying, check the console output for the actual deployed addresses and update `.env.local` accordingly.

### If frontend can't connect:
1. Ensure Anvil is running on port 8545
2. Check that MetaMask is connected to the correct network
3. Restart the Next.js dev server after changing `.env.local`

### To verify addresses are loaded:
In the browser console, you can check:
```javascript
// Check if running on Anvil
console.log(process.env.NEXT_PUBLIC_NETWORK)
// Should output: "anvil"

// Check contract addresses
console.log(process.env.NEXT_PUBLIC_KITCHEN_TOKEN_ADDRESS)
console.log(process.env.NEXT_PUBLIC_INGREDIENTS_ADDRESS)
console.log(process.env.NEXT_PUBLIC_DISH_NFT_ADDRESS)
```

## Next Deployment

When you deploy again, the export should work automatically:
```bash
cd contracts
make setup-local  # This will now successfully write to ../frontend/.env.local
```

The `fs_permissions` fix ensures future deployments can automatically export addresses.