const hre = require("hardhat")
const { network, ethers, deployments } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

const { assert, expect } = require("chai")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("PartyFactory", () => {
          let partyFactory, hostPartyFactory, guestParty, deployer, host, guest
          const chainId = network.config.chainId
          const percentCut = networkConfig[chainId]["percentCut"]
          const cost = networkConfig[chainId]["cost"]
          beforeEach(async () => {
              await deployments.fixture(["deployment"])
              deployer = (await ethers.getSigners())[0]
              host = (await ethers.getSigners())[1]
              guest = (await ethers.getSigners())[2]
              partyFactory = await ethers.getContract("PartyFactory", deployer)
              hostPartyFactory = await partyFactory.connect(host)
          })
          describe("constructor", () => {
              it("initializes properly", async () => {
                  assert.equal(await partyFactory.i_owner(), deployer.address)
                  assert.equal(await partyFactory.i_percentCut(), percentCut)
              })
          })
          describe("withdraw", () => {
              let party,
                  guestParty,
                  hostParty,
                  partyAddress,
                  initialOwnerBalance,
                  partyFactoryBalance
              beforeEach(async () => {
                  partyAddress = (await partyFactory.getParties(host.address))[0]
                  party = await ethers.getContractAt("Party", partyAddress, host)
                  guestParty = await party.connect(guest)
                  hostParty = await party.connect(host)
                  await guestParty.buyTicket(guest.address, { value: cost })
                  initialOwnerBalance = await guestParty.provider.getBalance(deployer.address)

                  await hostParty.withdraw()
                  partyFactoryBalance = await guestParty.provider.getBalance(partyFactory.address)
              })
              it("reverts if non-owner tries to withdraw", async () => {
                  await expect(hostPartyFactory.withdraw()).to.be.revertedWith(
                      "PartyFactory__Unauthorized"
                  )
              })
              it("makes the appropriate transfers", async () => {
                  assert.isAbove(parseInt((await partyFactoryBalance).toString()), 0)
                  await partyFactory.withdraw()
                  const finalPartyFactoryBalance = await guestParty.provider.getBalance(
                      partyFactory.address
                  )
                  assert.equal(finalPartyFactoryBalance.toString(), "0")
              })
          })
      })
