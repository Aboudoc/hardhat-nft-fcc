const { developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const arguments = []
    const basicNft = await deploy("BasicNft", {
        from: deployer,
        args: arguments,
        log: true,
    })
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        verify(basicNft.address, arguments)
    }
}
module.exports.tags = ["all", "basicnft"]
