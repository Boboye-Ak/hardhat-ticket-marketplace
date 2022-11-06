const { ethers } = require("hardhat")

const networkConfig = {
    80001: {
        name: "mumbai",
        percentCut: "300",
        partyName: "PlayStation Party",
        symbol: "MBP",
        maxAttendees: "20",
        cost: ethers.utils.parseEther("0.01"),
        poster: "ipfs://bafyreib2opouc42mekdspe27imz6dflxup5tjzvslpfmofg5ugetohirca/metadata.json",
    },
    31337: {
        name: "hardhat",
        percentCut: "300",
        partyName: "PlayStation Party",
        symbol: "MBP",
        maxAttendees: "20",
        cost: ethers.utils.parseEther("0.01"),
        poster: "ipfs://bafyreib2opouc42mekdspe27imz6dflxup5tjzvslpfmofg5ugetohirca/metadata.json",
    },
    5: {
        name: "goerli",
        percentCut: "300",
        partyName: "PlayStation Party",
        symbol: "MBP",
        maxAttendees: "20",
        cost: ethers.utils.parseEther("0.01"),
        poster: "ipfs://bafyreib2opouc42mekdspe27imz6dflxup5tjzvslpfmofg5ugetohirca/metadata.json",
    },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = { networkConfig, developmentChains }
