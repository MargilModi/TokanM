# TokanM

An ERC20 token project built with [Hardhat](https://hardhat.org/) and [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/).

## Token Details

| Property      | Value           |
|---------------|-----------------|
| **Name**      | TokanM Token    |
| **Symbol**    | TM              |
| **Decimals**  | 18              |
| **Supply**    | 1,000,000 TM (minted to deployer at launch) |

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [npm](https://www.npmjs.com/) v9 or later

## Installation

```bash
git clone https://github.com/MargilModi/TokanM.git
cd TokanM
npm install
```

## Compile

```bash
npx hardhat compile
```

## Run Tests

```bash
npx hardhat test
```

## Local Deployment

Start a local Hardhat node in one terminal:

```bash
npx hardhat node
```

Then deploy in a second terminal:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

## Testnet Deployment (Sepolia)

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

4. (Optional) Verify on Etherscan (pass the initial supply as a constructor argument):

   ```bash
   npx hardhat verify --network sepolia <DEPLOYED_CONTRACT_ADDRESS> 1000000
   ```

## Project Structure

```
TokanM/
├── contracts/
│   └── TokanM.sol       # ERC20 token contract
├── scripts/
│   └── deploy.js        # Deployment script
├── test/
│   └── test.js          # Unit tests
├── .env.example         # Example environment variables
├── hardhat.config.js    # Hardhat configuration
└── package.json
```

## Learning Resources

- [Hardhat Documentation](https://hardhat.org/getting-started/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Solidity Documentation](https://soliditylang.org/docs/)
- [Ethereum Developer Docs](https://ethereum.org/en/developers/docs/)
