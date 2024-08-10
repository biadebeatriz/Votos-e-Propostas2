require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

require("dotenv").config();

const QUICKNODE_HTTP_URL = process.env.QUICKNODE_HTTP_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETERSCANKEY= process.env.ETERSCANKEY;

module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url:'https://eth-sepolia.g.alchemy.com/v2/z77E3uqkkHuof-Gps-ChQqDGiJe-iiqV',
      accounts:['eb6ecc2e762bf6b4a06ce51ec196a3bcf83cc0b511419a291312d89bdb71d888'],
      chainId:11155111
    },
  },
  etherscan: {
    apiKey: {
      sepolia:"K1ZRJHZBPYIRWZHN6RH18TX2PIU24EYYUP" ,
      chainId:11155111
    }

  }

};