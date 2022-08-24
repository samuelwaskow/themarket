// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract AssetList {
    uint256 public assetCount;

    struct Asset {
        uint256 id;
        string symbol;
        string description;
        uint256 initialPrice;
        uint256 currentPrice;
    }

    mapping(uint256 => Asset) public assets;

    /**
     * Creates a new assets
     */
    function createAsset(
        string memory _symbol,
        string memory _description,
        uint256 price
    ) public {
        assetCount++;
        assets[assetCount] = Asset(
            assetCount,
            _symbol,
            _description,
            price,
            price
        );
    }
}
