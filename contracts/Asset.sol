// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract Asset is ERC20, Ownable, ERC20Permit, ERC20Votes {
    uint256 public askPrice;
    uint256 public lastPrice;
    uint256 public bidPrice;

    // Book
    Order[] public orders;

    // Times and Trades
    Order[] public trades;

    struct Order {
        address submitter;
        uint quantity;
        uint256 price;
        bool isBuy;
    }

    /**
     * Constructor
     */
    constructor(uint256 initialAmount, uint256 initialPrice)
        ERC20("Asset", "AST")
        ERC20Permit("Asset")
    {
        _mint(msg.sender, initialAmount);
        lastPrice = initialPrice;
    }

    /**
     * The company responsible by the asset can create more tokens
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /**
     * If the order's price is the same as current Ask or Bid price, close the deal
     * and add it to the trades mapping.
     * Else, add the order to the orders mapping.
     */
    function placeOrder(
        address to,
        uint256 _quantity,
        uint256 _price,
        bool _type
    ) public {
        Order memory order = Order(to, _quantity, _price, _type);

        int foundIndex = -1;
        for (uint i = 0; i < orders.length; i++) {
            if (orders[i].price == _price && orders[i].isBuy != _type) {
                foundIndex = int(i);
                break;
            }
        }

        if (foundIndex < 0) {
            orders.push(order);
        } else {
            _removeOrder(uint(foundIndex));
            trades.push(order);
        }
    }

    /**
     * Returns the size of the orders array
     */
    function ordersLength() public view returns (uint256) {
        return orders.length;
    }

    /**
     * Returns the size of the trades array
     */
    function tradesLength() public view returns (uint256) {
        return trades.length;
    }

    /**
     * Removes the order from the book
     */
    function _removeOrder(uint index) private {
        uint last = orders.length - 1;
        orders[index] = orders[last];
        orders.pop();
    }

    // The following functions are overrides required by Solidity.

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
}
