# Local End-to-End Testing Guide

This guide walks through setting up and testing the full Trustless Academy application locally using Anvil.

## Prerequisites

- Foundry installed with `anvil` and `forge` commands available
- Node.js 18+ and npm installed
- MetaMask browser extension
- Basic understanding of blockchain wallets

## Setup Instructions

### 1. Set Up Local Blockchain

```bash
# In contracts directory
cd contracts

# Copy environment file
cp .env.example .env

# Start Anvil local blockchain
make start-anvil
```

This starts a local blockchain at `http://localhost:8545` with:
- Chain ID: 31337
- 10 pre-funded accounts
- Default private key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

### 2. Deploy Contracts

In a new terminal:

```bash
# In contracts directory
cd contracts

# Deploy all contracts and export addresses
make setup-local
```

This will:
- Compile all contracts
- Deploy KitchenToken, Ingredients, and DishNFT contracts
- Configure contract relationships
- Export contract addresses to `../frontend/.env.local`

### 3. Start Frontend

```bash
# In frontend directory
cd ../frontend

# Install dependencies if not already done
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`.

### 4. Configure MetaMask

1. Open MetaMask
2. Click the network dropdown (usually shows "Ethereum Mainnet")
3. Click "Add Network" or "Custom RPC"
4. Enter the following details:
   - **Network Name**: Anvil Local
   - **New RPC URL**: http://localhost:8545
   - **Chain ID**: 31337
   - **Currency Symbol**: ETH
   - **Block Explorer URL**: (leave empty)
5. Save the network
6. Switch to the "Anvil Local" network

### 5. Import Test Account

1. In MetaMask, click the account avatar
2. Select "Import Account"
3. Choose "Private Key"
4. Paste the default Anvil private key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
5. Click "Import"

The account should now show ~10,000 ETH balance.

## Testing the Full User Flow

### Test 1: Connect Wallet

1. Go to `http://localhost:3000`
2. Click "Connect Wallet"
3. Select MetaMask
4. Approve the connection
5. Verify the wallet address appears in the UI

**Expected Result**: Wallet connects successfully, showing connected address.

### Test 2: Claim Faucet

1. Navigate to the Faucet page (`/faucet`)
2. Click "Claim Free Tokens"
3. Confirm the transaction in MetaMask
4. Wait for confirmation

**Expected Result**:
- Transaction succeeds
- Balance shows 100 KITCHEN tokens
- Success message appears
- Faucet button disabled with cooldown timer

### Test 3: Buy Ingredients

1. Navigate to the Shop page (`/shop`)
2. Select quantities for different ingredients (e.g., 2 eggs, 1 cheese, 1 bacon)
3. Click "1. Approve Tokens"
4. Confirm the approval transaction in MetaMask
5. Click "2. Buy Ingredients"
6. Confirm the purchase transaction in MetaMask

**Expected Result**:
- Approval transaction succeeds
- Purchase transaction succeeds
- KITCHEN token balance decreases (40 tokens spent in example above)
- Success message appears

### Test 4: View Pantry

1. Navigate to the Pantry page (`/pantry`)
2. Verify ingredient balances are displayed correctly

**Expected Result**:
- Shows correct ingredient counts (2 eggs, 1 cheese, 1 bacon from example)
- Total items count is accurate (4 total)
- Each ingredient shows "In Stock" status

## Common Issues and Solutions

### Issue: "Contract address not configured"

**Solution**: Ensure you've run `make setup-local` and the contracts are deployed. Check that `.env.local` exists in the frontend directory with contract addresses.

### Issue: MetaMask transactions fail

**Solutions**:
1. Ensure you're connected to the Anvil network (Chain ID 31337)
2. Reset MetaMask account data: Settings > Advanced > Reset Account
3. Restart Anvil and redeploy contracts

### Issue: Frontend shows incorrect network

**Solution**: Check that `NEXT_PUBLIC_NETWORK=anvil` is in `frontend/.env.local`.

### Issue: No funds in wallet

**Solution**: Ensure you've imported the correct private key and are connected to Anvil network.

## Development Commands

```bash
# In contracts directory
make help                 # Show all available commands
make status              # Check build, test, and deployment status
make test               # Run contract tests
make build              # Compile contracts
make clean              # Clean build artifacts

# Reset local environment
make clean
make setup-local
```

## Testing Checklist

- [ ] Anvil blockchain started
- [ ] Contracts deployed and configured
- [ ] Frontend connects to correct network
- [ ] Wallet connection works
- [ ] Faucet claim succeeds and updates balance
- [ ] Token approval works
- [ ] Ingredient purchase succeeds and updates balances
- [ ] Pantry displays correct inventory
- [ ] All transactions appear in MetaMask
- [ ] Error states handled gracefully
- [ ] Educational content displays correctly

## Next Steps

After successful local testing:
1. Deploy to Sepolia testnet using `make deploy-sepolia`
2. Test on live testnet
3. Build Oven and Cookbook screens
4. Implement end-to-end cooking flow