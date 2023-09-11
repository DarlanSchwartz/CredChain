// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "../Bank/CreditOrderDto.sol";
import "hardhat/console.sol";

interface BankOrderReceiver {
    function receiveCreditOrder(
        CreditOrderDto memory creditOrderDto
    ) external returns (bool);
}

interface CredChainPvt {
    function updateCollateral(
        address _token,
        uint256 _amount,
        address _user
    ) external returns (bool);

    function registerPayment(
        address _token,
        uint256 _amount,
        address _user
    ) external returns (bool res);
}

contract CreditorV2 is AccessControl {
    // This contract is intend to control all credit operations of an user
    // If the payment not occurs it releases the locked collateral, trade it to USDC, lockit again, and send Drex to the bank
    // When the credit operation ends successfully, it releases the collateral back to the user

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    address public bankOrderReceiver;
    address public credChainPvt;

    mapping(bytes8 => mapping(address => CreditOrderDto))
        public creditOperations;

    mapping(address => bytes8[]) public creditOperationsByUser;

    constructor(address _bankOrderReceiver, address _credChainPvt) {
        bankOrderReceiver = _bankOrderReceiver;
        credChainPvt = _credChainPvt;
        _setupRole(ADMIN_ROLE, msg.sender);
    }

    function setBankOrderReceiver(
        address _bankOrderReceiver,
        address _credChainPvt
    ) external onlyRole(ADMIN_ROLE) {
        bankOrderReceiver = _bankOrderReceiver;
        credChainPvt = _credChainPvt;
    }

    function requestCredit(
        CreditOrderDto memory creditOrder
    ) public onlyRole(ADMIN_ROLE)  returns (bool) {

        creditOperations[creditOrder.orderId][
            creditOrder.requester
        ] = creditOrder;
        creditOperationsByUser[creditOrder.requester].push(creditOrder.orderId);

        bool success = BankOrderReceiver(bankOrderReceiver).receiveCreditOrder(
            creditOrder
        );

        if (!success) {
            revert("Credit request failed");
        }

        bool _success = CredChainPvt(credChainPvt).updateCollateral(
            creditOrder.tokenCollateral,
            creditOrder.borrowedAmount,
            creditOrder.requester
        );

        if (!_success) {
            revert("Credit request failed");
        }

        return true;
    }

    function payCredit(bytes8 _orderId, address _user, bool _paid) public onlyRole(ADMIN_ROLE)  returns (bool) {
        CreditOrderDto memory creditOrder = creditOperations[_orderId][_user];

        if (creditOrder.status) {
            revert("Credit already paid");
        }

        creditOrder.status = _paid;
        creditOrder.status = true;

        creditOperations[_orderId][_user] = creditOrder;

        CredChainPvt(credChainPvt).registerPayment(
            creditOrder.tokenCollateral,
            creditOrder.borrowedAmount,
            creditOrder.requester
        );

        return true;
    }
}
