var AssetList = artifacts.require("./AssetList.sol");

module.exports = function(deployer) {
  deployer.deploy(AssetList);
};