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
You are on the `main` branch before the project files were added. Run:
```bash
git pull origin main
npm install
```
If `git pull` reports "Already up to date" but `package.json` is still missing, your local branch may be stale. Re-clone the repository:
```bash
git clone https://github.com/MargilModi/TokanM.git
cd TokanM
npm install
```

**`error: The following untracked working tree files would be overwritten by checkout: package-lock.json`**  
A stale `package-lock.json` exists in your working tree from a previous run. Delete it and retry:
```bash
# Windows
del package-lock.json

# macOS / Linux
rm package-lock.json
```

## Learning Resources

- [Ethereum Documentation](https://ethereum.org/en/developers/docs/)
- [Hardhat Docs](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Solidity Docs](https://docs.soliditylang.org/)
