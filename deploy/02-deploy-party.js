const { ethers, network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { getSigners } = ethers

module.exports = async ({ deployments, getNamedAccounts }) => {
    const { deploy, log } = deployments
    const host = (await getSigners())[1]
    const chainId = network.config.chainId
    const partyFactory = await ethers.getContract("PartyFactory", host)
    const percentCut = networkConfig[chainId]["percentCut"]
    const partyName = networkConfig[chainId]["partyName"]
    const symbol = networkConfig[chainId]["symbol"]
    const cost = networkConfig[chainId]["cost"]
    const maxAttendees = networkConfig[chainId]["maxAttendees"]
    const args = [
        partyName,
        symbol,
        maxAttendees,
        cost,
        host.address,
        partyFactory.address,
        percentCut,
    ]

    log(`----------sending deployment transaction for party from ${host.address}-----------`)
    const tx = await partyFactory.createParty(partyName, symbol, maxAttendees, cost)
    const txReceipt = await tx.wait(1)
    const partyAddress = (await partyFactory.getParties(host.address))[0]
    log(`----------party deployed with address ${partyAddress}----------`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        console.log("Verifying...")
        await verify(partyAddress, args)
    }
    log("----------------------------- ")
}

module.exports.tags=["all", "deployment", "deploy-party"]
