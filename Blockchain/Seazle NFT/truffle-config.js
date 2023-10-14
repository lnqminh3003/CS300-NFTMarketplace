
const HDWalletProvider = require("@truffle/hdwallet-provider");
 
const mnemonic = require("./secrets.json").mnemonic;

module.exports = {
  networks: {
    bsc: {
      provider: () =>
        new HDWalletProvider(mnemonic, "https://bsc-dataseed.binance.org/"),
      network_id: 56,
      skipDryRun: true,
    },
    testnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://floral-fluent-needle.bsc-testnet.quiknode.pro/b488701420b4a082279df007a6275836c1883a64/`),
      network_id: 97,
      skipDryRun: true,
      networkCheckTimeout: 10000,
      timeoutBlocks: 200
    },
  },

  mocha: {

  },
  compilers: {
    solc: {
      version: "0.8.20" 
    }
  }
};
