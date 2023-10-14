// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AuraSkyNFT is Ownable,ERC721
{
    address public host;
    string key = "minh";

    constructor ()  ERC721("AuraSky NFT","AuraSkyNFT") Ownable(0x97400B8c26854f59a419613E94900CdA50F3a38E)
    {
        host = msg.sender;
    }

    function buyNFT(uint nftID , uint priceInWei) external payable   
    {
        uint _price =  priceInWei * 1 wei;
        require(msg.value == _price , "Dont enough value");  
        _safeMint(msg.sender, nftID);
    }

    function sellNFT(uint nftID) public   
    {
        transferFrom((msg.sender), host, nftID);
    }   

    function sendEther (address recipient , uint amountInWei , string memory _key) public
    {
        require(keccak256(abi.encodePacked((_key))) == keccak256(abi.encodePacked((key))), "khong phai key");
        require(recipient == msg.sender, "Sai cmn nguoi goi roi em");
        uint amount = amountInWei * (1 wei);
        payable(recipient).transfer(amount);
    }

}

