// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// const hre = require("hardhat");


// async function main() {
//   const cyberpunk = await hre.ethers.getContractFactory("cyberpunk");
//   const greeter = await cyberpunk.deploy("hello sanjeev");

//   await greeter.deployed();

//   console.log("cyberpunks deployed to :",greeter.address);
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
const hre = require("hardhat");

async function main() {
  const Cyberpunk = await hre.ethers.getContractFactory("Cyberpunk");
  const cyberpunk = await Cyberpunk.deploy();  // Removed the argument

  await cyberpunk.deployed();

  console.log("Cyberpunk contract deployed to:", cyberpunk.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

