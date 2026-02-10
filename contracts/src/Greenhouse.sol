// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IGreenhouse {
    function deposit(uint256 assets, address receiver) external returns (uint256 shares);
    function notifyRewardAmount(uint256 reward) external;
}

/// @title Greenhouse
/// @notice Simple ERC-4626 vault for holding sSEED tokens
/// @dev Auto-compounding happens at the staking level, this vault just holds sSEED
contract Greenhouse is ERC4626, Ownable, ReentrancyGuard, IGreenhouse {

    /// @notice Creates the Greenhouse vault
    /// @param _asset The underlying asset (sSEED token)
    /// @param _name The name of the vault token
    /// @param _symbol The symbol of the vault token
    constructor(
        IERC20 _asset,
        string memory _name,
        string memory _symbol
    ) ERC4626(_asset) ERC20(_name, _symbol) Ownable(msg.sender) {
    }

    /// @notice Deposits assets for shares
    /// @param assets Amount of assets to deposit
    /// @param receiver Address to receive shares
    /// @return shares Amount of shares minted
    function deposit(uint256 assets, address receiver)
        public
        override(ERC4626, IGreenhouse)
        nonReentrant
        returns (uint256 shares)
    {
        return super.deposit(assets, receiver);
    }

    /// @notice Mints shares for assets
    /// @param shares Amount of shares to mint
    /// @param receiver Address to receive shares
    /// @return assets Amount of assets deposited
    function mint(uint256 shares, address receiver)
        public
        override
        nonReentrant
        returns (uint256 assets)
    {
        return super.mint(shares, receiver);
    }

    /// @notice Redeems shares for assets
    /// @param shares Amount of shares to redeem
    /// @param receiver Address to receive assets
    /// @param owner Address that owns the shares
    /// @return assets Amount of assets received
    function redeem(uint256 shares, address receiver, address owner)
        public
        override
        nonReentrant
        returns (uint256 assets)
    {
        return super.redeem(shares, receiver, owner);
    }

    /// @notice Withdraws assets for shares
    /// @param assets Amount of assets to withdraw
    /// @param receiver Address to receive assets
    /// @param owner Address that owns the shares
    /// @return shares Amount of shares burned
    function withdraw(uint256 assets, address receiver, address owner)
        public
        override
        nonReentrant
        returns (uint256 shares)
    {
        return super.withdraw(assets, receiver, owner);
    }

    /// @notice No-op function to maintain interface compatibility
    /// @param reward Unused parameter
    function notifyRewardAmount(uint256 reward) external {
        // This function is kept for interface compatibility
        // but does nothing since auto-compounding happens at staking level
        reward; // Silence unused variable warning
    }
}