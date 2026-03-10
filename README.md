# TokanM Documentation

## Token Details
- **Name:** TokanM Token
- **Symbol:** TM
- **Total Supply:** 1,000,000 TM
- **Decimals:** 18

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/MargilModi/TokanM.git
   ```
2. Navigate to the project directory:
   ```bash
   cd TokanM
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Deployment Guide
To deploy the TokanM smart contract on Ethereum:
1. Set up a wallet and fund it with Ether.
2. Ensure you have Truffle or Hardhat installed.
3. Configure the `truffle-config.js` or `hardhat.config.js` with your network information.
4. Run the deployment command:
   ```bash
   truffle migrate --network <network_name>
   ```
   or
   ```bash
   npx hardhat run scripts/deploy.js --network <network_name>
   ```

## Usage Examples
After deploying the contract, you can interact with it using:
```javascript
const TokanM = artifacts.require('TokanM');

(async () => {
    const instance = await TokanM.deployed();
    const totalSupply = await instance.totalSupply();
    console.log('Total Supply:', totalSupply.toString());
})();
```

## Learning Resources
- [Ethereum Documentation](https://ethereum.org/en/developers/docs/)
- [Truffle Suite](https://www.trufflesuite.com/docs/truffle/overview)
- [Hardhat](https://hardhat.org/getting-started/#installation)
- [Solidity Docs](https://soliditylang.org/docs/)
