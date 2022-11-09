const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config.js")
const { verify } = require("../utils/verify.js")

module.exports = async (hre) => {
    const { getNamedAccounts, deployments } = hre
    const { deployer } = await getNamedAccounts()
    const { log, deploy } = deployments
    const chainId = network.config.chainId
    const percentCut = networkConfig[chainId]["percentCut"]
    const args = [percentCut]
    const partyFactory = await deploy("PartyFactory", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`PartyFactory address is ${partyFactory.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        console.log("Verifying...")
        await verify(partyFactory.address, args)
    }
    log("----------------------------- ")
}

module.exports.tags = ["all", "deployment", "deploy-partyfactory"]
