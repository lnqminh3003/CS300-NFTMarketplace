const token = artifacts.require("AuraSkyNFT");

module.exports = function (deployer) {
  deployer.deploy(token);
};
