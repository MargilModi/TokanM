// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokanM is ERC20 {
    constructor() ERC20("TokanM Token", "TM") {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }
}
