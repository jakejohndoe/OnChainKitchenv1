# ChainSchool: On-Chain Kitchen - Game Design

## Overview

On-Chain Kitchen is ChainSchool's first interactive Web3 tutorial. Users learn about different token standards (ERC-20, ERC-1155, ERC-721) through a cozy cooking experience on Sepolia testnet.

## Tutorial Flow

### 1. Welcome Screen
**Learning Goal:** Wallet connection and testnet setup
- Introduce ChainSchool concept
- Connect MetaMask wallet
- Ensure user is on Sepolia testnet
- Meet the duck mascot

### 2. Faucet (Sink) Screen
**Learning Goal:** Understanding ERC-20 tokens
- Claim free KitchenTokens from faucet
- Explain fungible tokens in simple terms
- Show balance updates
- 24-hour cooldown per address

### 3. Shop Screen
**Learning Goal:** Token spending and batch transactions
- Buy ingredients using KitchenTokens
- Demonstrate batch purchasing for gas efficiency
- Preview: introduce concept of burning tokens

### 4. Pantry Screen
**Learning Goal:** ERC-1155 multi-token balances
- View ingredient inventory
- Explain how one contract can hold multiple token types
- Empty state for new users with helpful guidance

### 5. Oven Screen
**Learning Goal:** Burning tokens and minting NFTs
- Select ingredients to cook with
- Burn ingredients + mint Dish NFT in single transaction
- Explain permanent token removal (burning)
- Introduce NFT minting

### 6. Cookbook Screen
**Learning Goal:** NFT ownership and metadata
- View owned Dish NFTs
- Show recipe breakdown (which ingredients were used)
- Demonstrate unique ownership via blockchain

## Contract Interactions

### Token Economics
- **KitchenToken (ERC-20):** Free from faucet, used as currency
- **Ingredients (ERC-1155):** Cost 10 KitchenTokens each
- **Dish NFTs (ERC-721):** Free to mint (just pay gas), requires burning ingredients

### Smart Contract Flow
```
1. User claims 100 KitchenTokens from faucet
2. User spends 30 KitchenTokens to buy 3 ingredients
3. User burns those 3 ingredients to mint 1 Dish NFT
4. User owns unique NFT with recipe data stored on-chain
```

## NFT Image + Metadata Strategy

### Approach: Deterministic SVG Generation

**Rationale:**
- **Educational clarity:** Students can see exactly how ingredients map to visual output
- **On-chain storage:** No IPFS complexity for beginners
- **Deterministic:** Same ingredients always produce same dish visual
- **Extensible:** Easy to add new ingredients and combinations

### Implementation Details

#### Visual System
- Each ingredient has a distinct visual component (color, shape, or pattern)
- Dishes are composed by layering ingredient visuals
- Simple geometric shapes in cozy, hand-drawn style
- Soft color palette matching overall design direction

#### Ingredient Visual Mapping
```
EGG (ID: 1)    → Yellow circle with small white highlight
CHEESE (ID: 2) → Orange triangle with texture lines
BACON (ID: 3)  → Pink wavy rectangle with brown streaks
```

#### Dish Composition Rules
1. **Base Layer:** Plate (consistent across all dishes)
2. **Ingredient Layers:** Stacked based on ingredient IDs (lowest ID first)
3. **Quantity Representation:** Larger/more prominent shapes for higher quantities
4. **Color Blending:** Subtle color mixing when multiple ingredients present

#### SVG Template Structure
```svg
<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
  <!-- Base plate -->
  <circle cx="150" cy="150" r="120" fill="#f8f9fa" stroke="#dee2e6" stroke-width="4"/>

  <!-- Dynamic ingredient layers inserted here -->
  <!-- Each ingredient contributes shapes/colors based on quantity -->

  <!-- Optional garnish/decoration based on ingredient count -->
</svg>
```

#### Metadata Structure
```json
{
  "name": "Dish #123",
  "description": "A delicious dish made with [ingredient list] in the On-Chain Kitchen tutorial.",
  "image": "data:image/svg+xml;base64,[base64-encoded-svg]",
  "attributes": [
    {"trait_type": "Recipe", "value": "Egg, Cheese, Bacon"},
    {"trait_type": "Ingredient Count", "value": 3},
    {"trait_type": "Total Quantity", "value": 5},
    {"trait_type": "Cook Time", "value": "2024-01-15T10:30:00Z"}
  ]
}
```

### Smart Contract Implementation

#### DishNFT.sol Changes
```solidity
function tokenURI(uint256 tokenId) public view override returns (string memory) {
    Recipe memory recipe = recipes[tokenId];

    // Generate SVG based on recipe
    string memory svg = generateDishSVG(recipe.ingredientIds, recipe.amounts);
    string memory imageURI = string(abi.encodePacked(
        "data:image/svg+xml;base64,",
        Base64.encode(bytes(svg))
    ));

    // Generate metadata JSON
    string memory json = generateMetadata(tokenId, recipe, imageURI);
    return string(abi.encodePacked(
        "data:application/json;base64,",
        Base64.encode(bytes(json))
    ));
}

function generateDishSVG(uint256[] memory ingredientIds, uint256[] memory amounts)
    internal pure returns (string memory) {
    // SVG generation logic based on ingredients
}
```

### Benefits of This Approach

1. **Educational Value:** Students see direct connection between data and visual output
2. **No External Dependencies:** Everything on-chain, no IPFS or centralized servers
3. **Deterministic:** Perfect for teaching blockchain immutability concepts
4. **Gas Efficient:** SVG generation happens in view functions (no gas cost)
5. **Extensible:** New ingredients just need new visual components added

### Tradeoffs

**Pros:**
- Complete on-chain storage
- Educational transparency
- No external service dependencies
- Deterministic outcomes

**Cons:**
- Limited visual complexity compared to pre-made artwork
- Larger contract bytecode due to SVG generation
- Less "artistic" than handcrafted NFT collections

### Future Extensions

1. **Seasonal Ingredients:** Time-based availability
2. **Special Combinations:** Unique visuals for specific ingredient pairs
3. **Rarity System:** Some ingredient combinations create special effects
4. **Kitchen Tools:** Additional NFT types that modify cooking outcomes

This approach prioritizes educational clarity and technical understanding over visual sophistication, perfectly aligned with ChainSchool's learning-first philosophy.