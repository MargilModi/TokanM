# TokanM

An ERC20 token project built with [Hardhat](https://hardhat.org/) and [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/).

## Token Details

| Property     | Value          |
|--------------|----------------|
| **Name**     | TokanM Token   |
| **Symbol**   | TM             |
| **Supply**   | 1,000,000 TM   |
| **Decimals** | 18             |

## Prerequisites

- [Node.js](https://nodejs.org/) v16 or later
- npm v7 or later

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/MargilModi/TokanM.git
   cd TokanM
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and fill in your PRIVATE_KEY and SEPOLIA_RPC_URL
   ```

4. **Compile the contract**
   ```bash
   npm run compile
   # or: npx hardhat compile
   ```

5. **Run tests**
   ```bash
   npm test
   # or: npx hardhat test
   ```

## Deployment

### Local (Hardhat Network)

```bash
npx hardhat node          # start a local node in a separate terminal
npm run deploy:local      # deploy to localhost
```

### Sepolia Testnet

```bash
npm run deploy:testnet
```

Make sure `PRIVATE_KEY` and `SEPOLIA_RPC_URL` are set in your `.env` file before deploying to a testnet.

## Project Structure

```
TokanM/
├── contracts/
│   └── TokanM.sol        # ERC20 token contract
├── scripts/
│   └── deploy.js         # Deployment script
├── test/
│   └── TokanM.test.js    # Test suite
├── .env.example          # Environment variable template
├── .gitignore
├── hardhat.config.js     # Hardhat configuration
└── package.json
```

## Troubleshooting

**`npm error enoent Could not read package.json`**  
Your local folder is missing required project files. First try pulling the latest version:
```bash
git pull origin main
npm install
```
If `git pull` fails (e.g. network/firewall issue), see the **[Manual File Creation](#manual-file-creation-network-blocked-fallback)** section below.

**`fatal: unable to access … Failed to connect to github.com port 443`**  
Your machine cannot reach GitHub. Follow the **[Manual File Creation](#manual-file-creation-network-blocked-fallback)** section below to recreate all files by hand, then run `npm install` once your firewall/VPN allows outbound npm access.

**`error: The following untracked working tree files would be overwritten by checkout: package-lock.json`**  
A stale `package-lock.json` exists in your working tree from a previous run. Delete it and retry:
```bash
# Windows
del package-lock.json

# macOS / Linux
rm package-lock.json
```

---

## Manual File Creation (Network-Blocked Fallback)

If you cannot `git clone` or `git pull` due to network issues, create each file below by hand inside your `TokanM` folder.

### `package.json`

```json
{
  "name": "tokanm",
  "version": "1.0.0",
  "description": "ERC20 Token using Hardhat and OpenZeppelin",
  "scripts": {
    "compile": "hardhat compile",
    "test": "hardhat test",
    "deploy:local": "hardhat run scripts/deploy.js --network localhost",
    "deploy:testnet": "hardhat run scripts/deploy.js --network sepolia"
  },
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox": "^2.0.2",
    "hardhat": "^2.17.2"
  },
  "dependencies": {
    "@openzeppelin/contracts": "^4.9.3",
    "dotenv": "^16.0.3"
  }
}
```

### `hardhat.config.js`

```js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
};
```

### `contracts/TokanM.sol`

Create the `contracts` folder first, then save this file as `contracts/TokanM.sol`:

```solidity
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
```

### `scripts/deploy.js`

Create the `scripts` folder first, then save this file as `scripts/deploy.js`:

```js
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying TokanM with account:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance), "ETH");

  const TokanM = await ethers.getContractFactory("TokanM");
  const tokanM = await TokanM.deploy();
  await tokanM.deployed();

  console.log("TokanM deployed to:", tokanM.address);
  console.log(
    "Total supply:",
    ethers.utils.formatUnits(await tokanM.totalSupply(), 18),
    "TM"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### `test/TokanM.test.js`

Create the `test` folder first, then save this file as `test/TokanM.test.js`:

```js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokanM", function () {
  let tokanM;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const TokanM = await ethers.getContractFactory("TokanM");
    tokanM = await TokanM.deploy();
    await tokanM.deployed();
  });

  describe("Deployment", function () {
    it("Should set the correct token name and symbol", async function () {
      expect(await tokanM.name()).to.equal("TokanM Token");
      expect(await tokanM.symbol()).to.equal("TM");
    });

    it("Should mint the total supply to the owner", async function () {
      const totalSupply = await tokanM.totalSupply();
      expect(await tokanM.balanceOf(owner.address)).to.equal(totalSupply);
    });

    it("Should have an initial supply of 1,000,000 TM", async function () {
      const expected = ethers.utils.parseUnits("1000000", 18);
      expect(await tokanM.totalSupply()).to.equal(expected);
    });
  });

  describe("Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      const amount = ethers.utils.parseUnits("100", 18);
      await tokanM.transfer(addr1.address, amount);
      expect(await tokanM.balanceOf(addr1.address)).to.equal(amount);
    });

    it("Should fail if sender does not have enough tokens", async function () {
      const amount = ethers.utils.parseUnits("1", 18);
      await expect(
        tokanM.connect(addr1).transfer(addr2.address, amount)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    });

    it("Should update balances after transfers", async function () {
      const amount = ethers.utils.parseUnits("50", 18);
      const initialOwnerBalance = await tokanM.balanceOf(owner.address);

      await tokanM.transfer(addr1.address, amount);
      await tokanM.connect(addr1).transfer(addr2.address, amount);

      expect(await tokanM.balanceOf(owner.address)).to.equal(
        initialOwnerBalance.sub(amount)
      );
      expect(await tokanM.balanceOf(addr1.address)).to.equal(0);
      expect(await tokanM.balanceOf(addr2.address)).to.equal(amount);
    });
  });
});
```

### `.env.example`

```
PRIVATE_KEY=your_private_key_here
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your_api_key_here
```

### `.gitignore`

```
node_modules/
artifacts/
cache/
coverage/
coverage.json
typechain/
typechain-types/

.env

*.log

package-lock.json
```

### After creating the files

Once all files above exist in your `TokanM` folder, run:

```bash
npm install
npx hardhat compile
npx hardhat test
```

## Learning Resources

- [Ethereum Documentation](https://ethereum.org/en/developers/docs/)
- [Hardhat Docs](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Solidity Docs](https://docs.soliditylang.org/)
