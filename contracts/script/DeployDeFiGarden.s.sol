// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/SeedToken.sol";
import "../src/StakedSeedToken.sol";
import "../src/SeedStaking.sol";
import "../src/GardenDeposit.sol";
import "../src/Greenhouse.sol";

/// @title DeployDeFiGarden
/// @notice Deployment script for DeFi Garden contracts
/// @dev CRITICAL: Deploy order matters - all contracts must share the same sSEED instance
contract DeployDeFiGarden is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console.log("Deploying DeFi Garden contracts with deployer:", deployer);
        console.log("Deployer balance:", deployer.balance);

        vm.startBroadcast(deployerPrivateKey);

        // 1. Deploy SeedToken first (ERC-20 with faucet)
        console.log("\n=== Deploying SeedToken ===");
        SeedToken seedToken = new SeedToken();
        console.log("SeedToken deployed at:", address(seedToken));

        // 2. Deploy SeedStaking (takes SEED token and deployer as owner)
        console.log("\n=== Deploying SeedStaking ===");
        SeedStaking staking = new SeedStaking(seedToken, deployer);
        console.log("SeedStaking deployed at:", address(staking));

        // 3. Deploy StakedSeedToken STANDALONE (CRITICAL: deploy once, use everywhere)
        console.log("\n=== Deploying StakedSeedToken ===");
        StakedSeedToken sSeedToken = new StakedSeedToken(deployer);
        console.log("StakedSeedToken deployed at:", address(sSeedToken));

        // 4. Deploy GardenDeposit (pass existing sSEED instance)
        console.log("\n=== Deploying GardenDeposit ===");
        GardenDeposit gardenDeposit = new GardenDeposit(
            seedToken,
            staking,
            IGreenhouse(address(0)), // Will set vault after Greenhouse deployment
            sSeedToken
        );
        console.log("GardenDeposit deployed at:", address(gardenDeposit));

        // 5. Grant MINTER_ROLE and BURNER_ROLE on sSEED to GardenDeposit
        console.log("\n=== Configuring StakedSeedToken Roles ===");
        sSeedToken.grantMinterBurnerRoles(address(gardenDeposit));
        console.log("Granted MINTER_ROLE and BURNER_ROLE to GardenDeposit");

        // 6. Deploy Greenhouse (ERC-4626 vault with sSEED as underlying)
        console.log("\n=== Deploying Greenhouse ===");
        Greenhouse greenhouse = new Greenhouse(
            sSeedToken,
            "Greenhouse SEED",
            "vSEED"
        );
        console.log("Greenhouse deployed at:", address(greenhouse));

        // 7. Set vault in GardenDeposit
        console.log("\n=== Connecting GardenDeposit to Greenhouse ===");
        gardenDeposit.setVault(greenhouse);
        console.log("GardenDeposit connected to Greenhouse vault");

        // 8. Transfer 100,000 SEED to staking contract for rewards
        console.log("\n=== Funding Staking Contract with Rewards ===");
        uint256 rewardAmount = 100_000 * 10**18; // 100,000 SEED
        seedToken.transfer(address(staking), rewardAmount);
        console.log("Transferred 100,000 SEED to staking contract for rewards");

        // 9. Start initial reward period with 10,000 SEED distributed over 24 hours
        console.log("\n=== Starting Initial Reward Period ===");
        uint256 initialReward = 10_000 * 10**18; // 10,000 SEED
        staking.notifyRewardAmount(initialReward);
        console.log("Started reward period with 10,000 SEED over 24 hours");

        vm.stopBroadcast();

        // 10. Log final deployment summary
        console.log("\n=== DEFI GARDEN DEPLOYMENT SUMMARY ===");
        console.log("Network:", block.chainid);
        console.log("Deployer:", deployer);
        console.log("");
        console.log("SeedToken:", address(seedToken));
        console.log("StakedSeedToken (sSEED):", address(sSeedToken));
        console.log("SeedStaking:", address(staking));
        console.log("GardenDeposit:", address(gardenDeposit));
        console.log("Greenhouse (vSEED):", address(greenhouse));
        console.log("");
        console.log("Token balances:");
        console.log("- Deployer SEED balance:", seedToken.balanceOf(deployer) / 1e18);
        console.log("- Staking SEED balance:", seedToken.balanceOf(address(staking)) / 1e18);
        console.log("");
        console.log("All DeFi Garden contracts deployed and configured successfully!");

        // 11. Create environment file for frontend
        string memory envContent = string(
            abi.encodePacked(
                "NEXT_PUBLIC_SEED_TOKEN_ADDRESS=", vm.toString(address(seedToken)), "\n",
                "NEXT_PUBLIC_STAKED_SEED_TOKEN_ADDRESS=", vm.toString(address(sSeedToken)), "\n",
                "NEXT_PUBLIC_SEED_STAKING_ADDRESS=", vm.toString(address(staking)), "\n",
                "NEXT_PUBLIC_GARDEN_DEPOSIT_ADDRESS=", vm.toString(address(gardenDeposit)), "\n",
                "NEXT_PUBLIC_GREENHOUSE_ADDRESS=", vm.toString(address(greenhouse)), "\n"
            )
        );

        // Write to deployments directory
        string memory deploymentsDir = string(abi.encodePacked(vm.projectRoot(), "/deployments"));
        vm.createDir(deploymentsDir, true);

        string memory chainIdStr = vm.toString(block.chainid);
        string memory deploymentFile = string(
            abi.encodePacked(deploymentsDir, "/defi-garden-", chainIdStr, ".txt")
        );

        vm.writeFile(deploymentFile, envContent);
        console.log("DeFi Garden deployment addresses saved to:", deploymentFile);

        // 12. Verify deployment integrity
        console.log("\n=== DEPLOYMENT INTEGRITY CHECK ===");
        console.log("sSEED has MINTER_ROLE for GardenDeposit:", sSeedToken.hasRole(sSeedToken.MINTER_ROLE(), address(gardenDeposit)));
        console.log("sSEED has BURNER_ROLE for GardenDeposit:", sSeedToken.hasRole(sSeedToken.BURNER_ROLE(), address(gardenDeposit)));
        console.log("GardenDeposit vault is Greenhouse:", address(gardenDeposit.greenhouse()) == address(greenhouse));
        console.log("Greenhouse asset is sSEED:", address(greenhouse.asset()) == address(sSeedToken));
    }
}