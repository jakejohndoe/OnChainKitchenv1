// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title KitchenToken
/// @notice A tutorial ERC-20 token with a public faucet for learning purposes
/// @dev This token is designed for educational use on Sepolia testnet only
contract KitchenToken is ERC20 {
    /// @notice Amount of tokens distributed per faucet claim
    uint256 public constant FAUCET_AMOUNT = 100 * 10**18; // 100 tokens

    /// @notice Cooldown period between faucet claims per address
    uint256 public constant FAUCET_COOLDOWN = 24 hours;

    /// @notice Tracks the last faucet claim timestamp for each address
    mapping(address => uint256) public lastFaucetClaim;

    /// @notice Emitted when a user claims tokens from the faucet
    /// @param user The address that claimed tokens
    /// @param amount The amount of tokens claimed
    event FaucetClaimed(address indexed user, uint256 amount);

    /// @notice Thrown when trying to claim faucet before cooldown expires
    /// @param timeRemaining Seconds remaining until next claim is allowed
    error FaucetCooldownActive(uint256 timeRemaining);

    /// @notice Creates the KitchenToken contract
    constructor() ERC20("KitchenToken", "KITCHEN") {}

    /// @notice Claims free tokens from the faucet
    /// @dev Can only be called once every 24 hours per address
    function faucet() external {
        uint256 timeRemaining = timeUntilNextClaim(msg.sender);
        if (timeRemaining > 0) {
            revert FaucetCooldownActive(timeRemaining);
        }

        lastFaucetClaim[msg.sender] = block.timestamp;
        _mint(msg.sender, FAUCET_AMOUNT);

        emit FaucetClaimed(msg.sender, FAUCET_AMOUNT);
    }

    /// @notice Checks if an address can claim from the faucet
    /// @param user The address to check
    /// @return True if the user can claim, false otherwise
    function canClaimFaucet(address user) external view returns (bool) {
        return timeUntilNextClaim(user) == 0;
    }

    /// @notice Returns seconds until the next faucet claim is allowed
    /// @param user The address to check
    /// @return Seconds remaining (0 if can claim now)
    function timeUntilNextClaim(address user) public view returns (uint256) {
        uint256 lastClaim = lastFaucetClaim[user];
        if (lastClaim == 0) {
            return 0; // Never claimed before, can claim now
        }

        uint256 timeSinceLastClaim = block.timestamp - lastClaim;
        if (timeSinceLastClaim >= FAUCET_COOLDOWN) {
            return 0; // Cooldown expired, can claim now
        }

        return FAUCET_COOLDOWN - timeSinceLastClaim;
    }
}