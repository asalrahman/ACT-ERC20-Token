require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")

require("solidity-coverage")
require("hardhat-gas-reporter")

require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */


const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP = process.env.COINMARKETCAP

module.exports = {
  solidity: "0.8.0",
  defaultNetwork:"hardhat",

  networks:{
    hardhat:{
       chainId:31337,
    },
    sepolia:{
      url:SEPOLIA_RPC_URL,
      accounts:[PRIVATE_KEY],
      chainId:11155111,
      saveDeployments: true,
      blockconfirmations:6,
    }
  
  },
  gasReporter: {
    enabled:false,
    outputFile:"gasReporter.txt",
    noColors:true,
    currency:"USD",
    coinmarketcap:COINMARKETCAP,
    token:"ETH"
  },
  etherscan: {
    // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
        sepolia: ETHERSCAN_API_KEY,
    },},
    namedAccounts: {
      deployer: {
          default: 0,
      },
      user1: {
          default: 1,
      },
  },
  
};
