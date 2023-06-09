pragma solidity >0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNft is ERC721 {
    struct Item {
        uint256 mOpt;
        string mName;
    }

    Item[] public mItems;

    event EvtLogTk(address indexed addr, uint256 tkid, string msg1);

    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {}

    function addItem(
        address toAddr,
        uint256 itOpt,
        string memory itName
    ) public {
        uint256 newItemId = mItems.length;
        mItems.push(Item(itOpt, itName));
        _mint(toAddr, newItemId);
        emit EvtLogTk(toAddr, newItemId, "new tokenid");
    }

    function getItemOwner(uint256 itemid) public view returns (address) {
        return this.ownerOf(itemid);
    }

    function getItemCount(address owner) public view returns (uint256) {
        return this.balanceOf(owner);
    }
}