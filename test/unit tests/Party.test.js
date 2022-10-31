const hre = require("hardhat")
const { network, ethers, deployments } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

const { assert, expect } = require("chai")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Party", () => {
          const chainId = network.config.chainId
          let partyFactory,
              deployer,
              host,
              guest,
              gateKeeper,
              party,
              guestParty,
              gateKeeperParty,
              partyAddress
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
              gateKeeper = (await ethers.getSigners())[3]
              partyFactory = await ethers.getContract("PartyFactory", host)
              partyAddress = (await partyFactory.getParties(host.address))[0]
              party = await ethers.getContractAt("Party", partyAddress, host)
              guestParty = await ethers.getContractAt("Party", partyAddress, guest)
              gateKeeperParty = await ethers.getContractAt("Party", partyAddress, gateKeeper)
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
              describe("grantAuthorization", () => {
                  it("reverts if non-owner tries to call", async () => {
                      await expect(
                          guestParty.grantAuthorization(gateKeeper.address)
                      ).to.be.revertedWith("Party__Unauthorized")
                  })
                  it("grants authorization if called by owner", async () => {
                      await party.grantAuthorization(gateKeeper.address)
                      assert(await party.getIsAuthorized(gateKeeper.address), true)
                  })
              })
              describe("revokeAuthorization", () => {
                  it("reverts if non-owner tries to call", async () => {
                      await expect(
                          guestParty.revokeAuthorization(gateKeeper.address)
                      ).to.be.revertedWith("Party__Unauthorized")
                  })
                  it("reverts if the person is not authorized", async () => {
                      await expect(party.revokeAuthorization(gateKeeper.address)).to.be.reverted
                  })
                  it("revokes authorization", async () => {
                      await party.grantAuthorization(gateKeeper.address)
                      await party.revokeAuthorization(gateKeeper.address)
                      assert.equal(await party.getIsAuthorized(gateKeeper.address), false)
                  })
              })
              describe("checkIn", () => {
                  beforeEach(async () => {
                      await guestParty.buyTicket(guest.address, { value: cost })
                      await party.grantAuthorization(gateKeeper.address)
                  })
                  it("reverts if tokenId doesn't exist", async () => {
                      await expect(gateKeeperParty.checkIn(2)).to.be.revertedWith(
                          "Party__NonExistentToken"
                      )
                  })
                  it("reverts if unauthorized person tries to check in", async () => {
                      await expect(guestParty.checkIn(1)).to.be.revertedWith("Party__Unauthorized")
                  })
                  it("reverts if token is already checked in", async () => {
                      await gateKeeperParty.checkIn(1)
                      await expect(gateKeeperParty.checkIn(1)).to.be.reverted
                  })
                  it("checks in if all is right", async () => {
                      await gateKeeperParty.checkIn(1)
                      assert.equal(await party.getIsCheckedIn(1), true)
                  })
              })
          })
      })
