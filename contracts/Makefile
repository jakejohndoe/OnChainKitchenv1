# Trustless Academy: On-Chain Kitchen - Contract Development Makefile

# Default values
CHAIN_ID ?= 31337
RPC_URL ?= http://localhost:8545
PRIVATE_KEY ?= 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

# Help target
.PHONY: help
help:
	@echo "Trustless Academy: On-Chain Kitchen - Development Commands"
	@echo ""
	@echo "Local Development:"
	@echo "  start-anvil     Start Anvil local blockchain"
	@echo "  deploy-local    Deploy contracts to Anvil"
	@echo "  export-local    Export contract addresses for frontend"
	@echo "  setup-local     Complete local setup (anvil + deploy + export)"
	@echo ""
	@echo "Testing:"
	@echo "  test           Run all contract tests"
	@echo "  test-verbose   Run tests with verbose output"
	@echo ""
	@echo "Sepolia Deployment:"
	@echo "  deploy-sepolia Deploy contracts to Sepolia testnet"
	@echo "  export-sepolia Export Sepolia addresses for frontend"
	@echo ""
	@echo "Utilities:"
	@echo "  build          Compile contracts"
	@echo "  clean          Clean build artifacts"
	@echo "  format         Format Solidity code"

# Build targets
.PHONY: build
build:
	forge build

.PHONY: clean
clean:
	forge clean

.PHONY: format
format:
	forge fmt

# Testing targets
.PHONY: test
test:
	forge test

.PHONY: test-verbose
test-verbose:
	forge test -vvv

# Local development with Anvil
.PHONY: start-anvil
start-anvil:
	@echo "Starting Anvil local blockchain..."
	@echo "Chain ID: 31337"
	@echo "RPC URL: http://localhost:8545"
	@echo "Default Private Key: $(PRIVATE_KEY)"
	@echo ""
	anvil --chain-id 31337 --host 0.0.0.0

.PHONY: deploy-local
deploy-local:
	@echo "Deploying contracts to Anvil..."
	PRIVATE_KEY=$(PRIVATE_KEY) forge script script/Deploy.s.sol:Deploy --rpc-url $(RPC_URL) --broadcast

.PHONY: export-local
export-local:
	@echo "Exporting contract addresses for local development..."
	@if [ -f deployments/31337.txt ]; then \
		echo "Creating frontend environment file..."; \
		cp deployments/31337.txt ../frontend/.env.local; \
		echo "NEXT_PUBLIC_NETWORK=anvil" >> ../frontend/.env.local; \
		echo "Contract addresses exported to ../frontend/.env.local"; \
		cat ../frontend/.env.local; \
	else \
		echo "Error: No deployment found for chain ID 31337"; \
		echo "Please run 'make deploy-local' first"; \
		exit 1; \
	fi

.PHONY: setup-local
setup-local: build deploy-local export-local
	@echo ""
	@echo "✅ Local development setup complete!"
	@echo ""
	@echo "Next steps:"
	@echo "1. Keep Anvil running in one terminal: make start-anvil"
	@echo "2. In another terminal, run the frontend: cd ../frontend && npm run dev"
	@echo "3. Connect MetaMask to http://localhost:8545 with chain ID 31337"
	@echo "4. Import the default Anvil account with private key: $(PRIVATE_KEY)"

# Sepolia deployment
.PHONY: deploy-sepolia
deploy-sepolia:
	@if [ -z "$(SEPOLIA_RPC_URL)" ]; then \
		echo "Error: SEPOLIA_RPC_URL environment variable is required"; \
		exit 1; \
	fi
	@if [ -z "$(SEPOLIA_PRIVATE_KEY)" ]; then \
		echo "Error: SEPOLIA_PRIVATE_KEY environment variable is required"; \
		exit 1; \
	fi
	@echo "Deploying contracts to Sepolia testnet..."
	PRIVATE_KEY=$(SEPOLIA_PRIVATE_KEY) forge script script/Deploy.s.sol:Deploy --rpc-url $(SEPOLIA_RPC_URL) --broadcast --verify

.PHONY: export-sepolia
export-sepolia:
	@echo "Exporting contract addresses for Sepolia..."
	@if [ -f deployments/11155111.txt ]; then \
		echo "Creating frontend environment file..."; \
		cp deployments/11155111.txt ../frontend/.env.local; \
		echo "NEXT_PUBLIC_NETWORK=sepolia" >> ../frontend/.env.local; \
		echo "Contract addresses exported to ../frontend/.env.local"; \
		cat ../frontend/.env.local; \
	else \
		echo "Error: No deployment found for Sepolia (chain ID 11155111)"; \
		echo "Please run 'make deploy-sepolia' first"; \
		exit 1; \
	fi

# Quick commands for common workflows
.PHONY: local
local: setup-local

.PHONY: sepolia
sepolia: deploy-sepolia export-sepolia

# Status check
.PHONY: status
status:
	@echo "Build Status:"
	@forge build --sizes 2>/dev/null && echo "✅ Contracts compile successfully" || echo "❌ Compilation failed"
	@echo ""
	@echo "Test Status:"
	@forge test --no-match-test "testFork" 2>/dev/null && echo "✅ All tests passing" || echo "❌ Tests failing"
	@echo ""
	@echo "Deployment Status:"
	@if [ -f deployments/31337.txt ]; then \
		echo "✅ Anvil deployment found:"; \
		cat deployments/31337.txt; \
	else \
		echo "❌ No Anvil deployment found"; \
	fi
	@echo ""
	@if [ -f deployments/11155111.txt ]; then \
		echo "✅ Sepolia deployment found:"; \
		cat deployments/11155111.txt; \
	else \
		echo "❌ No Sepolia deployment found"; \
	fi