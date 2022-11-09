const { ethers } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")
const { getContract, getSigners, getContractAt } = ethers
let deployer, host, guest

const chainId = network.config.chainId
const cost = networkConfig[chainId]["cost"]
module.exports = async () => {
    deployer = (await getSigners())[0]
    host = (await getSigners())[1]
    guest = (await getSigners())[2]
    const partyFactory = await getContract("PartyFactory", deployer)
    const partyAddress = (await partyFactory.getParties(host.address))[0]
    const party = await getContractAt("Party", partyAddress)
    const guestParty = party.connect(guest)
    await guestParty.buyTicket(guest.address, { value: cost })
}

module.exports.tags = ["all", "buy-ticket"]
