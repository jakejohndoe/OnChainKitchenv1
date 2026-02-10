// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title SeedStaking
/// @notice Synthetix-style staking contract for SEED tokens
/// @dev Distributes rewards proportionally over a fixed duration
contract SeedStaking is Ownable, ReentrancyGuard {
    IERC20 public immutable seedToken;

    /// @notice Duration over which rewards are distributed (24 hours)
    uint256 public constant rewardsDuration = 86400;

    /// @notice Timestamp when current reward period ends
    uint256 public periodFinish = 0;

    /// @notice Reward rate per second
    uint256 public rewardRate = 0;

    /// @notice Timestamp when rewards were last updated
    uint256 public lastUpdateTime;

    /// @notice Accumulated reward per token stored
    uint256 public rewardPerTokenStored;

    /// @notice Total amount of staked tokens
    uint256 public totalSupply;

    /// @notice User's reward per token paid
    mapping(address => uint256) public userRewardPerTokenPaid;

    /// @notice User's earned rewards
    mapping(address => uint256) public rewards;

    /// @notice User's staked balance
    mapping(address => uint256) public balances;

    /// @notice Emitted when user stakes tokens
    event Staked(address indexed user, uint256 amount);

    /// @notice Emitted when user withdraws tokens
    event Withdrawn(address indexed user, uint256 amount);

    /// @notice Emitted when user claims rewards
    event RewardPaid(address indexed user, uint256 reward);

    /// @notice Emitted when new rewards are added
    event RewardAdded(uint256 reward);

    /// @notice Thrown when trying to stake zero amount
    error ZeroAmount();

    /// @notice Thrown when trying to withdraw more than staked
    error InsufficientBalance();

    /// @notice Creates the SeedStaking contract
    /// @param _seedToken The SEED token contract address
    /// @param _owner The owner of the contract
    constructor(IERC20 _seedToken, address _owner) Ownable(_owner) {
        seedToken = _seedToken;
    }

    /// @notice Updates reward variables
    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = lastTimeRewardApplicable();

        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }

    /// @notice Returns the last time rewards were applicable
    /// @return The last applicable timestamp
    function lastTimeRewardApplicable() public view returns (uint256) {
        return block.timestamp < periodFinish ? block.timestamp : periodFinish;
    }

    /// @notice Returns reward per token
    /// @return The accumulated reward per token
    function rewardPerToken() public view returns (uint256) {
        if (totalSupply == 0) {
            return rewardPerTokenStored;
        }
        return
            rewardPerTokenStored +
            (((lastTimeRewardApplicable() - lastUpdateTime) * rewardRate * 1e18) / totalSupply);
    }

    /// @notice Returns earned rewards for an account
    /// @param account The account to check
    /// @return The amount of earned rewards
    function earned(address account) public view returns (uint256) {
        return
            (balances[account] * (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18 +
            rewards[account];
    }

    /// @notice Stakes SEED tokens
    /// @param amount The amount to stake
    function stake(uint256 amount) external nonReentrant updateReward(msg.sender) {
        if (amount == 0) revert ZeroAmount();

        totalSupply += amount;
        balances[msg.sender] += amount;

        seedToken.transferFrom(msg.sender, address(this), amount);
        emit Staked(msg.sender, amount);
    }

    /// @notice Withdraws staked tokens
    /// @param amount The amount to withdraw
    function withdraw(uint256 amount) public nonReentrant updateReward(msg.sender) {
        if (amount == 0) revert ZeroAmount();
        if (amount > balances[msg.sender]) revert InsufficientBalance();

        totalSupply -= amount;
        balances[msg.sender] -= amount;

        seedToken.transfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }

    /// @notice Claims earned rewards
    function getReward() public nonReentrant updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            seedToken.transfer(msg.sender, reward);
            emit RewardPaid(msg.sender, reward);
        }
    }

    /// @notice Withdraws all tokens and claims rewards
    function exit() external {
        withdraw(balances[msg.sender]);
        getReward();
    }

    /// @notice Notifies contract of reward amount to distribute
    /// @param reward The amount of reward tokens to distribute
    /// @dev Only callable by owner
    function notifyRewardAmount(uint256 reward) external onlyOwner updateReward(address(0)) {
        if (block.timestamp >= periodFinish) {
            rewardRate = reward / rewardsDuration;
        } else {
            uint256 remaining = periodFinish - block.timestamp;
            uint256 leftover = remaining * rewardRate;
            rewardRate = (reward + leftover) / rewardsDuration;
        }

        // Ensure the provided reward amount is not more than the balance in the contract.
        // This keeps the reward rate in the right range, preventing overflows due to
        // very high values of rewardRate in the earned and rewardsPerToken functions;
        // Reward + leftover must be less than 2^256 / 10^18 to avoid overflow.
        uint256 balance = seedToken.balanceOf(address(this));
        require(
            rewardRate <= balance / rewardsDuration,
            "Provided reward too high"
        );

        lastUpdateTime = block.timestamp;
        periodFinish = block.timestamp + rewardsDuration;
        emit RewardAdded(reward);
    }
}