// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

struct CreditOrderDto {
    address tokenCollateral;
    address brEth;
    address requester;
    uint256 borrowedAmount; // 
    uint256 conversionRate; //
    bytes8 orderId;
    bytes8 bankId;
    bool paid;
    bool status;
}