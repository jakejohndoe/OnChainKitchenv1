# Trustless Academy: On-Chain Kitchen

An interactive Web3 learning platform where beginners learn about different token standards (ERC-20, ERC-1155, ERC-721) through a cozy cooking experience.

## Project Structure

```
trustless-academy/
├── contracts/          # Foundry smart contracts
│   ├── src/           # Solidity contracts
│   ├── test/          # Contract tests
│   └── script/        # Deployment scripts
├── frontend/          # Next.js application
└── docs/              # Documentation
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- MetaMask wallet configured for Sepolia testnet

### Smart Contracts

1. Navigate to contracts directory:
```bash
cd contracts
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Fill in your `.env` file with:
   - Sepolia RPC URL (Alchemy recommended)
   - Private key for deployment
   - Etherscan API key for verification

4. Install dependencies and compile:
```bash
forge install
forge build
```

5. Run tests:
```bash
forge test
```

6. Deploy to Sepolia:
```bash
forge script script/Deploy.s.sol --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast
```

### Frontend

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Copy environment variables:
```bash
cp .env.local.example .env.local
```

3. Fill in your `.env.local` file with:
   - Alchemy API key
   - Deployed contract addresses

4. Install dependencies:
```bash
npm install
```

5. Start development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to start learning!

## What You'll Learn

- **ERC-20 Tokens**: Claim KitchenTokens from a faucet
- **ERC-1155 Multi-Tokens**: Buy and manage ingredient inventory
- **ERC-721 NFTs**: Mint unique Dish NFTs by cooking ingredients
- **Token Burning**: Permanently remove tokens from circulation
- **Batch Transactions**: Efficient blockchain operations

## Tutorial Flow

1. **Welcome** → Connect MetaMask to Sepolia
2. **Faucet** → Claim free KitchenTokens
3. **Shop** → Buy ingredients with tokens
4. **Pantry** → View your ingredient collection
5. **Oven** → Cook ingredients to mint Dish NFTs
6. **Cookbook** → Admire your culinary creations

## Documentation

- [Game Design](docs/GAME_DESIGN.md) - Tutorial flow and mechanics
- [UI Style Guide](docs/UI_STYLE.md) - Visual design principles
- [Build Status](docs/STATE.md) - Current development progress

## License

MIT License - built for educational purposes as part of ChainSchool.