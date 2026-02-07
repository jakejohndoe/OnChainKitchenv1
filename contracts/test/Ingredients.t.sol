// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Ingredients.sol";
import "../src/KitchenToken.sol";

contract IngredientsTest is Test {
    Ingredients public ingredients;
    KitchenToken public kitchenToken;
    address public owner = address(0x1);
    address public user = address(0x2);
    address public dishNFT = address(0x3);

    event IngredientsPurchased(address indexed buyer, uint256[] ids, uint256[] amounts);
    event IngredientsBurned(address indexed from, uint256[] ids, uint256[] amounts);
    event NewIngredientAdded(uint256 indexed id, string name);

    function setUp() public {
        vm.startPrank(owner);

        ingredients = new Ingredients(owner);
        kitchenToken = new KitchenToken();

        ingredients.setKitchenToken(address(kitchenToken));
        ingredients.setDishNFT(dishNFT);

        vm.stopPrank();

        // Give user tokens
        vm.prank(user);
        kitchenToken.faucet();

        vm.prank(user);
        kitchenToken.approve(address(ingredients), type(uint256).max);
    }

    function test_BuySingleIngredient() public {
        uint256[] memory ids = new uint256[](1);
        uint256[] memory amounts = new uint256[](1);
        ids[0] = ingredients.EGG();
        amounts[0] = 1;

        uint256 cost = amounts[0] * ingredients.PRICE_PER_INGREDIENT();
        uint256 initialBalance = kitchenToken.balanceOf(user);

        vm.prank(user);
        ingredients.buyBatch(ids, amounts);

        assertEq(ingredients.balanceOf(user, ingredients.EGG()), 1);
        assertEq(kitchenToken.balanceOf(user), initialBalance - cost);
    }

    function test_BuyMultipleIngredientsBatch() public {
        uint256[] memory ids = new uint256[](3);
        uint256[] memory amounts = new uint256[](3);
        ids[0] = ingredients.EGG();
        ids[1] = ingredients.CHEESE();
        ids[2] = ingredients.BACON();
        amounts[0] = 2;
        amounts[1] = 1;
        amounts[2] = 3;

        uint256 totalCost = (amounts[0] + amounts[1] + amounts[2]) * ingredients.PRICE_PER_INGREDIENT();
        uint256 initialBalance = kitchenToken.balanceOf(user);

        vm.expectEmit(true, false, false, true);
        emit IngredientsPurchased(user, ids, amounts);

        vm.prank(user);
        ingredients.buyBatch(ids, amounts);

        assertEq(ingredients.balanceOf(user, ingredients.EGG()), 2);
        assertEq(ingredients.balanceOf(user, ingredients.CHEESE()), 1);
        assertEq(ingredients.balanceOf(user, ingredients.BACON()), 3);
        assertEq(kitchenToken.balanceOf(user), initialBalance - totalCost);
    }

    function test_CannotBuyWithInsufficientTokens() public {
        // Transfer away most tokens
        vm.prank(user);
        kitchenToken.transfer(address(0x999), 95 * 10**18);

        uint256[] memory ids = new uint256[](1);
        uint256[] memory amounts = new uint256[](1);
        ids[0] = ingredients.EGG();
        amounts[0] = 1;

        vm.expectRevert(Ingredients.InsufficientTokens.selector);
        vm.prank(user);
        ingredients.buyBatch(ids, amounts);
    }

    function test_CannotBuyNonExistentIngredient() public {
        uint256[] memory ids = new uint256[](1);
        uint256[] memory amounts = new uint256[](1);
        ids[0] = 999; // Non-existent ingredient
        amounts[0] = 1;

        vm.expectRevert(Ingredients.IngredientNotExists.selector);
        vm.prank(user);
        ingredients.buyBatch(ids, amounts);
    }

    function test_CannotBuyWithMismatchedArrayLengths() public {
        uint256[] memory ids = new uint256[](2);
        uint256[] memory amounts = new uint256[](1);
        ids[0] = ingredients.EGG();
        ids[1] = ingredients.CHEESE();
        amounts[0] = 1;

        vm.expectRevert(Ingredients.InvalidArrayLength.selector);
        vm.prank(user);
        ingredients.buyBatch(ids, amounts);
    }

    function test_BurnIngredients() public {
        // First buy some ingredients
        uint256[] memory ids = new uint256[](2);
        uint256[] memory amounts = new uint256[](2);
        ids[0] = ingredients.EGG();
        ids[1] = ingredients.CHEESE();
        amounts[0] = 3;
        amounts[1] = 2;

        vm.prank(user);
        ingredients.buyBatch(ids, amounts);

        // Now burn some
        uint256[] memory burnIds = new uint256[](2);
        uint256[] memory burnAmounts = new uint256[](2);
        burnIds[0] = ingredients.EGG();
        burnIds[1] = ingredients.CHEESE();
        burnAmounts[0] = 1;
        burnAmounts[1] = 2;

        vm.expectEmit(true, false, false, true);
        emit IngredientsBurned(user, burnIds, burnAmounts);

        vm.prank(dishNFT);
        ingredients.burn(user, burnIds, burnAmounts);

        assertEq(ingredients.balanceOf(user, ingredients.EGG()), 2);
        assertEq(ingredients.balanceOf(user, ingredients.CHEESE()), 0);
    }

    function test_OnlyDishNFTCanBurn() public {
        uint256[] memory ids = new uint256[](1);
        uint256[] memory amounts = new uint256[](1);
        ids[0] = ingredients.EGG();
        amounts[0] = 1;

        vm.expectRevert(Ingredients.OnlyDishContract.selector);
        vm.prank(user);
        ingredients.burn(user, ids, amounts);
    }

    function test_CannotBurnWithMismatchedArrays() public {
        uint256[] memory ids = new uint256[](2);
        uint256[] memory amounts = new uint256[](1);
        ids[0] = ingredients.EGG();
        ids[1] = ingredients.CHEESE();
        amounts[0] = 1;

        vm.expectRevert(Ingredients.InvalidArrayLength.selector);
        vm.prank(dishNFT);
        ingredients.burn(user, ids, amounts);
    }

    function test_AddNewIngredient() public {
        vm.expectEmit(true, false, false, true);
        emit NewIngredientAdded(4, "Tomato");

        vm.prank(owner);
        uint256 newId = ingredients.addIngredient("Tomato");

        assertEq(newId, 4);
        assertTrue(ingredients.ingredientExistsById(4));
        assertEq(ingredients.nextIngredientId(), 5);
    }

    function test_OnlyOwnerCanAddIngredient() public {
        vm.expectRevert();
        vm.prank(user);
        ingredients.addIngredient("Tomato");
    }

    function test_OnlyOwnerCanSetContracts() public {
        vm.expectRevert();
        vm.prank(user);
        ingredients.setKitchenToken(address(0x999));

        vm.expectRevert();
        vm.prank(user);
        ingredients.setDishNFT(address(0x999));
    }

    function test_IngredientExistsCheck() public {
        assertTrue(ingredients.ingredientExistsById(ingredients.EGG()));
        assertTrue(ingredients.ingredientExistsById(ingredients.CHEESE()));
        assertTrue(ingredients.ingredientExistsById(ingredients.BACON()));
        assertFalse(ingredients.ingredientExistsById(999));
    }

    function test_PriceCalculation() public {
        uint256[] memory ids = new uint256[](3);
        uint256[] memory amounts = new uint256[](3);
        ids[0] = ingredients.EGG();
        ids[1] = ingredients.CHEESE();
        ids[2] = ingredients.BACON();
        amounts[0] = 1;
        amounts[1] = 2;
        amounts[2] = 3;

        uint256 expectedCost = (1 + 2 + 3) * ingredients.PRICE_PER_INGREDIENT();
        uint256 initialBalance = kitchenToken.balanceOf(user);

        vm.prank(user);
        ingredients.buyBatch(ids, amounts);

        assertEq(kitchenToken.balanceOf(user), initialBalance - expectedCost);
    }
}