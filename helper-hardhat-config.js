const { ethers } = require("hardhat")

const networkConfig = {
    80001: {
        name: "mumbai",
        percentCut: "300",
        partyName: "MainlandBlockParty",
        symbol: "MBP",
        maxAttendees: "1000",cost:ethers.utils.parseEther("0.01")
    },
    31337: {
        name: "hardhat",
        percentCut: "300",
        partyName: "MainlandBlockParty",
        symbol: "MBP",
        maxAttendees: "1000",cost:ethers.utils.parseEther("0.01")
    },
    5: {
        name: "goerli",
        percentCut: "300",
        partyName: "MainlandBlockParty",
        symbol: "MBP",
        maxAttendees: "1000",cost:ethers.utils.parseEther("0.01")
    },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = { networkConfig, developmentChains }
