// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Party.sol";

contract PartyFactory {
    //State variables
    uint256 i_percentCut;
    address immutable i_owner;
    mapping(address => address[]) addressToPartiesOwned;

    //Custom Errors
    error PartyFactory__Unauthorized();

    //Modifiers
    modifier onlyOwner() {
        if (msg.sender != i_owner) {
            revert PartyFactory__Unauthorized();
        }
        _;
    }

    constructor(uint256 percentCut) {
        i_percentCut = percentCut;
        i_owner = msg.sender;
    }

    //Receive and Fallback Functions
    receive() external payable {
        
    }

    fallback() external payable {
        revert();
    }

    function createParty(
        string memory name,
        string memory symbol,
        uint256 maxAttendees,
        uint256 ticketCost
    ) public returns (address) {
        Party newParty = new Party(
            name,
            symbol,
            maxAttendees,
            ticketCost,
            msg.sender,
            address(this),
            i_percentCut
        );
        addressToPartiesOwned[msg.sender].push(address(newParty));
        return address(newParty);
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    //View Functions
    function getParties(address host) public view returns (address[] memory) {
        return addressToPartiesOwned[host];
    }
}
