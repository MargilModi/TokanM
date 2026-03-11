# TokanM

An ERC20 token smart contract built with [Hardhat](https://hardhat.org/) and [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/).

## Token Details

| Property     | Value           |
|-------------|-----------------|
| Name        | TokanM Token    |
| Symbol      | TM              |
| Total Supply | 1,000,000 TM   |
| Decimals    | 18              |

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)
- Git

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/MargilModi/TokanM.git
cd TokanM
```

### 2. Install dependencies

```bash
npm install
```

### 3. Compile the contract

```bash
npx hardhat compile
```

### 4. Run tests

```bash
npx hardhat test
```

## Deployment

### Deploy to a local Hardhat node

Open one terminal and start a local blockchain:

```bash
npx hardhat node
```

In a second terminal, deploy the contract:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Deploy to Sepolia testnet

1. Copy the example environment file and fill in your values:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env`:

   ```
   PRIVATE_KEY=your_wallet_private_key
   SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your_project_id
   ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

3. Deploy:

   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

4. (Optional) Verify on Etherscan:

   ```bash
   npx hardhat verify --network sepolia <DEPLOYED_CONTRACT_ADDRESS>
   ```

## Project Structure

```
TokanM/
├── contracts/
│   └── TokanM.sol        # ERC20 token contract
├── scripts/
│   └── deploy.js         # Deployment script
├── test/
│   └── TokanM.test.js    # Contract tests
├── .env.example          # Environment variable template
├── .gitignore
├── hardhat.config.js     # Hardhat configuration
└── package.json
```

## Learning Resources

- [Ethereum Documentation](https://ethereum.org/en/developers/docs/)
- [Hardhat Docs](https://hardhat.org/getting-started/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Solidity Docs](https://soliditylang.org/docs/)
