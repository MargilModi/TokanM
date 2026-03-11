# TokanM

An ERC20 token built with [Hardhat](https://hardhat.org/) and [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/).

## Token Details

| Property     | Value           |
|-------------|-----------------|
| Name        | TokanM Token    |
| Symbol      | TM              |
| Total Supply | 1,000,000 TM   |
| Decimals    | 18              |

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [npm](https://www.npmjs.com/) (included with Node.js)
- [Git](https://git-scm.com/)

## Getting Started

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

### Local development network

Start a local Hardhat node in one terminal:

```bash
npx hardhat node
```

Deploy to it in a second terminal:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Testnet (Sepolia)

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Fill in your `PRIVATE_KEY` and `SEPOLIA_RPC_URL` in `.env`.
3. Deploy:
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
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
├── hardhat.config.js     # Hardhat configuration
└── package.json          # Node.js project file
```

## Learning Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Ethereum Documentation](https://ethereum.org/en/developers/docs/)
- [Solidity Docs](https://soliditylang.org/docs/)
