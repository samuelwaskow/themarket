require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");

require("./tasks/faucet");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  gasReporter: {
    enabled: false
  }
};
