// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.4.22 <0.9.0;

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
