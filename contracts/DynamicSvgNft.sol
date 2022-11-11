//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@base64-sol/base64.sol";

pragma solidity ^0.8.7;

contract DynamicSvgNft is ERC721 {
    // mint
    // store our SVG information somewhere
    // some logic to say "Show X" or "Show y"

    uint256 private s_tokenCounter;
    string private i_lowImageURI;
    string private i_hightImageURI;
    string private constant base64EncodedSvgPrefix = "data:image/svg+xml;base64,";

    constructor(string memory lowSvg, string memory highSvg) ERC721("Dynamic SVG NFT", "DSN") {
        s_tokenCounter = 0;
    }

    function svgToImageURI(string memory svg) public pure returns (string memory) {
        string memory svgBase64Encoded = Base64.encode(bytes(string(abi.encodePacked(svg))));
        return string(abi.encodePacked(base64EncodedSvgPrefix, svgBase64Encoded));
    }

    function mintNft() public {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter += s_tokenCounter;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64 ";
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exist(tokenId), "URI Query for nonexistent token");
        string memory imageURI = "hi!";
        // data:image/svg+xml;base64 ==> this is the prefix for svg images
        // data:application/json;base64 ==> prefix for base64 JSON
        return
            string(
                abi.encodePacked(
                    _baseURI(),
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                name(),
                                '", "description":"An NFT that changes based on the Chainlink Feed",  ',
                                '"attributes": [{"trait_type": "coolness", "value": 100}], "image":"',
                                imageURI,
                                '"}'
                            )
                        )
                    )
                )
            );
    }
}
