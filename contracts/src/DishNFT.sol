// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface IIngredients {
    function burn(address from, uint256[] calldata ids, uint256[] calldata amounts) external;
    function balanceOfBatch(address[] calldata accounts, uint256[] calldata ids) external view returns (uint256[] memory);
}

/// @title DishNFT
/// @notice ERC-721 NFTs representing cooked dishes with on-chain SVG generation
/// @dev Burns ingredients to mint unique dish NFTs with deterministic visuals
contract DishNFT is ERC721, Ownable {
    using Strings for uint256;

    /// @notice Recipe data stored for each dish
    struct Recipe {
        uint256[] ingredientIds;
        uint256[] amounts;
        uint256 timestamp;
    }

    /// @notice The Ingredients contract for burning tokens
    IIngredients public ingredients;

    /// @notice Next token ID to mint
    uint256 public nextTokenId = 1;

    /// @notice Maps token ID to recipe data
    mapping(uint256 => Recipe) public recipes;

    /// @notice Emitted when a dish is cooked (minted)
    /// @param chef Address that cooked the dish
    /// @param tokenId ID of the minted dish NFT
    /// @param ingredientIds Array of ingredient IDs used
    /// @param amounts Array of amounts used for each ingredient
    event DishCooked(address indexed chef, uint256 indexed tokenId, uint256[] ingredientIds, uint256[] amounts);

    /// @notice Thrown when array lengths don't match
    error InvalidArrayLength();

    /// @notice Thrown when trying to cook with no ingredients
    error EmptyRecipe();

    /// @notice Thrown when user doesn't have enough ingredients
    error InsufficientIngredients();

    /// @notice Creates the DishNFT contract
    /// @param _owner The initial owner of the contract
    constructor(address _owner) ERC721("ChainSchool Dishes", "DISH") Ownable(_owner) {}

    /// @notice Sets the Ingredients contract address
    /// @param _ingredients Address of the Ingredients contract
    function setIngredients(address _ingredients) external onlyOwner {
        ingredients = IIngredients(_ingredients);
    }

    /// @notice Cook a dish by burning ingredients and minting an NFT
    /// @param ingredientIds Array of ingredient IDs to use
    /// @param amounts Array of amounts to use for each ingredient
    /// @return The token ID of the minted dish
    function cook(uint256[] calldata ingredientIds, uint256[] calldata amounts) external returns (uint256) {
        if (ingredientIds.length != amounts.length) {
            revert InvalidArrayLength();
        }

        if (ingredientIds.length == 0) {
            revert EmptyRecipe();
        }

        // Check user has sufficient ingredients
        address[] memory accounts = new address[](ingredientIds.length);
        for (uint256 i = 0; i < ingredientIds.length; i++) {
            accounts[i] = msg.sender;
        }

        uint256[] memory balances = ingredients.balanceOfBatch(accounts, ingredientIds);
        for (uint256 i = 0; i < balances.length; i++) {
            if (balances[i] < amounts[i]) {
                revert InsufficientIngredients();
            }
        }

        // Burn ingredients
        ingredients.burn(msg.sender, ingredientIds, amounts);

        // Mint dish NFT
        uint256 tokenId = nextTokenId++;
        _mint(msg.sender, tokenId);

        // Store recipe
        recipes[tokenId] = Recipe({
            ingredientIds: ingredientIds,
            amounts: amounts,
            timestamp: block.timestamp
        });

        emit DishCooked(msg.sender, tokenId, ingredientIds, amounts);

        return tokenId;
    }

    /// @notice Get the recipe for a dish
    /// @param tokenId The dish token ID
    /// @return The recipe data
    function getRecipe(uint256 tokenId) external view returns (Recipe memory) {
        return recipes[tokenId];
    }

    /// @notice Generate metadata URI for a dish NFT
    /// @param tokenId The dish token ID
    /// @return Base64-encoded JSON metadata with embedded SVG
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);

        Recipe memory recipe = recipes[tokenId];

        // Generate SVG
        string memory svg = generateDishSVG(recipe.ingredientIds, recipe.amounts);
        string memory imageURI = string(abi.encodePacked(
            "data:image/svg+xml;base64,",
            Base64.encode(bytes(svg))
        ));

        // Generate metadata JSON
        string memory json = string(abi.encodePacked(
            '{"name": "Dish #', tokenId.toString(),
            '", "description": "A delicious dish made with ',
            _formatIngredientList(recipe.ingredientIds, recipe.amounts),
            ' in the ChainSchool On-Chain Kitchen tutorial.",',
            ' "image": "', imageURI, '",',
            ' "attributes": [',
                '{"trait_type": "Ingredient Count", "value": ', recipe.ingredientIds.length.toString(), '},',
                '{"trait_type": "Total Quantity", "value": ', _calculateTotalQuantity(recipe.amounts).toString(), '},',
                '{"trait_type": "Cook Time", "value": ', recipe.timestamp.toString(), '}',
            ']}'
        ));

        return string(abi.encodePacked(
            "data:application/json;base64,",
            Base64.encode(bytes(json))
        ));
    }

    /// @notice Generate deterministic SVG for a dish based on ingredients
    /// @param ingredientIds Array of ingredient IDs
    /// @param amounts Array of amounts for each ingredient
    /// @return SVG string
    function generateDishSVG(uint256[] memory ingredientIds, uint256[] memory amounts) internal pure returns (string memory) {
        string memory ingredientShapes = "";

        // Generate shapes for each ingredient
        for (uint256 i = 0; i < ingredientIds.length; i++) {
            string memory shape = _getIngredientShape(ingredientIds[i], amounts[i], i);
            ingredientShapes = string(abi.encodePacked(ingredientShapes, shape));
        }

        return string(abi.encodePacked(
            '<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">',
                '<rect width="300" height="300" fill="#fef7ed"/>',
                '<circle cx="150" cy="150" r="120" fill="#ffffff" stroke="#e5e7eb" stroke-width="4"/>',
                '<circle cx="150" cy="150" r="100" fill="#f9fafb"/>',
                ingredientShapes,
            '</svg>'
        ));
    }

    /// @notice Get SVG shape for a specific ingredient
    /// @param ingredientId The ingredient ID
    /// @param amount The amount used
    /// @param index Position index for layout
    /// @return SVG shape string
    function _getIngredientShape(uint256 ingredientId, uint256 amount, uint256 index) internal pure returns (string memory) {
        // Base position varies by index to avoid overlap
        uint256 baseX = 150 + (index % 2 == 0 ? -30 : 30);
        uint256 baseY = 130 + (index * 15);

        // Size varies by amount (minimum 10, scales with amount)
        uint256 size = 10 + (amount * 5);

        if (ingredientId == 1) { // EGG - Yellow circle
            return string(abi.encodePacked(
                '<circle cx="', baseX.toString(), '" cy="', baseY.toString(),
                '" r="', size.toString(), '" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>',
                '<circle cx="', (baseX - 5).toString(), '" cy="', (baseY - 5).toString(),
                '" r="3" fill="#ffffff"/>'
            ));
        } else if (ingredientId == 2) { // CHEESE - Orange triangle
            return string(abi.encodePacked(
                '<polygon points="', baseX.toString(), ',', (baseY - size).toString(), ' ',
                (baseX - size).toString(), ',', (baseY + size).toString(), ' ',
                (baseX + size).toString(), ',', (baseY + size).toString(), '"',
                ' fill="#fed7aa" stroke="#ea580c" stroke-width="2"/>'
            ));
        } else if (ingredientId == 3) { // BACON - Pink wavy rectangle
            return string(abi.encodePacked(
                '<rect x="', (baseX - size).toString(), '" y="', (baseY - size/2).toString(),
                '" width="', (size * 2).toString(), '" height="', size.toString(),
                '" fill="#fecaca" stroke="#dc2626" stroke-width="2" rx="5"/>',
                '<line x1="', (baseX - size + 5).toString(), '" y1="', baseY.toString(),
                '" x2="', (baseX + size - 5).toString(), '" y2="', baseY.toString(),
                '" stroke="#7f1d1d" stroke-width="1"/>'
            ));
        } else {
            // Unknown ingredient - gray circle
            return string(abi.encodePacked(
                '<circle cx="', baseX.toString(), '" cy="', baseY.toString(),
                '" r="', size.toString(), '" fill="#d1d5db" stroke="#6b7280" stroke-width="2"/>'
            ));
        }
    }

    /// @notice Format ingredient list for metadata description
    function _formatIngredientList(uint256[] memory ingredientIds, uint256[] memory amounts) internal pure returns (string memory) {
        string memory list = "";
        for (uint256 i = 0; i < ingredientIds.length; i++) {
            string memory ingredientName = _getIngredientName(ingredientIds[i]);
            if (i > 0) {
                list = string(abi.encodePacked(list, ", "));
            }
            list = string(abi.encodePacked(list, amounts[i].toString(), " ", ingredientName));
        }
        return list;
    }

    /// @notice Get human-readable ingredient name
    function _getIngredientName(uint256 ingredientId) internal pure returns (string memory) {
        if (ingredientId == 1) return "Egg";
        if (ingredientId == 2) return "Cheese";
        if (ingredientId == 3) return "Bacon";
        return "Unknown";
    }

    /// @notice Calculate total quantity of ingredients
    function _calculateTotalQuantity(uint256[] memory amounts) internal pure returns (uint256) {
        uint256 total = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            total += amounts[i];
        }
        return total;
    }
}