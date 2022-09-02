// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TheMarketToken is ERC20 {
    
    // An address type variable is used to store accounts.
    address public owner;

    /**
     * Contract initialization.
     * The totalSupply is assigned to the transaction sender, which is the
     * account that is deploying the contract.
     */
    constructor()
        ERC20("The Market Exchange Token", "TMKTX")
    {
        _mint(msg.sender, 10000000);
        owner = msg.sender;
    }
}
