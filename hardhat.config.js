require("dotenv").config()

require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const DEPLOYER_PRIVATE_KEY = process.env.PRIVATE_KEY
const USER_PRIVATE_KEY = process.env.USER_PRIVATE_KEY
const BENEFICIARY_PRIVATE_KEY = process.env.BENEFICIARY_PRIVATE_KEY
const LOCALHOST_RPC_URL = process.env.LOCALHOST_RPC_URL
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL
module.exports = {
    solidity: "0.8.7",
    networks: {
        ropsten: {
            url: process.env.ROPSTEN_URL || "",
            accounts: [DEPLOYER_PRIVATE_KEY, USER_PRIVATE_KEY, BENEFICIARY_PRIVATE_KEY],
        },
        hardhat: {
            chainId: 31337,
            blockConfirmations: 1,
        },

        rinkeby: {
            chainId: 4,
            blockConfirmations: 6,
            url: RINKEBY_RPC_URL,
            accounts: [DEPLOYER_PRIVATE_KEY, USER_PRIVATE_KEY, BENEFICIARY_PRIVATE_KEY],
        },
        localhost: {
            url: LOCALHOST_RPC_URL,
            chainId: 31337,
        },
        goerli: {
            chainId: 5,
            blockConfirmations: 6,
            url: GOERLI_RPC_URL,
            accounts: [DEPLOYER_PRIVATE_KEY, USER_PRIVATE_KEY, BENEFICIARY_PRIVATE_KEY],
        },
        mumbai: {
            chainId: 80001,
            blockConfirmations: 6,
            url: MUMBAI_RPC_URL,
            accounts: [DEPLOYER_PRIVATE_KEY, USER_PRIVATE_KEY, BENEFICIARY_PRIVATE_KEY],
        },
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0,
            rinkeby: 0,
        },
        fraud: {
            default: 3,
        },
    },
}
