const { ethers } = require("hardhat")
const { getContract, getSigners } = ethers
let deployer

const main = async () => {
    deployer = (await getSigners())[0]
    const partyFactory = await getContract("PartyFactory", deployer)
    const tx = await partyFactory.withdraw()
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
