const { ethers } = require("hardhat");

async function main() {
  // We get the contract to deploy
  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();

  await voting.waitForDeployment();

  console.log("Voting deployed to:", await voting.target);
  await run('verify:verify',{
    address:voting.target
  });
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });