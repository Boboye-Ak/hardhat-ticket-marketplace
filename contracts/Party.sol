// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Party is ERC721 {
    //state variables
    uint256 public immutable totalSupply;
    uint256 public immutable i_percentCut;
    uint256 public s_tokenId;
    uint256 public immutable i_cost;
    address public immutable i_owner;
    address public immutable i_parent;
    mapping(uint256 => bool) isCheckedIn;
    mapping(address => bool) isAuthorized;
    string public s_poster;

    //Custom Errors
    error Party__SendWithTicketCost();
    error Party__SoldOut();
    error Party__Unauthorized();
    error Party__NonExistentToken();

    //Events
    event bougtTicket(address indexed owner, uint256 tokenId);
    event authorizationChanged(address indexed grantee, bool indexed newState);
    event checkedIn(uint256 indexed tokenId);
    event withdrawn();
    event posterSet(string indexed newPoster);

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
        address owner,
        address parent,
        uint256 percentCut //in Basis Points (percent * 100)
    ) ERC721(name, symbol) {
        require(maxAttendees>0);
        totalSupply = maxAttendees;
        i_cost = cost;
        i_owner = owner;
        i_parent = parent;
        i_percentCut = percentCut;
    }

    //Receive and Fallback Functions
    receive() external payable {
        revert();
    }

    fallback() external payable {
        revert();
    }

    function buyTicket(address ticketOwner) external payable returns (uint256 tokenId) {
        if (msg.value < i_cost) {
            revert Party__SendWithTicketCost();
        }
        if (s_tokenId >= totalSupply) {
            revert Party__SoldOut();
        }

        s_tokenId += 1;
        _safeMint(ticketOwner, s_tokenId);
        emit bougtTicket(ticketOwner, s_tokenId);
        return s_tokenId;
    }

    function grantAuthorization(address grantee) external onlyOwner {
        if (isAuthorized[grantee]) {
            revert();
        }
        isAuthorized[grantee] = true;
        emit authorizationChanged(grantee, true);
    }

    function revokeAuthorization(address grantee) external onlyOwner {
        if (!isAuthorized[grantee]) {
            revert();
        }
        isAuthorized[grantee] = false;
        emit authorizationChanged(grantee, false);
    }

    function checkIn(uint256 tokenId) external {
        if (!_exists(tokenId)) {
            revert Party__NonExistentToken();
        }
        if ((msg.sender != i_owner) && (!isAuthorized[msg.sender])) {
            revert Party__Unauthorized();
        }
        if (isCheckedIn[tokenId]) {
            revert();
        }
        isCheckedIn[tokenId] = true;
        emit checkedIn(tokenId);
    }

    function withdraw() external onlyOwner {
        payable(i_parent).transfer(((address(this).balance) * i_percentCut) / 10000);
        payable(msg.sender).transfer(address(this).balance);
        emit withdrawn();
    }

    function setPoster(string memory newPoster) external {
        s_poster = newPoster;
        emit posterSet(newPoster);
    }

    //View Functions
    function getIsCheckedIn(uint256 tokenId) public view returns (bool) {
        return isCheckedIn[tokenId];
    }

    function getExists(uint256 tokenId) public view returns (bool) {
        return _exists(tokenId);
    }

    function getIsAuthorized(address grantee) public view returns (bool) {
        return isAuthorized[grantee];
    }

    function getPoster() public view returns (string memory) {
        return (s_poster);
    }

    function getCost() public view returns (uint256) {
        return (i_cost);
    }

    function getTotalSold() public view returns (uint256) {
        return s_tokenId;
    }

    function getMaxAttendees() public view returns (uint256) {
        return totalSupply;
    }

    function getHost() public view returns (address) {
        return i_owner;
    }
}
