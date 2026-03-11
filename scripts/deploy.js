const hre = require("hardhat");

async function main() {
  const INITIAL_SUPPLY = 1_000_000; // 1,000,000 TM

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const TokanM = await hre.ethers.getContractFactory("TokanM");
  const token = await TokanM.deploy(INITIAL_SUPPLY);
  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log("TokanM deployed to:", address);
  console.log("Initial supply:", INITIAL_SUPPLY.toLocaleString(), "TM");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
