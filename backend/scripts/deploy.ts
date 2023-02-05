import { ethers } from "hardhat";
import { Overrides } from "ethers";

/**
 * deploy function
 */
async function deploy() {
  const [deployer] = await ethers.getSigners();

  const fund = ethers.utils.parseEther("200");

  const Bank = await ethers.getContractFactory("Bank");
  const bank = await Bank.deploy({
    value: fund,
  } as Overrides);
  await bank.deployed();

  console.log("bank address:", bank.address);
  console.log("deployer address:", deployer.address);
}

deploy()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });