// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./CreditOrderDto.sol";
import "hardhat/console.sol";

interface IRealTokenizado {
    function mint(address to, uint256 amount) external;
}

// This contracts receives a loan order request from the CredChain creditor
// Calls the STR contract to mint CBDC to the financial institution
// If the requester has a bank account within the Financial institution, this contract calls the Real Tokenizado to mint
// If the requeter does not have a bank account within the Financial Institution it calls the swap one step contract

contract BankOrderReceiverV2 is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant CREDITOR_REQUESTER =
        keccak256("CREDITOR_REQUESTER");

    IRealTokenizado public realTokenizado;
 
    constructor(
        address _realTokenizado
    ) {
        realTokenizado = IRealTokenizado(_realTokenizado);
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function setInternalContract(
        address _realTokenizado
    ) external onlyRole(ADMIN_ROLE) {
        realTokenizado = IRealTokenizado(_realTokenizado);
    }

    function receiveCreditOrder(
        CreditOrderDto memory creditOrderDto
    ) external onlyRole(CREDITOR_REQUESTER) returns (bool res) {
            realTokenizado.mint(creditOrderDto.requester,creditOrderDto.borrowedAmount);
            return res = true;
    }
}
