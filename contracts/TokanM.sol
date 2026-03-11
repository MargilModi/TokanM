// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title TokanM Token
/// @notice ERC20 token with minting (owner only) and burning capabilities.
contract TokanM is ERC20, ERC20Burnable, Ownable {
    /// @notice Deploys the contract, mints the initial supply to the deployer.
    /// @param initialSupply Total tokens to mint at deployment (in whole tokens, not wei).
    constructor(uint256 initialSupply) ERC20("TokanM Token", "TM") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    /// @notice Allows the owner to mint additional tokens.
    /// @param to Recipient address.
    /// @param amount Number of tokens to mint (in whole tokens, not wei).
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount * 10 ** decimals());
    }
}
