// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/KitchenToken.sol";
import "../src/Ingredients.sol";
import "../src/DishNFT.sol";

/// @title Deploy
/// @notice Deployment script for ChainSchool contracts
contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console.log("Deploying contracts with deployer:", deployer);
        console.log("Deployer balance:", deployer.balance);

        vm.startBroadcast(deployerPrivateKey);

        // 1. Deploy KitchenToken first (no dependencies)
        console.log("\n=== Deploying KitchenToken ===");
        KitchenToken kitchenToken = new KitchenToken();
        console.log("KitchenToken deployed at:", address(kitchenToken));

        // 2. Deploy Ingredients with deployer as owner
        console.log("\n=== Deploying Ingredients ===");
        Ingredients ingredients = new Ingredients(deployer);
        console.log("Ingredients deployed at:", address(ingredients));

        // 3. Deploy DishNFT with deployer as owner
        console.log("\n=== Deploying DishNFT ===");
        DishNFT dishNFT = new DishNFT(deployer);
        console.log("DishNFT deployed at:", address(dishNFT));

        // 4. Configure contract relationships
        console.log("\n=== Configuring Contract Relationships ===");

        // Set KitchenToken address in Ingredients contract
        ingredients.setKitchenToken(address(kitchenToken));
        console.log("Configured Ingredients with KitchenToken address");

        // Set DishNFT address in Ingredients contract
        ingredients.setDishNFT(address(dishNFT));
        console.log("Configured Ingredients with DishNFT address");

        // Set Ingredients address in DishNFT contract
        dishNFT.setIngredients(address(ingredients));
        console.log("Configured DishNFT with Ingredients address");

        vm.stopBroadcast();

        // 5. Log final deployment summary
        console.log("\n=== DEPLOYMENT SUMMARY ===");
        console.log("Network:", block.chainid);
        console.log("Deployer:", deployer);
        console.log("");
        console.log("KitchenToken:", address(kitchenToken));
        console.log("Ingredients:", address(ingredients));
        console.log("DishNFT:", address(dishNFT));
        console.log("");
        console.log("All contracts deployed and configured successfully!");

        // 6. Create environment file for frontend
        string memory envContent = string(
            abi.encodePacked(
                "NEXT_PUBLIC_KITCHEN_TOKEN_ADDRESS=", vm.toString(address(kitchenToken)), "\n",
                "NEXT_PUBLIC_INGREDIENTS_ADDRESS=", vm.toString(address(ingredients)), "\n",
                "NEXT_PUBLIC_DISH_NFT_ADDRESS=", vm.toString(address(dishNFT)), "\n"
            )
        );

        // Write to deployments directory
        string memory deploymentsDir = string(abi.encodePacked(vm.projectRoot(), "/deployments"));
        vm.createDir(deploymentsDir, true);

        string memory chainIdStr = vm.toString(block.chainid);
        string memory deploymentFile = string(
            abi.encodePacked(deploymentsDir, "/", chainIdStr, ".txt")
        );

        vm.writeFile(deploymentFile, envContent);
        console.log("Deployment addresses saved to:", deploymentFile);
    }
}