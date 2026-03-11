const hre = require("hardhat");

async function main() {
  const tokanM = await hre.ethers.deployContract("TokanM");
  await tokanM.waitForDeployment();

  console.log(`TokanM deployed to ${tokanM.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
