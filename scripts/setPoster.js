const { ethers } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")
const { getContract, getSigners, getContractAt } = ethers
let deployer, host

const chainId = network.config.chainId
const poster = networkConfig[chainId]["poster"]

const main = async () => {
    deployer = (await getSigners())[0]
    host = (await getSigners())[1]
    const partyFactory = await getContract("PartyFactory", deployer)
    const partyAddress = (await partyFactory.getParties(host.address))[0]
    const party = await getContractAt("Party", partyAddress)
    const tx = await party.setPoster(poster)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
