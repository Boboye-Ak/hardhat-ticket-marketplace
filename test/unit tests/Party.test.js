const hre = require("hardhat")
const { network, ethers, deployments } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

const { assert, expect } = require("chai")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Party", () => {
          const chainId = network.config.chainId
          let partyFactory, deployer, host, guest, party, guestParty, partyAddress
          const percentCut = networkConfig[chainId]["percentCut"]
          const partyName = networkConfig[chainId]["partyName"]
          const symbol = networkConfig[chainId]["symbol"]
          const maxAttendees = networkConfig[chainId]["maxAttendees"]
          const cost = networkConfig[chainId]["cost"]
          beforeEach(async () => {
              await deployments.fixture(["deployment"])
              deployer = (await hre.getNamedAccounts()).deployer
              host = (await ethers.getSigners())[1]
              guest = (await ethers.getSigners())[2]
              partyFactory = await ethers.getContract("PartyFactory", host)
              partyAddress = (await partyFactory.getParties(host.address))[0]
              party = await ethers.getContractAt("Party", partyAddress, host)
              guestParty = await ethers.getContractAt("Party", partyAddress, guest)
          })
          describe("PartyFactory", () => {
              it("", async () => {})
          })
          describe("Party", () => {
              describe("buyTicket", () => {
                  it("reverts if you dont send the cost of the ticket", async () => {
                      await expect(guestParty.buyTicket(guest.address)).to.be.revertedWith(
                          "Party__SendWithTicketCost"
                      )
                  })
                  it("updates tokenId", async () => {
                      await guestParty.buyTicket(guest.address, { value: cost })
                      assert.equal(await guestParty.getTotalSold(), 1)
                  })
                  it("mints the NFT", async () => {
                    await guestParty.buyTicket(guest.address, { value: cost })
                      assert.equal(await guestParty.getExists(1), true)
                  })
              })
          })
      })
