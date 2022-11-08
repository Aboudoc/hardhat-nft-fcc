const { expect, assert } = require("chai")
const { getNamedAccounts, deployments, ethers } = require("hardhat")

describe("randomIpfsNft", function () {
    let deployer, randomIpfsNft, vrfCoordinatorV2Mock
    const amount = ethers.utils.parseEther("0.2")

    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["mocks", "randomipfs"])
        randomIpfsNft = await ethers.getContract("RandomIpfsNft", deployer)
        vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
        it("Sets starting values correctly", async function () {
            const mintFee = await randomIpfsNft.getMintFee()
            assert.equal(mintFee)
        })
    })
    describe("requestNft", function () {
        it("fails if the payment isn't sent with the request", async function () {
            await expect(randomIpfsNft.requestNft()).to.be.revertedWith(
                "RandomIpfsNft__NeedMoreETHSent"
            )
        })
        it("reverse if the payment is less than mint fee", async function () {
            const mintFee = await randomIpfsNft.getMintFee()
            await expect(randomIpfsNft.requestNft({ value: mintFee.div(2) })).to.be.revertedWith(
                "RandomIpfsNft__NeedMoreETHSent"
            )
        })

        it("emits an event and kicks off a random word request", async function () {
            const fee = await randomIpfsNft.getMintFee()
            await expect(randomIpfsNft.requestNft({ value: fee.toString() })).to.emit(
                randomIpfsNft,
                "NftRequested"
            )
        })
    })
})
