// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title TokanM
 * @dev ERC20 token with a fixed initial supply minted to the deployer.
 */
contract TokanM is ERC20 {
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10 ** 18;

    constructor() ERC20("TokanM Token", "TM") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
