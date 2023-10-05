const token = artifacts.require("SeazleNFT");

module.exports = function (deployer) {
  deployer.deploy(token);
};
