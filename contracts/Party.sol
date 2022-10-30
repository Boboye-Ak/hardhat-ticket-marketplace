// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Party is ERC721 {
    //state variables
    uint256 immutable totalSupply;
    uint256 s_tokenId;
    uint256 immutable i_cost;
    mapping(uint256 => bool) isCheckedIn;

    //Custom Errors
    error Party__SendWithTicketCost();
    error Party__SoldOut();

    constructor(
        string memory name,
        string memory symbol,
        uint256 maxAttendees,
        uint256 cost
    ) ERC721(name, symbol) {
        totalSupply = maxAttendees;
        i_cost = cost;
    }

    //Receive and Fallback Functions
    receive() external payable {
        revert();
    }

    fallback() external payable {
        revert();
    }

    function buyTicket() external payable returns (uint256 tokenId) {
        if (msg.value < i_cost) {
            revert Party__SendWithTicketCost();
        }
        if (s_tokenId>=totalSupply){
            revert Party__SoldOut();

        }

        s_tokenId += 1;
        _safeMint(msg.sender, tokenId);
    }
}
