// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
    
    address public owner;
    uint256 public last_completed_migration;

    /**
     * Constructor
     */
    constructor() {
        owner = msg.sender;
    }

    modifier restricted() {
        if (msg.sender == owner) _;
    }

    function setCompleted(uint256 completed) public restricted {
        last_completed_migration = completed;
    }

    function upgrade(address new_address) public restricted {
        Migrations upgraded = Migrations(new_address);
        upgraded.setCompleted(last_completed_migration);
    }
}
