const hre = require("hardhat")
const { network, ethers, deployments } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

const { assert, expect } = require("chai")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Party", () => {
          let partyFactory, deployer, host, party, partyAddress
          const percentCut = networkConfig[chainId]["percentCut"]
          const partyName = networkConfig[chainId]["partyName"]
          const symbol = networkConfig[chainId]["symbol"]
          const maxAttendees = networkConfig[chainId]["maxAttendees"]
          const cost = networkConfig[chainId]["cost"]
          beforeEach(async () => {
              await deployments.fixture(["deployment"])
              deployer = (await hre.getNamedAccounts()).deployer
              host = (await ethers.getSigners())[1]
              partyFactory = await ethers.getContract("PartyFactory", host)
              partykAddress = (await partyFactory.getParties(host.address))[0]
              party = await ethers.getContractAt("Party", partyAddress, host)
          })
      })
