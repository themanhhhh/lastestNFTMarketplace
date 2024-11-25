require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.4",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    }

  },
  hardhat: {
    chainId: 31337,
    // gas: 2100000,
    // gasPrice: 8000000000,
  },
  
};
