// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title Ingredients
/// @notice An ERC-1155 contract for managing cooking ingredients
/// @dev Ingredients can be purchased with KitchenTokens and burned for cooking
contract Ingredients is ERC1155, Ownable {
    /// @notice Ingredient token IDs
    uint256 public constant EGG = 1;
    uint256 public constant CHEESE = 2;
    uint256 public constant BACON = 3;

    /// @notice Price per ingredient in KitchenToken wei (10 tokens)
    uint256 public constant PRICE_PER_INGREDIENT = 10 * 10**18;

    /// @notice The KitchenToken contract used for purchasing
    IERC20 public kitchenToken;

    /// @notice The DishNFT contract allowed to burn ingredients
    address public dishNFT;

    /// @notice Next ingredient ID for future additions
    uint256 public nextIngredientId = 4;

    /// @notice Maps ingredient IDs to their existence
    mapping(uint256 => bool) public ingredientExists;

    /// @notice Emitted when ingredients are purchased
    /// @param buyer The address that bought ingredients
    /// @param ids Array of ingredient IDs purchased
    /// @param amounts Array of amounts purchased for each ingredient
    event IngredientsPurchased(address indexed buyer, uint256[] ids, uint256[] amounts);

    /// @notice Emitted when ingredients are burned for cooking
    /// @param from The address whose ingredients were burned
    /// @param ids Array of ingredient IDs burned
    /// @param amounts Array of amounts burned for each ingredient
    event IngredientsBurned(address indexed from, uint256[] ids, uint256[] amounts);

    /// @notice Emitted when a new ingredient is added
    /// @param id The ID of the new ingredient
    /// @param name The name of the new ingredient
    event NewIngredientAdded(uint256 indexed id, string name);

    /// @notice Thrown when array lengths don't match
    error InvalidArrayLength();

    /// @notice Thrown when user doesn't have enough KitchenTokens
    error InsufficientTokens();

    /// @notice Thrown when caller is not the DishNFT contract
    error OnlyDishContract();

    /// @notice Thrown when trying to operate on non-existent ingredient
    error IngredientNotExists();

    /// @notice Creates the Ingredients contract
    /// @param _owner The initial owner of the contract
    constructor(address _owner)
        ERC1155("https://chainschool.com/ingredients/{id}")
        Ownable(_owner)
    {
        // Initialize base ingredients
        ingredientExists[EGG] = true;
        ingredientExists[CHEESE] = true;
        ingredientExists[BACON] = true;
    }

    /// @notice Sets the KitchenToken contract address
    /// @param _kitchenToken Address of the KitchenToken contract
    function setKitchenToken(address _kitchenToken) external onlyOwner {
        kitchenToken = IERC20(_kitchenToken);
    }

    /// @notice Sets the DishNFT contract address
    /// @param _dishNFT Address of the DishNFT contract
    function setDishNFT(address _dishNFT) external onlyOwner {
        dishNFT = _dishNFT;
    }

    /// @notice Purchase ingredients in batch using KitchenTokens
    /// @param ids Array of ingredient IDs to purchase
    /// @param amounts Array of amounts to purchase for each ingredient
    function buyBatch(uint256[] calldata ids, uint256[] calldata amounts) external {
        if (ids.length != amounts.length) {
            revert InvalidArrayLength();
        }

        uint256 totalCost = 0;

        // Validate ingredients exist and calculate total cost
        for (uint256 i = 0; i < ids.length; i++) {
            if (!ingredientExists[ids[i]]) {
                revert IngredientNotExists();
            }
            totalCost += amounts[i] * PRICE_PER_INGREDIENT;
        }

        // Check user has enough tokens
        if (kitchenToken.balanceOf(msg.sender) < totalCost) {
            revert InsufficientTokens();
        }

        // Transfer payment
        kitchenToken.transferFrom(msg.sender, address(this), totalCost);

        // Mint ingredients to user
        _mintBatch(msg.sender, ids, amounts, "");

        emit IngredientsPurchased(msg.sender, ids, amounts);
    }

    /// @notice Burn ingredients (only callable by DishNFT contract)
    /// @param from Address to burn ingredients from
    /// @param ids Array of ingredient IDs to burn
    /// @param amounts Array of amounts to burn for each ingredient
    function burn(address from, uint256[] calldata ids, uint256[] calldata amounts) external {
        if (msg.sender != dishNFT) {
            revert OnlyDishContract();
        }

        if (ids.length != amounts.length) {
            revert InvalidArrayLength();
        }

        _burnBatch(from, ids, amounts);

        emit IngredientsBurned(from, ids, amounts);
    }

    /// @notice Add a new ingredient type (only owner)
    /// @param name Name of the new ingredient for events
    /// @return The ID of the new ingredient
    function addIngredient(string calldata name) external onlyOwner returns (uint256) {
        uint256 newId = nextIngredientId;
        nextIngredientId++;

        ingredientExists[newId] = true;

        emit NewIngredientAdded(newId, name);

        return newId;
    }

    /// @notice Check if an ingredient ID exists
    /// @param id The ingredient ID to check
    /// @return True if the ingredient exists
    function ingredientExistsById(uint256 id) external view returns (bool) {
        return ingredientExists[id];
    }
}