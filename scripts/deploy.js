const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying TokanM with account:", deployer.address);

  const TokanM = await ethers.getContractFactory("TokanM");
  const token = await TokanM.deploy(deployer.address);
  await token.waitForDeployment();

  console.log("TokanM deployed to:", await token.getAddress());
  console.log("Total supply:", ethers.formatEther(await token.totalSupply()), "TM");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
