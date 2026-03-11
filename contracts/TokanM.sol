// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title TokanM Token
/// @notice ERC20 token with a fixed supply minted to the deployer
contract TokanM is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10 ** 18;

    constructor() ERC20("TokanM Token", "TM") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
