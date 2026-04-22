# TokanM

TokanM is a secure ERC-20 smart contract built using Solidity, Hardhat, and OpenZeppelin.

This project demonstrates real-world token features such as controlled minting, token burning, pausing mechanisms, and role-based access control, along with full automated testing and local blockchain deployment.

---

## Token Details

| Property     | Value        |
| ------------ | ------------ |
| **Name**     | TokanM Token |
| **Symbol**   | TM           |
| **Supply**   | 1,000,000 TM |
| **Decimals** | 18           |

---

## Core Features

* Standard ERC-20 token implementation
* Owner-controlled minting (supply management)
* Token burning (deflationary capability)
* Pause/unpause functionality (emergency control)
* Access control using Ownable
* Fully tested with 12 passing test cases
* Local blockchain deployment and interaction

---

## What This Project Demonstrates

* Secure smart contract development using OpenZeppelin
* Implementation of ERC-20 token standards
* Access control and permission management
* Handling edge cases (paused transfers, unauthorized actions)
* Automated testing using Hardhat
* Deployment and interaction with a local Ethereum blockchain

---

## Tech Stack

* Solidity
* Hardhat
* Ethers.js
* OpenZeppelin Contracts

---

## 🚀 Quick Start (Run Everything Step-by-Step)

### 1. Install dependencies

```bash
npm install
```

### 2. Compile contract

```bash
npx hardhat compile
```

### 3. Run tests

```bash
npx hardhat test
```

---

## 🧪 Run & Deploy Locally

### Step 1: Start local blockchain (KEEP THIS TERMINAL OPEN)

```bash
npx hardhat node
```

### Step 2: Deploy contract (NEW TERMINAL)

```bash
npx hardhat run scripts/deploy.js --network localhost
```

You will see output like:

```
TokanM deployed to: 0x...
```

👉 Copy this contract address.

---

## 🔍 Interact With Contract (Console)

### Step 3: Open console (NEW TERMINAL)

```bash
npx hardhat console --network localhost
```

### Step 4: Attach contract

```javascript
const TokanM = await ethers.getContractFactory("TokanM")
const token = TokanM.attach("PASTE_YOUR_CONTRACT_ADDRESS")
const [owner, addr1, addr2] = await ethers.getSigners()
```

---

## 🧪 Test Commands (Inside Console)

### Check token info

```javascript
await token.name()
await token.symbol()
await token.owner()
```

### Check supply

```javascript
ethers.utils.formatUnits(await token.totalSupply(), 18)
```

### Transfer tokens

```javascript
await token.transfer(addr1.address, ethers.utils.parseUnits("100", 18))
```

### Pause contract

```javascript
await token.pause()
```

### Try transfer (should fail)

```javascript
await token.transfer(addr2.address, ethers.utils.parseUnits("10", 18))
```

### Unpause contract

```javascript
await token.unpause()
```

### Transfer again (should work)

```javascript
await token.transfer(addr2.address, ethers.utils.parseUnits("10", 18))
```

### Burn tokens

```javascript
await token.burn(ethers.utils.parseUnits("50", 18))
```

### Mint tokens (owner only)

```javascript
await token.mint(addr1.address, ethers.utils.parseUnits("500", 18))
```

### Non-owner mint (should fail)

```javascript
await token.connect(addr1).mint(addr2.address, ethers.utils.parseUnits("1", 18))
```

---

## ✅ Example Output

### Deployment

```
Deploying TokanM with account: 0xf39F...
TokanM deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
Total supply: 1000000.0 TM
Owner: 0xf39F...
```

### Test Results

```
12 passing (2s)
```

---

## 📸 Screenshots

Add your screenshots here:

```
screenshots/
├── deploy.png
├── tests.png
├── console.png
```

---

## 🔮 Future Improvements

* Add maximum supply cap
* Introduce transaction fees
* Implement role-based access control (beyond owner)
* Build frontend using React and ethers.js
* Deploy and verify on Sepolia/Etherscan

---

## 📚 Learning Resources

* https://ethereum.org/en/developers/docs/
* https://hardhat.org/docs
* https://docs.openzeppelin.com/contracts/
* https://docs.soliditylang.org/

---

## ⚠️ Notes

* Use Node.js v20 (recommended)
* Hardhat may not work properly with Node 23+
* Never use local private keys on real networks
    