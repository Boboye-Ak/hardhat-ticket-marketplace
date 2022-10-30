// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Party is ERC721 {
    //state variables
    uint256 immutable totalSupply;
    uint256 s_tokenId;
    uint256 immutable i_cost;
    address immutable i_owner;
    mapping(uint256 => bool) isCheckedIn;
    mapping(address => bool) isAuthorized;

    //Custom Errors
    error Party__SendWithTicketCost();
    error Party__SoldOut();
    error Party__Unauthorized();

    //modifiers
    modifier onlyOwner() {
        if (msg.sender != i_owner) {
            revert Party__Unauthorized();
        }
        _;
    }

    constructor(
        string memory name,
        string memory symbol,
        uint256 maxAttendees,
        uint256 cost,
        address owner
    ) ERC721(name, symbol) {
        totalSupply = maxAttendees;
        i_cost = cost;
        i_owner = owner;
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
        if (s_tokenId >= totalSupply) {
            revert Party__SoldOut();
        }

        s_tokenId += 1;
        _safeMint(msg.sender, s_tokenId);
        return s_tokenId;
    }

    function grantAuthorization(address grantee) external onlyOwner {
        if (isAuthorized[grantee]) {
            revert();
        }
        isAuthorized[grantee] = true;
    }

    function revokeAuthorization(address grantee) external onlyOwner {
        if (!isAuthorized[grantee]) {
            revert();
        }
        isAuthorized[grantee] = false;
    }

    function checkIn(uint256 tokenId) external {
        if ((msg.sender != i_owner) && (!isAuthorized[msg.sender])) {
            revert Party__Unauthorized();
        }
        if (isCheckedIn[tokenId]) {
            revert();
        }
        isCheckedIn[tokenId] = true;
    }
}
