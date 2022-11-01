const { ethers } = require("hardhat")

const networkConfig = {
    80001: {
        name: "mumbai",
        percentCut: "300",
        partyName: "MainlandBlockParty",
        symbol: "MBP",
        maxAttendees: "20",
        cost: ethers.utils.parseEther("0.01"),
        poster: "ipfs://bafybeidj3t7x5vqdpxcscmf7op5f6cbomtcmo2azce2to4sly55rhwh2ai/157851-laptops-review-msi-gf65-thin-gaming-laptop-review-image1-woxqrev7bz.jpg/",
    },
    31337: {
        name: "hardhat",
        percentCut: "300",
        partyName: "MainlandBlockParty",
        symbol: "MBP",
        maxAttendees: "20",
        cost: ethers.utils.parseEther("0.01"),
        poster: "ipfs://bafybeidj3t7x5vqdpxcscmf7op5f6cbomtcmo2azce2to4sly55rhwh2ai/157851-laptops-review-msi-gf65-thin-gaming-laptop-review-image1-woxqrev7bz.jpg/",
    },
    5: {
        name: "goerli",
        percentCut: "300",
        partyName: "MainlandBlockParty",
        symbol: "MBP",
        maxAttendees: "20",
        cost: ethers.utils.parseEther("0.01"),
        poster: "ipfs://bafybeidj3t7x5vqdpxcscmf7op5f6cbomtcmo2azce2to4sly55rhwh2ai/157851-laptops-review-msi-gf65-thin-gaming-laptop-review-image1-woxqrev7bz.jpg/",
    },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = { networkConfig, developmentChains }
