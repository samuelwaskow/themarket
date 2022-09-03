// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract AssetList {
    uint256 public assetCount;

    struct Asset {
        uint256 id;
        address owner;
        string symbol;
        string description;
        uint256 initialPrice;
        uint256 initialOffer;
        uint256 currentPrice;
        uint256 currentOffer;
    }

    mapping(uint256 => Asset) public assets;

    /**
     * Creates a new asset
     */
    function createAsset(
        address _owner,
        string memory _symbol,
        string memory _description,
        uint256 price,
        uint256 offer
    ) public {

        require(bytes(_symbol).length == 5, "Symbol must have its length equals to 5");

        require(bytes(_description).length > 5 && bytes(_description).length < 51, "Description must have its length between 6 and 50 characters");

        assetCount++;
        assets[assetCount] = Asset(
            assetCount,
            _owner,
            _symbol,
            _description,
            price,
            offer,
            price,
            offer
        );
    }
}
