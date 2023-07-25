const { network } = require("hardhat");
const { networkConfig, developmentChains, initialSupply } = require("../helepers-hardhat.config");
const { verify } = require("../verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  // If chainId is 31337, use the localhost address
  // If chainId is 11155111, use the sepolia address
  let ethUsdPriceFeedAddress;
  if (chainId == 31337) {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  } else if (chainId == 11155111) {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  } else {
    throw new Error("Unsupported chainId");
  }

  log("Deploying ActToken and waiting for confirmations...");
  const args = [initialSupply];
  const actToken = await deploy("ActToken", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  log(`ActToken deployed at ${actToken.address}`);
  
  // Verification
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(actToken.address, args);
  }
};

module.exports.tags = ["all", "actToken"];