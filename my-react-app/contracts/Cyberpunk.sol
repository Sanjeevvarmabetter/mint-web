// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

contract Cyberpunk is ERC721, Ownable {
    using Strings for uint256;

    uint256 public mintPrice;
    uint256 public totSupply;
    uint256 public maxsupply;
    uint256 public maxPerwallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withDraw;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721('Cyberpunk', 'RP') {
        mintPrice = 0.02 ether;
        totSupply = 0;
        maxsupply = 1000;
        maxPerwallet = 3;
        isPublicMintEnabled = true;
        withDraw = payable(msg.sender);
        baseTokenUri = "https://example.com/metadata/";
    }

    function setPublicMintEnable(bool isPublicMintEnable_) external onlyOwner {
        isPublicMintEnabled = isPublicMintEnable_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), 'Token does not exist!');
        return string(abi.encodePacked(baseTokenUri, tokenId_.toString(), ".json"));
    }

    function withdraw() external onlyOwner() {
        require(address(this).balance > 0, "No balance to withdraw");
        (bool success, ) = withDraw.call{value: address(this).balance}("");
        require(success, 'Withdraw failed');
    }

    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnabled, 'Minting is not enabled');
        require(msg.value == quantity_ * mintPrice, 'Incorrect mint value');
        require(walletMints[msg.sender] + quantity_ <= maxPerwallet, 'Exceeds max wallet limit');

        for (uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = totSupply + 1;
            totSupply++;
            _safeMint(msg.sender, newTokenId);
            walletMints[msg.sender]++;
        }
    }
}
