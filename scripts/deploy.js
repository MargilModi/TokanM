const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying TokanM with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  const TokanM = await ethers.getContractFactory("TokanM");
  const tokanM = await TokanM.deploy();
  await tokanM.waitForDeployment();

  const address = await tokanM.getAddress();
  console.log("TokanM deployed to:", address);

  const totalSupply = await tokanM.totalSupply();
  console.log("Total supply:", ethers.formatUnits(totalSupply, 18), "TM");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
