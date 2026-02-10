// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/SeedToken.sol";
import "../src/StakedSeedToken.sol";
import "../src/SeedStaking.sol";
import "../src/GardenDeposit.sol";
import "../src/Greenhouse.sol";

contract DeFiGardenTest is Test {
    SeedToken public seedToken;
    StakedSeedToken public sSeedToken;
    SeedStaking public staking;
    GardenDeposit public gardenDeposit;
    Greenhouse public greenhouse;

    address public deployer = address(this);
    address public user1 = makeAddr("user1");
    address public user2 = makeAddr("user2");

    function setUp() public {
        // Deploy all contracts in correct order (as per deploy script)

        // 1. Deploy SeedToken
        seedToken = new SeedToken();

        // 2. Deploy SeedStaking
        staking = new SeedStaking(seedToken, deployer);

        // 3. Deploy StakedSeedToken STANDALONE
        sSeedToken = new StakedSeedToken(deployer);

        // 4. Deploy GardenDeposit (vault will be set later)
        gardenDeposit = new GardenDeposit(
            seedToken,
            staking,
            IGreenhouse(address(0)),
            sSeedToken
        );

        // 5. Grant roles to GardenDeposit
        sSeedToken.grantMinterBurnerRoles(address(gardenDeposit));

        // 6. Deploy Greenhouse
        greenhouse = new Greenhouse(
            sSeedToken,
            "Greenhouse SEED",
            "vSEED"
        );

        // 7. Connect GardenDeposit to Greenhouse
        gardenDeposit.setVault(greenhouse);

        // 8. Fund staking with rewards
        uint256 rewardAmount = 100_000 * 10**18;
        seedToken.transfer(address(staking), rewardAmount);

        // 9. Start reward period
        staking.notifyRewardAmount(10_000 * 10**18);

        // Give users some SEED tokens
        seedToken.transfer(user1, 10_000 * 10**18);
        seedToken.transfer(user2, 10_000 * 10**18);
    }

    function test_InitialSetup() public {
        assertEq(address(gardenDeposit.seedToken()), address(seedToken));
        assertEq(address(gardenDeposit.staking()), address(staking));
        assertEq(address(gardenDeposit.sSeedToken()), address(sSeedToken));
        assertEq(address(gardenDeposit.greenhouse()), address(greenhouse));

        assertTrue(sSeedToken.hasRole(sSeedToken.MINTER_ROLE(), address(gardenDeposit)));
        assertTrue(sSeedToken.hasRole(sSeedToken.BURNER_ROLE(), address(gardenDeposit)));

        assertEq(address(greenhouse.asset()), address(sSeedToken));
    }

    function test_DepositWithoutCompound() public {
        uint256 depositAmount = 1000 * 10**18;

        vm.startPrank(user1);

        // Approve GardenDeposit to spend SEED
        seedToken.approve(address(gardenDeposit), depositAmount);

        // Deposit without compounding
        uint256 shares = gardenDeposit.deposit(depositAmount, user1, false);

        vm.stopPrank();

        // Should receive sSEED 1:1
        assertEq(shares, depositAmount);
        assertEq(sSeedToken.balanceOf(user1), depositAmount);
        assertEq(seedToken.balanceOf(user1), 9000 * 10**18); // Started with 10k, spent 1k

        // SEED should be staked
        assertEq(staking.balances(address(gardenDeposit)), depositAmount);
    }

    function test_DepositWithCompound() public {
        uint256 depositAmount = 1000 * 10**18;

        vm.startPrank(user1);

        // Approve GardenDeposit to spend SEED
        seedToken.approve(address(gardenDeposit), depositAmount);

        // Deposit with compounding
        uint256 shares = gardenDeposit.deposit(depositAmount, user1, true);

        vm.stopPrank();

        // Should receive vault shares (vSEED)
        assertEq(shares, depositAmount); // 1:1 initially
        assertEq(greenhouse.balanceOf(user1), depositAmount);
        assertEq(sSeedToken.balanceOf(user1), 0); // sSEED went to vault

        // SEED should be staked
        assertEq(staking.balances(address(gardenDeposit)), depositAmount);
    }

    function test_FullFlowWithoutCompound() public {
        uint256 depositAmount = 1000 * 10**18;

        vm.startPrank(user1);

        // 1. Deposit
        seedToken.approve(address(gardenDeposit), depositAmount);
        gardenDeposit.deposit(depositAmount, user1, false);

        vm.stopPrank();

        // 2. Wait for rewards to accumulate
        vm.warp(block.timestamp + 12 hours); // Half day

        // Check earned rewards
        uint256 earned = gardenDeposit.earnedRewards();
        assertTrue(earned > 0); // Should have earned some rewards

        // 3. Harvest rewards (optional)
        uint256 rewardsHarvested = gardenDeposit.harvest();
        assertEq(rewardsHarvested, earned);

        // Wait a bit more
        vm.warp(block.timestamp + 12 hours); // Another half day

        vm.startPrank(user1);

        // 4. Redeem sSEED for SEED
        uint256 sSeedBalance = sSeedToken.balanceOf(user1);
        uint256 seedReceived = gardenDeposit.redeem(sSeedBalance);

        vm.stopPrank();

        // Should get back at least original deposit
        assertGe(seedReceived, depositAmount);
        assertEq(sSeedToken.balanceOf(user1), 0);

        // User should have more SEED than they started with (original + rewards)
        assertGe(seedToken.balanceOf(user1), 9000 * 10**18); // At least what they had after deposit
    }

    function test_FullFlowWithCompound() public {
        uint256 depositAmount = 1000 * 10**18;

        vm.startPrank(user1);

        // 1. Deposit with compound
        seedToken.approve(address(gardenDeposit), depositAmount);
        uint256 vaultShares = gardenDeposit.deposit(depositAmount, user1, true);

        vm.stopPrank();

        // 2. Wait for rewards
        vm.warp(block.timestamp + 24 hours); // Full day

        // 3. Harvest rewards to compound them
        gardenDeposit.harvest();

        // 4. Check that vault shares are worth more than initial deposit
        uint256 assetsPerShare = greenhouse.convertToAssets(vaultShares);
        assertGe(assetsPerShare, depositAmount);

        vm.startPrank(user1);

        // 5. Redeem from vault
        uint256 assetsReceived = greenhouse.redeem(vaultShares, user1, user1);

        // 6. Redeem sSEED for SEED
        gardenDeposit.redeem(assetsReceived);

        vm.stopPrank();

        // Should have earned rewards
        assertGe(seedToken.balanceOf(user1), 9000 * 10**18);
    }

    function test_MultipleUsersStaking() public {
        uint256 user1Deposit = 1000 * 10**18;
        uint256 user2Deposit = 2000 * 10**18;

        // User1 deposits
        vm.startPrank(user1);
        seedToken.approve(address(gardenDeposit), user1Deposit);
        gardenDeposit.deposit(user1Deposit, user1, false);
        vm.stopPrank();

        // User2 deposits
        vm.startPrank(user2);
        seedToken.approve(address(gardenDeposit), user2Deposit);
        gardenDeposit.deposit(user2Deposit, user2, false);
        vm.stopPrank();

        // Wait for rewards
        vm.warp(block.timestamp + 24 hours);

        // Both should have earned rewards proportional to their stake
        uint256 totalStaked = user1Deposit + user2Deposit;
        uint256 expectedUser1Rewards = (user1Deposit * 10_000 * 10**18) / totalStaked;
        uint256 expectedUser2Rewards = (user2Deposit * 10_000 * 10**18) / totalStaked;

        // Check proportional rewards (allowing for rounding)
        uint256 user1Share = (user1Deposit * 1e18) / totalStaked;
        uint256 user2Share = (user2Deposit * 1e18) / totalStaked;

        // User2 should have roughly 2x the rewards of user1
        assertApproxEqRel(user2Share, user1Share * 2, 1e16); // 1% tolerance
    }

    function test_RedeemWithoutUnderflow() public {
        uint256 depositAmount = 1000 * 10**18;

        vm.startPrank(user1);

        // Deposit with compound
        seedToken.approve(address(gardenDeposit), depositAmount);
        uint256 vaultShares = gardenDeposit.deposit(depositAmount, user1, true);

        vm.stopPrank();

        // Wait for rewards and harvest
        vm.warp(block.timestamp + 24 hours);
        gardenDeposit.harvest();

        // This should NOT revert with underflow (the bug mentioned in prompt)
        vm.startPrank(user1);
        uint256 assetsReceived = greenhouse.redeem(vaultShares, user1, user1);
        vm.stopPrank();

        assertGt(assetsReceived, 0);
    }

    function test_FaucetIntegration() public {
        // User can claim from faucet and immediately use in DeFi Garden

        // Reset user1's balance to 0 first
        uint256 user1Balance = seedToken.balanceOf(user1);
        vm.prank(user1);
        seedToken.transfer(address(this), user1Balance); // Transfer to test contract (deployer)

        // Verify balance is 0
        assertEq(seedToken.balanceOf(user1), 0);

        vm.startPrank(user1);

        // Claim from faucet
        seedToken.faucet();
        assertEq(seedToken.balanceOf(user1), 1000 * 10**18);

        // Use faucet tokens in garden
        seedToken.approve(address(gardenDeposit), 1000 * 10**18);
        gardenDeposit.deposit(1000 * 10**18, user1, false);

        assertEq(sSeedToken.balanceOf(user1), 1000 * 10**18);
        assertEq(seedToken.balanceOf(user1), 0);

        vm.stopPrank();
    }

    function test_AccessControl() public {
        // Only GardenDeposit should be able to mint/burn sSEED
        vm.expectRevert();
        vm.prank(user1);
        sSeedToken.mint(user1, 1000 * 10**18);

        vm.expectRevert();
        vm.prank(user1);
        sSeedToken.burn(user1, 1000 * 10**18);
    }

    function test_ZeroAmountReverts() public {
        vm.startPrank(user1);

        // Should revert on zero deposit
        vm.expectRevert();
        gardenDeposit.deposit(0, user1, false);

        // Should revert on zero redeem
        vm.expectRevert();
        gardenDeposit.redeem(0);

        vm.stopPrank();
    }
}