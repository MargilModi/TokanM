const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying TokanM with account:", deployer.address);
  console.log(
    "Account balance:",
    ethers.utils.formatEther(await deployer.getBalance()),
    "ETH"
  );

  const TokanM = await ethers.getContractFactory("TokanM");
  const token = await TokanM.deploy();
  await token.deployed();

  console.log("TokanM deployed to:", token.address);
  console.log(
    "Total supply:",
    ethers.utils.formatUnits(await token.totalSupply(), 18),
    "TM"
  );
  console.log("Owner:", await token.owner());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });