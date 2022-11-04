const hre = require("hardhat")
const { ethers, network } = require("hardhat")
const fs = require("fs")

const PARTYABIFILE = "../nextjs-ticket-marketplace/constants/partyAbi.json"
const PARTYFACTORYABIFILE = "../nextjs-ticket-marketplace/constants/partyFactoryAbi.json"
const PARTYFACTORYADDRESSFILE = "../nextjs-ticket-marketplace/constants/partyFactoryAddresses.json"
const chainId = network.config.chainId
module.exports = async () => {
    console.log("Updating frontend constants...")
    await updateAddresses()
    await updateABI()
}
const updateAddresses = async () => {
    const partyFactory = await ethers.getContract("PartyFactory")
    const currentAddresses = JSON.parse(fs.readFileSync(PARTYFACTORYADDRESSFILE, "utf-8"))
    if (chainId in currentAddresses) {
        if (!currentAddresses[chainId].includes(partyFactory.address)) {
            currentAddresses[chainId].push(partyFactory.address)
        }
    }
    currentAddresses[chainId] = [partyFactory.address]
    fs.writeFileSync(PARTYFACTORYADDRESSFILE, JSON.stringify(currentAddresses))
}
const updateABI = async () => {
    let partyABI = (await hre.artifacts.readArtifact("Party")).abi
    let partyFactoryABI = (await hre.artifacts.readArtifact("PartyFactory")).abi
    partyABI = { abi: partyABI }
    partyFactoryABI = { abi: partyFactoryABI }
    fs.writeFileSync(PARTYABIFILE, JSON.stringify(partyABI))
    fs.writeFileSync(PARTYFACTORYABIFILE, JSON.stringify(partyFactoryABI))
}
