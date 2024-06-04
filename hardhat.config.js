require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

const PRIVATE_KEY_1 = process.env.PRIVATE_KEY_1;
const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2;
const PRIVATE_KEY_3 = '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'
// 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.7",
      },
      {
        version: "0.8.24",
      },
      {
        version: "0.6.12",
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    localhost: {
      url: 'http://127.0.0.1:8545/',
      accounts: [PRIVATE_KEY_3]
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC,
      accounts: [PRIVATE_KEY_1,PRIVATE_KEY_2,PRIVATE_KEY_3]
    },
    assetchain_test: {
      url: "https://rpctestnet.xendrwachain.com",
      accounts: [PRIVATE_KEY_1]
    }
    /* rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/123abc123abc123abc123abc123abcde",
      accounts: [privateKey1, privateKey2, ...]
    } */
  },
  etherscan: {
    apiKey: {
      assetchain_test: "abc"
    },
    customChains: [
      {
        network: "assetchain_test",
        chainId: 42421,
        urls: {
          apiURL: "http://scout.xendrwachain.com/api",
          browserURL: "http://scout.xendrwachain.com/"
        }
      }
    ]
  },
};
