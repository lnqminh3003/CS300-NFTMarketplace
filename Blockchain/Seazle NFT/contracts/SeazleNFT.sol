// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SeazleNFT is Ownable,ERC721
{
    uint public myTotal =0;
    uint listNFTMinted ;  
    uint decimalEthToWei = 10**18;
    address public host;
    string key = "minh";

    constructor ()  ERC721("Seazle NFT"," SeazleNFT")
    {
        host = msg.sender;
    }

    function buyNFT(uint nftID , uint priceInWei) external payable   //nftID get from buyer, price get from DB convert to wei
    {
        uint _price =  priceInWei * 1 wei;
        require(msg.value == _price , "Dont enough value");  
        _safeMint(msg.sender, nftID);
    }

    function sellNFT(uint nftID) public    //nftID get from seller 
    {
        transferFrom((msg.sender), host, nftID);
    }   

    function sendEther (address payable recipient , uint amountInWei , string memory _key) public
    {
        require(keccak256(abi.encodePacked((_key))) == keccak256(abi.encodePacked((key))), "khong phai key");
        require(recipient == msg.sender, "Sai cmn nguoi goi roi em");
        uint amount = amountInWei * (1 wei);
        recipient.transfer(amount);
    }

    function stringToUint(string memory s) private pure returns (uint) {
        bytes memory b = bytes(s);
        uint result = 0;
        for (uint256 i = 0; i < b.length; i++) {
            uint256 c = uint256(uint8(b[i]));
            if (c >= 48 && c <= 57) {
                result = result * 10 + (c - 48);
            }
        }
        return result;
    }

}

}