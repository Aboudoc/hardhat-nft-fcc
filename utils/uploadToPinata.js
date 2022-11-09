const pinataSDK = require("@pinata/sdk")
const path = require("path")
const fs = require("fs")
require("dotenv").config()

const pinataApiKey = process.env.PINATA_API_KEY
const pinataApiSecret = process.env.PINATA_API_SECRET
const pinata = pinataSDK(pinataApiKey, pinataApiSecret)
// ==> ran into an error running this
// I installed older version yarn add --dev @pinata/sdk@^1.1.23

async function storeImages(imagesFilePath) {
    // ==> to get the full output of the path:
    const fullImagesPath = path.resolve(imagesFilePath)

    // ==> We get those files by reading the entire directory
    const files = fs.readdirSync(fullImagesPath)

    // console.log(files)
    // ==> to check by deploying 02 & 00 and calling storeImages at the end (after module.exports)

    let responses = []
    console.log("Uploading to Pinata!")

    for (fileIndex in files) {
        console.log(`Working on ${fileIndex}...`)
        const readableStreamForFile = fs.createReadStream(`${fullImagesPath}/${files[fileIndex]}`)
        // ==> we have to stream all the data inside of these images

        try {
            // ==> After setting up key & secret we can do some pinata stuff:
            const response = await pinata.pinFileToIPFS(readableStreamForFile)
            responses.push(response)
        } catch (error) {
            console.log(error)
        }
    }
    return { responses, files }
}

async function storeTokenUriMetadata(metadata) {
    try {
        const response = await pinata.pinJSONToIPFS(metadata)
        return response
    } catch (error) {
        console.log(error)
    }
    return null
}
module.exports = { storeImages, storeTokenUriMetadata }
