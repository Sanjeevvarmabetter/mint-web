require("@nomicfoundation/hardhat-toolbox");

const dotenv = require("dotenv");

dotenv.config();


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: process.env.REACT_APP_SEPOLINA_RPC_URL,
      account: [process.env.REACT_APP_PRIVATE_KEY],
    },
  },

  etherscan: {
    apikey: process.env.REACT_APP_ETHERSCAN_KEY,
  },
};
