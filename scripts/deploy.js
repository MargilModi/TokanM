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
