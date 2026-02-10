// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./SeedStaking.sol";
import "./StakedSeedToken.sol";
import "./Greenhouse.sol";

/// @title GardenDeposit
/// @notice Main entry point for the DeFi Garden - handles deposits and vault management
/// @dev Users deposit SEED, receive sSEED, and optionally auto-compound in Greenhouse
contract GardenDeposit is Ownable, ReentrancyGuard {
    IERC20 public immutable seedToken;
    SeedStaking public immutable staking;
    StakedSeedToken public immutable sSeedToken;
    IGreenhouse public greenhouse;

    /// @notice Emitted when user deposits SEED
    event Deposited(address indexed user, uint256 amount, bool compound);

    /// @notice Emitted when user redeems sSEED for SEED
    event Redeemed(address indexed user, uint256 sSeedAmount, uint256 seedAmount);

    /// @notice Emitted when rewards are harvested
    event Harvested(address indexed user, uint256 rewards);

    /// @notice Emitted when greenhouse vault is set
    event GreenhouseSet(address indexed greenhouse);

    /// @notice Thrown when trying to deposit zero amount
    error ZeroAmount();

    /// @notice Thrown when user has insufficient sSEED balance
    error InsufficientBalance();

    /// @notice Thrown when greenhouse is not set
    error GreenhouseNotSet();

    /// @notice Creates the GardenDeposit contract
    /// @param _seedToken The SEED token contract
    /// @param _staking The staking contract
    /// @param _greenhouse The greenhouse vault (can be zero initially)
    /// @param _sSeedToken The staked seed token contract
    constructor(
        IERC20 _seedToken,
        SeedStaking _staking,
        IGreenhouse _greenhouse,
        StakedSeedToken _sSeedToken
    ) Ownable(msg.sender) {
        seedToken = _seedToken;
        staking = _staking;
        greenhouse = _greenhouse;
        sSeedToken = _sSeedToken;
    }

    /// @notice Sets the greenhouse vault address
    /// @param _greenhouse The greenhouse vault contract
    function setVault(IGreenhouse _greenhouse) external onlyOwner {
        greenhouse = _greenhouse;
        emit GreenhouseSet(address(_greenhouse));
    }

    /// @notice Deposits SEED tokens and optionally compounds in greenhouse
    /// @param amount The amount of SEED tokens to deposit
    /// @param receiver The address to receive sSEED or vault shares
    /// @param compound Whether to auto-compound in the greenhouse vault
    /// @return shares The amount of sSEED minted (or vault shares if compounding)
    function deposit(uint256 amount, address receiver, bool compound) external nonReentrant returns (uint256 shares) {
        if (amount == 0) revert ZeroAmount();

        // Transfer SEED from user
        seedToken.transferFrom(msg.sender, address(this), amount);

        // Approve and stake in the staking contract
        seedToken.approve(address(staking), amount);
        staking.stake(amount);

        // Mint sSEED 1:1 with staked SEED
        if (compound && address(greenhouse) != address(0)) {
            // Mint sSEED to this contract temporarily
            sSeedToken.mint(address(this), amount);

            // Approve greenhouse to take sSEED
            sSeedToken.approve(address(greenhouse), amount);

            // Deposit sSEED into greenhouse vault on behalf of receiver
            shares = greenhouse.deposit(amount, receiver);
        } else {
            // Mint sSEED directly to receiver
            sSeedToken.mint(receiver, amount);
            shares = amount;
        }

        emit Deposited(msg.sender, amount, compound);
        return shares;
    }

    /// @notice Harvests rewards from staking and reinvests them
    /// @return rewards The amount of rewards harvested
    function harvest() external nonReentrant returns (uint256 rewards) {
        // Get current earned amount
        uint256 earned = staking.earned(address(this));

        if (earned > 0) {
            // Claim rewards
            staking.getReward();

            // For simplicity, just stake the rewards again to earn more rewards
            // This effectively compounds the rewards in the staking contract
            seedToken.approve(address(staking), earned);
            staking.stake(earned);

            rewards = earned;
            emit Harvested(msg.sender, rewards);
        }

        return rewards;
    }

    /// @notice Redeems sSEED for underlying SEED tokens
    /// @param amount The amount of sSEED to redeem
    /// @return seedAmount The amount of SEED received
    function redeem(uint256 amount) external nonReentrant returns (uint256 seedAmount) {
        if (amount == 0) revert ZeroAmount();
        if (sSeedToken.balanceOf(msg.sender) < amount) revert InsufficientBalance();

        // Burn user's sSEED tokens
        sSeedToken.burn(msg.sender, amount);

        // Withdraw from staking (1:1 with sSEED)
        staking.withdraw(amount);

        // Transfer SEED to user
        seedToken.transfer(msg.sender, amount);

        emit Redeemed(msg.sender, amount, amount);
        return amount;
    }

    /// @notice Returns the total SEED balance in the staking contract
    /// @return The total staked SEED amount
    function totalStaked() external view returns (uint256) {
        return staking.totalSupply();
    }

    /// @notice Returns earned rewards in the staking contract
    /// @return The amount of rewards earned by this contract
    function earnedRewards() external view returns (uint256) {
        return staking.earned(address(this));
    }
}