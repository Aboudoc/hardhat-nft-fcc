const { assert } = require("chai")
const { getNamedAccounts, deployments, ethers } = require("hardhat")

describe("DynamicSvgNft", function () {
    let deployer, dynamicSvgNft
    beforeEach(async function () {
        deployer = await getNamedAccounts()
        await deployments.fixture(["mocks", "dynamicsvg"])
        dynamicSvgNft = await ethers.getContract("DynamicSvgNft")
        mockV3Aggregator = await ethers.getContract("MockV3Aggregator")
    })

    describe("constructor", function () {
        it("sets the counter correctly", async function () {
            const counter = await dynamicSvgNft.getTokenCounter()
            assert.equal(counter.toString(), "0")
        })
    })
    it("sets starting values correctly", async function () {})
})
