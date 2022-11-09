//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

pragma solidity ^0.8.7;

contract DynamicSvgNft is ERC721 {
    // mint
    // store our SVG information somewhere
    // some logic to say "Show X or Show y"

    uint256 private s_tokenCounter;
    string private i_lowImageURI;
    string private i_hightImageURI;
    string private constant base64EncodedSvgPrefix = "data:image/svg+xml;base64,";

    constructor(string memory lowSvg, string memory highSvg) ERC721("Dynamic SVG NFT", "DSN") {
        s_tokenCounter = 0;
    }

    function svgToImageURI(string memory svg) public pure returns (string memory) {}

    function mintNft() public {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter += s_tokenCounter;
    }
}
