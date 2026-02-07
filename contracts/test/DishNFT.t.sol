// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/DishNFT.sol";
import "../src/Ingredients.sol";
import "../src/KitchenToken.sol";

contract DishNFTTest is Test {
    DishNFT public dishNFT;
    Ingredients public ingredients;
    KitchenToken public kitchenToken;
    address public owner = address(0x1);
    address public user = address(0x2);

    event DishCooked(address indexed chef, uint256 indexed tokenId, uint256[] ingredientIds, uint256[] amounts);

    function setUp() public {
        vm.startPrank(owner);

        kitchenToken = new KitchenToken();
        ingredients = new Ingredients(owner);
        dishNFT = new DishNFT(owner);

        ingredients.setKitchenToken(address(kitchenToken));
        ingredients.setDishNFT(address(dishNFT));
        dishNFT.setIngredients(address(ingredients));

        vm.stopPrank();

        // Give user tokens and ingredients
        vm.prank(user);
        kitchenToken.faucet();

        vm.prank(user);
        kitchenToken.approve(address(ingredients), type(uint256).max);

        // Buy some ingredients
        uint256[] memory buyIds = new uint256[](3);
        uint256[] memory buyAmounts = new uint256[](3);
        buyIds[0] = ingredients.EGG();
        buyIds[1] = ingredients.CHEESE();
        buyIds[2] = ingredients.BACON();
        buyAmounts[0] = 2;
        buyAmounts[1] = 2;
        buyAmounts[2] = 2;

        vm.prank(user);
        ingredients.buyBatch(buyIds, buyAmounts);
    }

    function test_CookDishWithSingleIngredient() public {
        uint256[] memory cookIds = new uint256[](1);
        uint256[] memory cookAmounts = new uint256[](1);
        cookIds[0] = ingredients.EGG();
        cookAmounts[0] = 2;

        vm.expectEmit(true, true, false, true);
        emit DishCooked(user, 1, cookIds, cookAmounts);

        vm.prank(user);
        uint256 tokenId = dishNFT.cook(cookIds, cookAmounts);

        assertEq(tokenId, 1);
        assertEq(dishNFT.ownerOf(tokenId), user);
        assertEq(ingredients.balanceOf(user, ingredients.EGG()), 0); // 2 - 2 = 0
    }

    function test_CookDishWithMultipleIngredients() public {
        uint256[] memory cookIds = new uint256[](3);
        uint256[] memory cookAmounts = new uint256[](3);
        cookIds[0] = ingredients.EGG();
        cookIds[1] = ingredients.CHEESE();
        cookIds[2] = ingredients.BACON();
        cookAmounts[0] = 1;
        cookAmounts[1] = 2;
        cookAmounts[2] = 1;

        vm.prank(user);
        uint256 tokenId = dishNFT.cook(cookIds, cookAmounts);

        assertEq(tokenId, 1);
        assertEq(dishNFT.ownerOf(tokenId), user);
        assertEq(ingredients.balanceOf(user, ingredients.EGG()), 1);
        assertEq(ingredients.balanceOf(user, ingredients.CHEESE()), 0);
        assertEq(ingredients.balanceOf(user, ingredients.BACON()), 1);
    }

    function test_CannotCookWithEmptyRecipe() public {
        uint256[] memory cookIds = new uint256[](0);
        uint256[] memory cookAmounts = new uint256[](0);

        vm.expectRevert(DishNFT.EmptyRecipe.selector);
        vm.prank(user);
        dishNFT.cook(cookIds, cookAmounts);
    }

    function test_CannotCookWithMismatchedArrays() public {
        uint256[] memory cookIds = new uint256[](2);
        uint256[] memory cookAmounts = new uint256[](1);
        cookIds[0] = ingredients.EGG();
        cookIds[1] = ingredients.CHEESE();
        cookAmounts[0] = 1;

        vm.expectRevert(DishNFT.InvalidArrayLength.selector);
        vm.prank(user);
        dishNFT.cook(cookIds, cookAmounts);
    }

    function test_CannotCookWithInsufficientIngredients() public {
        uint256[] memory cookIds = new uint256[](1);
        uint256[] memory cookAmounts = new uint256[](1);
        cookIds[0] = ingredients.EGG();
        cookAmounts[0] = 5; // More than user has (user has 2)

        vm.expectRevert(DishNFT.InsufficientIngredients.selector);
        vm.prank(user);
        dishNFT.cook(cookIds, cookAmounts);
    }

    function test_RecipeStoredCorrectly() public {
        uint256[] memory cookIds = new uint256[](2);
        uint256[] memory cookAmounts = new uint256[](2);
        cookIds[0] = ingredients.EGG();
        cookIds[1] = ingredients.CHEESE();
        cookAmounts[0] = 1;
        cookAmounts[1] = 2;

        vm.prank(user);
        uint256 tokenId = dishNFT.cook(cookIds, cookAmounts);

        DishNFT.Recipe memory recipe = dishNFT.getRecipe(tokenId);

        assertEq(recipe.ingredientIds.length, 2);
        assertEq(recipe.amounts.length, 2);
        assertEq(recipe.ingredientIds[0], ingredients.EGG());
        assertEq(recipe.ingredientIds[1], ingredients.CHEESE());
        assertEq(recipe.amounts[0], 1);
        assertEq(recipe.amounts[1], 2);
        assertEq(recipe.timestamp, block.timestamp);
    }

    function test_TokenURIGeneratedCorrectly() public {
        uint256[] memory cookIds = new uint256[](1);
        uint256[] memory cookAmounts = new uint256[](1);
        cookIds[0] = ingredients.EGG();
        cookAmounts[0] = 1;

        vm.prank(user);
        uint256 tokenId = dishNFT.cook(cookIds, cookAmounts);

        string memory tokenURI = dishNFT.tokenURI(tokenId);

        // Check that it starts with data:application/json;base64,
        assertEq(
            keccak256(abi.encodePacked(substring(tokenURI, 0, 29))),
            keccak256(abi.encodePacked("data:application/json;base64,"))
        );

        // Check that it's not empty
        assertTrue(bytes(tokenURI).length > 29);
    }

    function test_MultipleUsersCookDifferentDishes() public {
        address user2 = address(0x4);

        // Give user2 tokens and ingredients
        vm.prank(user2);
        kitchenToken.faucet();

        vm.prank(user2);
        kitchenToken.approve(address(ingredients), type(uint256).max);

        uint256[] memory buyIds = new uint256[](1);
        uint256[] memory buyAmounts = new uint256[](1);
        buyIds[0] = ingredients.BACON();
        buyAmounts[0] = 3;

        vm.prank(user2);
        ingredients.buyBatch(buyIds, buyAmounts);

        // User1 cooks with egg
        uint256[] memory cookIds1 = new uint256[](1);
        uint256[] memory cookAmounts1 = new uint256[](1);
        cookIds1[0] = ingredients.EGG();
        cookAmounts1[0] = 1;

        vm.prank(user);
        uint256 tokenId1 = dishNFT.cook(cookIds1, cookAmounts1);

        // User2 cooks with bacon
        uint256[] memory cookIds2 = new uint256[](1);
        uint256[] memory cookAmounts2 = new uint256[](1);
        cookIds2[0] = ingredients.BACON();
        cookAmounts2[0] = 2;

        vm.prank(user2);
        uint256 tokenId2 = dishNFT.cook(cookIds2, cookAmounts2);

        assertEq(tokenId1, 1);
        assertEq(tokenId2, 2);
        assertEq(dishNFT.ownerOf(tokenId1), user);
        assertEq(dishNFT.ownerOf(tokenId2), user2);
    }

    function test_TokenIdIncrementsCorrectly() public {
        // User only has 2 eggs, so only cook 2 dishes
        uint256[] memory cookIds = new uint256[](1);
        uint256[] memory cookAmounts = new uint256[](1);
        cookIds[0] = ingredients.EGG();
        cookAmounts[0] = 1;

        vm.prank(user);
        uint256 tokenId1 = dishNFT.cook(cookIds, cookAmounts);

        vm.prank(user);
        uint256 tokenId2 = dishNFT.cook(cookIds, cookAmounts);

        assertEq(tokenId1, 1);
        assertEq(tokenId2, 2);
        assertEq(dishNFT.nextTokenId(), 3);
    }

    function test_OnlyOwnerCanSetIngredients() public {
        vm.expectRevert();
        vm.prank(user);
        dishNFT.setIngredients(address(0x999));
    }

    function test_TokenNameAndSymbol() public {
        assertEq(dishNFT.name(), "ChainSchool Dishes");
        assertEq(dishNFT.symbol(), "DISH");
    }

    // Helper function to get substring
    function substring(string memory str, uint startIndex, uint endIndex) internal pure returns (string memory) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(endIndex - startIndex);
        for (uint i = startIndex; i < endIndex; i++) {
            result[i - startIndex] = strBytes[i];
        }
        return string(result);
    }
}