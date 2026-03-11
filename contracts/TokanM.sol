// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TokanM
 * @dev ERC20 token with a fixed initial supply minted to the deployer.
 */
contract TokanM is ERC20, Ownable {
    /**
     * @dev Mints the full initial supply of 1,000,000 TM to the deployer.
     * @param initialOwner The address that will receive the initial supply and contract ownership.
     */
    constructor(address initialOwner)
        ERC20("TokanM Token", "TM")
        Ownable(initialOwner)
    {
        _mint(initialOwner, 1_000_000 * 10 ** decimals());
    }
}
