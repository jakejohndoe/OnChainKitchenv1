// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title StakedSeedToken
/// @notice Receipt token representing staked SEED tokens in the garden
/// @dev This token proves that a user has staked SEED tokens
contract StakedSeedToken is ERC20, AccessControl {
    /// @notice Role that can mint new sSEED tokens
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    /// @notice Role that can burn sSEED tokens
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    /// @notice Creates the StakedSeedToken contract
    /// @param admin The address that will have admin role
    constructor(address admin) ERC20("Staked Seed", "sSEED") {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    /// @notice Mints sSEED tokens to an address
    /// @param to The address to mint tokens to
    /// @param amount The amount of tokens to mint
    /// @dev Only callable by addresses with MINTER_ROLE
    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    /// @notice Burns sSEED tokens from an address
    /// @param from The address to burn tokens from
    /// @param amount The amount of tokens to burn
    /// @dev Only callable by addresses with BURNER_ROLE
    function burn(address from, uint256 amount) external onlyRole(BURNER_ROLE) {
        _burn(from, amount);
    }

    /// @notice Grants both minter and burner roles to an address
    /// @param account The address to grant roles to
    /// @dev Only callable by admin
    function grantMinterBurnerRoles(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MINTER_ROLE, account);
        _grantRole(BURNER_ROLE, account);
    }

    /// @notice Revokes both minter and burner roles from an address
    /// @param account The address to revoke roles from
    /// @dev Only callable by admin
    function revokeMinterBurnerRoles(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _revokeRole(MINTER_ROLE, account);
        _revokeRole(BURNER_ROLE, account);
    }
}