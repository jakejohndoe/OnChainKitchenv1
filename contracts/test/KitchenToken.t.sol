// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/KitchenToken.sol";

contract KitchenTokenTest is Test {
    KitchenToken public token;
    address public user1 = address(0x1);
    address public user2 = address(0x2);

    event FaucetClaimed(address indexed user, uint256 amount);

    function setUp() public {
        token = new KitchenToken();
    }

    function test_FaucetMintsCorrectAmount() public {
        vm.prank(user1);
        token.faucet();

        assertEq(token.balanceOf(user1), token.FAUCET_AMOUNT());
    }

    function test_CannotClaimFaucetBeforeCooldown() public {
        vm.prank(user1);
        token.faucet();

        vm.expectRevert(abi.encodeWithSelector(KitchenToken.FaucetCooldownActive.selector, token.FAUCET_COOLDOWN()));
        vm.prank(user1);
        token.faucet();
    }

    function test_CanClaimFaucetAfterCooldown() public {
        vm.prank(user1);
        token.faucet();

        vm.warp(block.timestamp + token.FAUCET_COOLDOWN() + 1);

        vm.prank(user1);
        token.faucet();

        assertEq(token.balanceOf(user1), token.FAUCET_AMOUNT() * 2);
    }

    function test_CanClaimFaucetReturnsTrueWhenEligible() public {
        assertTrue(token.canClaimFaucet(user1));

        vm.prank(user1);
        token.faucet();

        assertFalse(token.canClaimFaucet(user1));
    }

    function test_TimeUntilNextClaimCalculatesCorrectly() public {
        assertEq(token.timeUntilNextClaim(user1), 0);

        vm.prank(user1);
        token.faucet();

        assertEq(token.timeUntilNextClaim(user1), token.FAUCET_COOLDOWN());

        vm.warp(block.timestamp + 12 hours);
        assertEq(token.timeUntilNextClaim(user1), 12 hours);

        vm.warp(block.timestamp + 12 hours + 1);
        assertEq(token.timeUntilNextClaim(user1), 0);
    }

    function test_FaucetEmitsEvent() public {
        vm.expectEmit(true, false, false, true);
        emit FaucetClaimed(user1, token.FAUCET_AMOUNT());

        vm.prank(user1);
        token.faucet();
    }

    function test_MultipleUsersCanClaimFaucet() public {
        vm.prank(user1);
        token.faucet();

        vm.prank(user2);
        token.faucet();

        assertEq(token.balanceOf(user1), token.FAUCET_AMOUNT());
        assertEq(token.balanceOf(user2), token.FAUCET_AMOUNT());
    }

    function test_TokenHasCorrectNameAndSymbol() public {
        assertEq(token.name(), "KitchenToken");
        assertEq(token.symbol(), "KITCHEN");
        assertEq(token.decimals(), 18);
    }

    function test_TokenTransferWorks() public {
        vm.prank(user1);
        token.faucet();

        vm.prank(user1);
        token.transfer(user2, 50 * 10**18);

        assertEq(token.balanceOf(user1), 50 * 10**18);
        assertEq(token.balanceOf(user2), 50 * 10**18);
    }
}