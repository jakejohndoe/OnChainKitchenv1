# 🦆 Trustless Academy

**Learn Web3 by doing, not memorizing.** Interactive blockchain tutorials for everyone, no coding required.

[![Live Site](https://img.shields.io/badge/Live%20Site-trustless.academy-brightgreen)](https://trustless.academy)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-000000?logo=nextdotjs)](https://nextjs.org/)
[![Powered by Foundry](https://img.shields.io/badge/Powered%20by-Foundry-red)](https://getfoundry.sh/)

---

## 🌟 What is Trustless Academy?

Trustless Academy is an interactive learning platform that teaches blockchain fundamentals through hands-on experiences. Our flagship tutorial, **On-Chain Kitchen**, lets anyone explore the three main token standards (ERC-20, ERC-721, ERC-1155) by cooking digital dishes on the blockchain.

**🎯 Target Audience:** Curious non-technical people who want to understand blockchain without the jargon
**🎮 Learning Style:** Interactive experiences, not coding bootcamps
**🦆 Guided by:** A friendly duck mascot who explains everything in simple terms

### Why It's Different

- **No coding required** — just click, explore, and learn
- **Real blockchain transactions** — experience Web3 firsthand on Sepolia testnet
- **Safe environment** — learn with free testnet tokens, no financial risk
- **Warm & accessible** — complex concepts explained simply with visual metaphors

---

## 🍳 What On-Chain Kitchen Teaches

On-Chain Kitchen is our interactive cooking tutorial that teaches the three fundamental token standards powering Web3:

### **🪙 ERC-20 Tokens (Fungible Currency)**
- Claim KitchenTokens from a faucet
- Understand fungible tokens (like digital dollars)
- Experience approve/spend workflows
- Learn about faucet mechanics and cooldowns

### **🥕 ERC-1155 Multi-Tokens (Game Inventory)**
- Buy multiple ingredient types in batch transactions
- Manage multi-token inventories efficiently
- Understand how one contract manages many token types
- Experience gas-optimized batch operations

### **🍕 ERC-721 NFTs (Unique Collectibles)**
- Burn ingredients to mint unique dish NFTs
- Create art with deterministic on-chain SVG generation
- Understand true digital ownership
- Explore decentralized metadata storage

### **The Complete Journey**
1. **Connect Wallet** → Set up MetaMask for Sepolia testnet
2. **Claim Tokens** → Get your first Web3 assets from the faucet
3. **Shop for Ingredients** → Buy items with your tokens
4. **Check Your Pantry** → View your multi-token inventory
5. **Cook Dishes** → Burn ingredients to create unique NFTs
6. **Browse Your Cookbook** → Admire your collection of owned digital assets
7. **Celebrate Success** → Reflect on everything you've learned!

---

## 🏗️ Technical Architecture

### **Full Tech Stack**

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Smart Contracts:** Foundry + Solidity + OpenZeppelin v5
- **Web3 Integration:** wagmi + viem for Ethereum interactions
- **Deployment:** Vercel (frontend) + Sepolia Testnet (contracts)
- **Database:** Supabase (waitlist email collection)

### **Smart Contracts**

Three interconnected contracts deployed on Sepolia:

- **`KitchenToken.sol`** (ERC-20) - Fungible currency with 24-hour faucet
- **`Ingredients.sol`** (ERC-1155) - Multi-token ingredients with batch buying
- **`DishNFT.sol`** (ERC-721) - Unique dishes with on-chain SVG art

### **Key Features**

- **Testnet-only design** - Safe learning environment
- **Real blockchain interactions** - Genuine Web3 experience
- **On-chain metadata** - SVG artwork generated deterministically
- **Gas-optimized contracts** - Efficient batch operations
- **Educational tooltips** - Context-aware learning prompts

---

## 🚀 Getting Started Locally

### **Prerequisites**

- [Node.js](https://nodejs.org/) v18+
- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- [Git](https://git-scm.com/)
- MetaMask wallet

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/trustless-academy.git
cd trustless-academy
```

### **2. Set Up Smart Contracts**

```bash
cd contracts

# Install dependencies
forge install

# Copy environment template
cp .env.example .env

# Edit .env with your values:
# - RPC_URL (Sepolia RPC from Alchemy/Infura)
# - PRIVATE_KEY (deployer wallet private key)
# - ETHERSCAN_API_KEY (for contract verification)

# Compile contracts
forge build

# Run tests
forge test

# Deploy to Sepolia (optional - contracts already deployed)
forge script script/Deploy.s.sol --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast
```

### **3. Set Up Frontend**

```bash
cd ../frontend

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local

# Edit .env.local with:
# - NEXT_PUBLIC_ALCHEMY_API_KEY (your Alchemy API key)
# - Contract addresses (already configured for live deployment)

# Start development server
npm run dev
```

### **4. Visit the Application**

Open [http://localhost:3000](http://localhost:3000) and start learning!

---

## 📁 Project Structure

```
trustless-academy/
├── 📂 contracts/                 # Foundry smart contracts
│   ├── 📂 src/                  # Solidity source files
│   │   ├── KitchenToken.sol     # ERC-20 faucet token
│   │   ├── Ingredients.sol      # ERC-1155 multi-token ingredients
│   │   └── DishNFT.sol         # ERC-721 unique dish NFTs
│   ├── 📂 test/                 # Comprehensive contract tests
│   ├── 📂 script/               # Deployment scripts
│   ├── foundry.toml             # Foundry configuration
│   └── Makefile                 # Build automation
├── 📂 frontend/                  # Next.js application
│   ├── 📂 app/                  # App Router pages
│   │   ├── page.tsx             # Homepage
│   │   ├── 📂 tutorials/        # Tutorial pages
│   │   └── waitlist/            # Email collection
│   ├── 📂 components/           # React components
│   │   ├── DuckMascot.tsx       # Friendly guide
│   │   ├── FaucetClaim.tsx      # ERC-20 faucet interface
│   │   ├── ShopInterface.tsx    # ERC-1155 shopping
│   │   ├── OvenInterface.tsx    # NFT minting
│   │   └── CookbookGallery.tsx  # NFT collection viewer
│   ├── 📂 lib/                  # Utilities and configuration
│   └── package.json             # Dependencies
├── 📂 docs/                     # Project documentation
│   ├── GAME_DESIGN.md          # Tutorial mechanics
│   ├── UI_STYLE.md             # Design guidelines
│   ├── STATE.md                # Development progress
│   └── LOCAL_TESTING.md        # Testing instructions
├── README.md                    # This file
└── LICENSE                     # MIT license
```

---

## 🌐 Educational Content

Beyond On-Chain Kitchen, Trustless Academy offers foundational tutorials:

### **📖 Learning Path**

1. **[What is Blockchain?](https://trustless.academy/tutorials/what-is-blockchain)**
   - Understand blocks, chains, and decentralization
   - Learn about consensus mechanisms
   - No jargon, just simple explanations

2. **[What is Ethereum?](https://trustless.academy/tutorials/what-is-ethereum)**
   - Smart contracts and the EVM
   - Gas fees and accounts
   - Why Ethereum enables programmable money

3. **[Token Standards Explained](https://trustless.academy/tutorials/token-standards)**
   - ERC-20, ERC-721, and ERC-1155 demystified
   - Real-world analogies (dollars, trading cards, game inventory)
   - Perfect setup for the hands-on experience

4. **[On-Chain Kitchen](https://trustless.academy/tutorials/on-chain-kitchen)**
   - Interactive tutorial using real contracts
   - Experience all three token standards
   - Build a collection of unique digital assets

---

## 🤝 Contributing

We welcome contributions! Here's how to get involved:

### **Ways to Contribute**

- **🐛 Bug Reports:** Found an issue? [Open an issue](https://github.com/your-username/trustless-academy/issues)
- **💡 Feature Requests:** Have an idea? Let's discuss it!
- **📝 Content:** Improve tutorials or add educational content
- **🎨 Design:** Enhance the user experience
- **💻 Code:** Fix bugs or add features

### **Development Guidelines**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly (both contracts and frontend)
5. Commit with clear messages: `git commit -m "Add amazing feature"`
6. Push to your branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### **Code Standards**

- **Smart Contracts:** Follow Solidity best practices, include comprehensive tests
- **Frontend:** Use TypeScript, follow existing patterns, maintain accessibility
- **Documentation:** Update docs for any new features
- **Testing:** Ensure all tests pass before submitting

---

## 🔧 Advanced Usage

### **Custom Deployment**

To deploy your own instance:

1. **Deploy contracts** to your preferred testnet
2. **Update contract addresses** in `frontend/.env.local`
3. **Configure Supabase** for waitlist functionality
4. **Deploy frontend** to Vercel or your hosting provider

### **Testing**

```bash
# Test smart contracts
cd contracts
forge test

# Test frontend
cd frontend
npm run build  # Ensure build passes
npm run test   # Run any frontend tests
```

### **Environment Variables**

**Contracts (`.env`):**
```bash
RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your-key
PRIVATE_KEY=your-deployer-private-key
ETHERSCAN_API_KEY=your-etherscan-api-key
```

**Frontend (`.env.local`):**
```bash
NEXT_PUBLIC_ALCHEMY_API_KEY=your-alchemy-api-key
NEXT_PUBLIC_KITCHEN_TOKEN_ADDRESS=deployed-contract-address
NEXT_PUBLIC_INGREDIENTS_ADDRESS=deployed-contract-address
NEXT_PUBLIC_DISH_NFT_ADDRESS=deployed-contract-address
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

---

## 📊 Analytics & Metrics

Track learning engagement:

- **Tutorial completion rates**
- **Transaction success rates**
- **User feedback** via waitlist
- **Educational effectiveness** metrics

---

## 🛡️ Security & Safety

- **Testnet only** - No real money at risk
- **Open source** - Fully auditable code
- **Best practices** - Following OpenZeppelin standards
- **Educational focus** - Designed for learning, not production use

---

## 🗺️ Roadmap

### **Coming Soon**
- 🎯 More interactive tutorials
- 🌐 Multi-language support
- 📱 Mobile-optimized experience
- 🎮 Gamification elements
- 🏆 Achievement system

### **Vision**
- 🏫 Comprehensive Web3 curriculum
- 🤝 Community-driven content
- 🔗 Integration with live protocols
- 🌍 Global accessibility

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **OpenZeppelin** for secure smart contract libraries
- **Foundry** for excellent Solidity tooling
- **Next.js & Vercel** for seamless full-stack development
- **wagmi & viem** for Web3 integration
- **The Ethereum community** for building an amazing ecosystem

---

## 📬 Connect With Us

- **🌐 Website:** [trustless.academy](https://trustless.academy)
- **💌 Waitlist:** [Join here](https://trustless.academy/waitlist)
- **🐛 Issues:** [GitHub Issues](https://github.com/your-username/trustless-academy/issues)
- **💬 Discussions:** [GitHub Discussions](https://github.com/your-username/trustless-academy/discussions)

---

<div align="center">

**Made with 🦆 and ❤️ for the Web3 community**

*Learn Web3 by doing, not memorizing.*

[![⭐ Star us on GitHub](https://img.shields.io/badge/⭐-Star%20us%20on%20GitHub-yellow?style=for-the-badge)](https://github.com/your-username/trustless-academy)

</div>