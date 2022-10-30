// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Party.sol";

contract PartyFactory {
    //State variables
    uint256 i_percentCut;
    mapping(address => address[]) addressToPartiesOwned;

    constructor(uint256 percentCut) {
        i_percentCut = percentCut;
    }

    function createParty(
        string memory name,
        string memory symbol,
        uint256 maxAttendees,            uint256 ticketCost,
            string memory poster
    )
        public
        returns (
            address PartyAddress

        )
    {
        Party newParty = new Party(
            name,
            symbol,
            maxAttendees,
            ticketCost,
            msg.sender,
            poster,
            address(this),
            i_percentCut
        );
    }
}
