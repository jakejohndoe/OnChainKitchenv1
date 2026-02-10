// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title SeedToken
/// @notice A tutorial ERC-20 token with a public faucet for DeFi Garden learning
/// @dev This token is designed for educational use on Sepolia testnet only
contract SeedToken is ERC20 {
    /// @notice Amount of tokens distributed per faucet claim
    uint256 public constant FAUCET_AMOUNT = 1000 * 10**18; // 1000 tokens

    /// @notice Cooldown period between faucet claims per address
    uint256 public constant FAUCET_COOLDOWN = 24 hours;

    /// @notice Tracks the last faucet claim timestamp for each address
    mapping(address => uint256) public lastClaimed;

    /// @notice Emitted when a user claims tokens from the faucet
    /// @param user The address that claimed tokens
    /// @param amount The amount of tokens claimed
    event FaucetClaimed(address indexed user, uint256 amount);

    /// @notice Thrown when trying to claim faucet before cooldown expires
    /// @param timeRemaining Seconds remaining until next claim is allowed
    error FaucetCooldownActive(uint256 timeRemaining);

    /// @notice Creates the SeedToken contract
    /// @dev Mints initial supply to deployer for rewards distribution
    constructor() ERC20("Seed Token", "SEED") {
        // Mint 1,000,000 SEED to deployer for rewards and distribution
        _mint(msg.sender, 1_000_000 * 10**18);
    }

    /// @notice Claims free tokens from the faucet
    /// @dev Can only be called once every 24 hours per address
    function faucet() external {
        uint256 timeRemaining = timeUntilNextClaim(msg.sender);
        if (timeRemaining > 0) {
            revert FaucetCooldownActive(timeRemaining);
        }

        lastClaimed[msg.sender] = block.timestamp;
        _mint(msg.sender, FAUCET_AMOUNT);

        emit FaucetClaimed(msg.sender, FAUCET_AMOUNT);
    }

    /// @notice Checks if an address can claim from the faucet
    /// @param user The address to check
    /// @return True if the user can claim, false otherwise
    function canClaimFaucet(address user) external view returns (bool) {
        return timeUntilNextClaim(user) == 0;
    }

    /// @notice Returns the time remaining until next faucet claim
    /// @param user The address to check
    /// @return Time in seconds until next claim (0 if can claim now)
    function timeUntilNextClaim(address user) public view returns (uint256) {
        uint256 lastClaim = lastClaimed[user];
        if (lastClaim == 0) {
            return 0; // Never claimed before
        }

        uint256 timePassed = block.timestamp - lastClaim;
        if (timePassed >= FAUCET_COOLDOWN) {
            return 0;
        }

        return FAUCET_COOLDOWN - timePassed;
    }
}