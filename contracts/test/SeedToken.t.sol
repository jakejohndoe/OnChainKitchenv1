// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/SeedToken.sol";

contract SeedTokenTest is Test {
    SeedToken public seedToken;
    address public user1 = makeAddr("user1");
    address public user2 = makeAddr("user2");

    function setUp() public {
        seedToken = new SeedToken();
    }

    function test_InitialSupply() public {
        // Deployer should receive 1,000,000 SEED
        assertEq(seedToken.balanceOf(address(this)), 1_000_000 * 10**18);
        assertEq(seedToken.totalSupply(), 1_000_000 * 10**18);
    }

    function test_TokenMetadata() public {
        assertEq(seedToken.name(), "Seed Token");
        assertEq(seedToken.symbol(), "SEED");
        assertEq(seedToken.decimals(), 18);
    }

    function test_FaucetFirstClaim() public {
        uint256 balanceBefore = seedToken.balanceOf(user1);

        vm.prank(user1);
        seedToken.faucet();

        assertEq(seedToken.balanceOf(user1), balanceBefore + 1000 * 10**18);
        assertEq(seedToken.lastClaimed(user1), block.timestamp);
        assertTrue(seedToken.canClaimFaucet(user1) == false);
    }

    function test_FaucetEmitsEvent() public {
        vm.expectEmit(true, false, false, true);
        emit SeedToken.FaucetClaimed(user1, 1000 * 10**18);

        vm.prank(user1);
        seedToken.faucet();
    }

    function test_FaucetCooldown() public {
        // First claim
        vm.prank(user1);
        seedToken.faucet();

        // Immediate second claim should fail
        vm.expectRevert();
        vm.prank(user1);
        seedToken.faucet();

        // After 12 hours, still should fail
        vm.warp(block.timestamp + 12 hours);
        vm.expectRevert();
        vm.prank(user1);
        seedToken.faucet();

        // After 24 hours, should succeed
        vm.warp(block.timestamp + 12 hours + 1);
        vm.prank(user1);
        seedToken.faucet();

        assertEq(seedToken.balanceOf(user1), 2000 * 10**18);
    }

    function test_CanClaimFaucet() public {
        // Should be able to claim initially
        assertTrue(seedToken.canClaimFaucet(user1));

        // Claim faucet
        vm.prank(user1);
        seedToken.faucet();

        // Should not be able to claim immediately after
        assertFalse(seedToken.canClaimFaucet(user1));

        // After 24 hours, should be able to claim again
        vm.warp(block.timestamp + 24 hours + 1);
        assertTrue(seedToken.canClaimFaucet(user1));
    }

    function test_TimeUntilNextClaim() public {
        // Initially should be 0 (can claim)
        assertEq(seedToken.timeUntilNextClaim(user1), 0);

        // Claim faucet
        vm.prank(user1);
        seedToken.faucet();

        // Should have cooldown time remaining
        assertEq(seedToken.timeUntilNextClaim(user1), 24 hours);

        // After 12 hours, should have 12 hours remaining
        vm.warp(block.timestamp + 12 hours);
        assertEq(seedToken.timeUntilNextClaim(user1), 12 hours);

        // After 24 hours, should be 0 again
        vm.warp(block.timestamp + 12 hours);
        assertEq(seedToken.timeUntilNextClaim(user1), 0);
    }

    function test_MultipleFaucetUsers() public {
        // Both users should be able to claim
        vm.prank(user1);
        seedToken.faucet();

        vm.prank(user2);
        seedToken.faucet();

        assertEq(seedToken.balanceOf(user1), 1000 * 10**18);
        assertEq(seedToken.balanceOf(user2), 1000 * 10**18);

        // user1's cooldown should not affect user2
        vm.warp(block.timestamp + 24 hours + 1);

        assertTrue(seedToken.canClaimFaucet(user1));
        assertTrue(seedToken.canClaimFaucet(user2));
    }

    function test_FaucetConstants() public {
        assertEq(seedToken.FAUCET_AMOUNT(), 1000 * 10**18);
        assertEq(seedToken.FAUCET_COOLDOWN(), 24 hours);
    }

    function test_StandardERC20Functions() public {
        // Transfer some tokens to user1 for testing
        seedToken.transfer(user1, 1000 * 10**18);

        vm.startPrank(user1);

        // Test transfer
        seedToken.transfer(user2, 500 * 10**18);
        assertEq(seedToken.balanceOf(user2), 500 * 10**18);
        assertEq(seedToken.balanceOf(user1), 500 * 10**18);

        // Test approve and transferFrom
        seedToken.approve(user2, 200 * 10**18);
        vm.stopPrank();

        vm.prank(user2);
        seedToken.transferFrom(user1, user2, 200 * 10**18);

        assertEq(seedToken.balanceOf(user1), 300 * 10**18);
        assertEq(seedToken.balanceOf(user2), 700 * 10**18);
    }
}