const { ethers } = require("hardhat")

const networkConfig = {
    80001: {
        name: "mumbai",
        percentCut:"300"
    },
    31337: {
        name: "hardhat",percentCut:"300"
    },
    5: {
        name: "goerli",percentCut:"300"
    },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = { networkConfig, developmentChains }
