// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Exchange {

    struct Order {
        address submitter;
        uint quantity;
        uint256 price;
        bool isBuy;
        uint creationTime;
    }

    struct Trade {
        address from;
        address to;
        uint quantity;
        uint256 price;
        bool isBuy;
        uint creationTime;
    }

    struct Asset {
        uint256 id;
        address owner;
        string symbol;
        string description;
        uint256 initialOffer;
        uint256 currentOffer;
        uint256 askPrice;
        uint256 lastPrice;
        uint256 bidPrice;
        // Book
        Order[] orders;
        // Times and Trades
        Trade[] trades;
        uint creationTime;
    }

    Asset[] public assets;
    uint256 public assetCount;

    /**
     * Constructor
     */
    constructor() {
        // lastPrice = initialPrice;
    }

    /** Public Functions */

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
        require(
            bytes(_symbol).length == 5,
            "Symbol must have its length equals to 5"
        );

        require(
            bytes(_description).length > 5 && bytes(_description).length < 51,
            "Description must have its length between 6 and 50 characters"
        );

        assets.push();
        Asset storage a = assets[assetCount];
        a.id = assetCount;
        a.symbol = _symbol;
        a.description = _description;
        a.owner = _owner;
        a.initialOffer = offer;
        a.currentOffer = offer;
        a.lastPrice = price;
        a.bidPrice = price;
        a.askPrice = price;

        assetCount++;
    }

    /**
     * If the order's price is the same as current Ask or Bid price, close the deal
     * and add it to the trades mapping.
     * Else, add the order to the orders mapping.
     */
    function placeOrder(
        string memory _symbol,
        address to,
        uint256 _quantity,
        uint256 _price,
        bool _type
    ) public {
        uint256 assetID = getAssetID(_symbol);

        int foundIndex = -1;
        uint totalOrders = assets[assetID].orders.length;
        for (uint i = 0; i < totalOrders; i++) {
            if (
                assets[assetID].orders[i].price == _price &&
                assets[assetID].orders[i].isBuy != _type
            ) {
                foundIndex = int(i);
                break;
            }
        }

        if (foundIndex < 0) {
            Order memory order = Order(
                to,
                _quantity,
                _price,
                _type,
                block.timestamp
            );
            assets[assetID].orders.push(order);
        } else {
            uint fIndex = uint(foundIndex);
            address from = assets[assetID].orders[fIndex].submitter;
            Trade memory trade = Trade(
                from,
                to,
                _quantity,
                _price,
                _type,
                block.timestamp
            );
            _removeOrder(assetID, fIndex);
            assets[assetID].trades.push(trade);
            // emit TradeCompleted(
                // _proposalID,
                // votesReceived,
                // proposals[_proposalID].passed
            // );
        }
    }

    /**
     * Return an asset by its index
     */
    function getAsset(uint256 _index) public view returns (Asset memory) {
        return assets[_index];
    }

    /**
     * Returns the size of the assets array
     */
    function assetsLength() public view returns (uint256) {
        return assets.length;
    }

    /**
     * Return an order by its index
     */
    function getOrder(string memory _symbol, uint256 _index)
        public
        view
        returns (Order memory)
    {
        uint256 assetID = getAssetID(_symbol);
        return assets[assetID].orders[_index];
    }

    /**
     * Returns the size of the orders array
     */
    function ordersLength(string memory _symbol) public view returns (uint256) {
        uint256 assetID = getAssetID(_symbol);
        return assets[assetID].orders.length;
    }

    /**
     * Return an order by its index
     */
    function getTrade(string memory _symbol, uint256 _index)
        public
        view
        returns (Trade memory)
    {
        uint256 assetID = getAssetID(_symbol);
        return assets[assetID].trades[_index];
    }

    /**
     * Returns the size of the trades array
     */
    function tradesLength(string memory _symbol) public view returns (uint256) {
        uint256 assetID = getAssetID(_symbol);
        return assets[assetID].trades.length;
    }

    /** Private Functions */

    /**
     * Removes the order from the book
     */
    function _removeOrder(uint256 assetID, uint index) private {
        uint last = assets[assetID].orders.length - 1;
        assets[assetID].orders[index] = assets[assetID].orders[last];
        assets[assetID].orders.pop();
    }

    /**
     * Retrieve the assetID based on its symbol
     */
    function getAssetID(string memory _symbol) private view returns (uint256) {
        uint256 total = assets.length;
        int256 id = -1;
        for (uint256 i = 0; i < total; i++) {
            if (compare(assets[i].symbol, _symbol)) {
                id = int256(assets[i].id);
                break;
            }
        }
        require(id >= 0, "Invalid Asset Symbol");

        return uint256(id);
    }

    /**
     * Compare two strings
     */
    function compare(string memory a, string memory b)
        private
        pure
        returns (bool)
    {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}
