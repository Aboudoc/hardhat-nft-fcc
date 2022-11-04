// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract RandomIpfsNft is VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface public i_vrfCoordinator;

    // Chainlink VRF Variables
    uint64 private immutable i_subscriptionId;
    bytes32 private immutable i_gasLane;
    uint32 private immutable i_callbackGasLimit;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant NUM_WORDS = 1;

    constructor(
        address vrfCoordinatorV2,
        uint32 subscritpionId,
        bytes32 gasLane,
        uint32 callbackgasLimit
    ) VRFConsumerBaseV2(vrfCoordinatorV2) {
        i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
        i_subscriptionId = subscritpionId;
        i_gasLane = gasLane;
        i_callbackGasLimit = callbackgasLimit;
    }

    function requestNft() public returns (uint256 requestId) {
        requestId = i_vrfCoordinator.requestRandomWords(
            i_gasLane,
            i_subscriptionId,
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            NUM_WORDS
        );
    }

    function fulfillRandomWords(uint256 requestid, uint256[] memory randomWords)
        internal
        override
    {}

    function tokenURI(uint256) public {}
}
