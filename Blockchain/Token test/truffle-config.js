
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

    bscTestnet: {
      provider: () =>
        new HDWalletProvider(mnemonic, "https://data-seed-prebsc-1-s1.binance.org:8545/"),
      network_id: 97,
      skipDryRun: true,
    },
  },

  mocha: {

  },
  compilers: {
    solc: {
      version: "0.5.16" 
    }
  }
};
