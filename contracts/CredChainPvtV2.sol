// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import {Checker} from "./Checker.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract CredChainPvtV2 is AccessControl {
    event Deposit(
        address indexed from,
        address indexed token,
        uint amount,
        uint timestamp
    );
    event Withdraw(
        address indexed from,
        address indexed token,
        uint amount,
        uint timestamp
    );
    event Collateral(
        address indexed from,
        address indexed token,
        uint amount,
        uint timestamp
    );

    string public name = "CredChainPvtV2";

    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    // user => token => amount
    mapping(address => mapping(address => uint256)) internal balanceOf;
    mapping(address => mapping(address => uint256)) internal collateraUsed;

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(OPERATOR_ROLE, msg.sender);
    }

    function deposit(
        address _token,
        uint256 _amount,
        address _user
    ) public onlyRole(OPERATOR_ROLE) {
        bool isValid = Checker.isDepositValid(_token, _amount);

        isValid ? _deposit(_token, _amount, _user) : revert();

        emit Deposit(_user, _token, _amount, block.timestamp);
    }

    function _deposit(address _token, uint256 _amount, address _user) internal {
        balanceOf[_user][_token] += _amount;
    }

    function updateCollateral(
        address _token,
        uint256 _amount,
        address _user
    ) public onlyRole(OPERATOR_ROLE) returns (bool res) {
        bool isValid = Checker.isCollateralValid(
            _token,
            _amount,
            _user,
            balanceOf,
            collateraUsed
        );

        isValid ? _collateral(_token, _amount, _user) : revert();

        emit Collateral(_user, _token, _amount, block.timestamp);

        res = true;
    }

    function _collateral(
        address _token,
        uint256 _amount,
        address _user
    ) internal {
        balanceOf[_user][_token] -= _amount;
        collateraUsed[_user][_token] += _amount;
    }

    function withdraw(
        address _token,
        uint256 _amount,
        address _user
    ) public onlyRole(OPERATOR_ROLE) {
        require(_amount > 0, "Amount must be greater than 0");
        require(_token != address(0), "Invalid token address");
        require(
            collateraUsed[msg.sender][_user] >= _amount,
            "Insufficient collateral"
        );

        bool isValid = Checker.isWithdrawValid(
            _token,
            _amount,
            _user,
            balanceOf
        );

        isValid ? _withdraw(_token, _amount, _user) : revert();

        emit Withdraw(_user, _token, _amount, block.timestamp);
    }

    function _withdraw(
        address _token,
        uint256 _amount,
        address _user
    ) internal {
        balanceOf[_user][_token] -= _amount;
    }

    function getBalance(
        address _token,
        address _user
    ) public view returns (uint256) {
        return balanceOf[_user][_token];
    }

    function getCollateral(
        address _token,
        address _user
    ) public view returns (uint256) {
        return collateraUsed[_user][_token];
    }

    function registerPayment(
        address _token,
        uint256 _amount,
        address _user
    ) public onlyRole(OPERATOR_ROLE) returns (bool res) {
     _registerPayment(_token, _amount, _user);

        res = true;
    }

    function _registerPayment(
        address _token,
        uint256 _amount,
        address _user
    ) internal {

        if(balanceOf[_user][_token] >= _amount){
            balanceOf[_user][_token] -= _amount;
        }

        if(collateraUsed[_user][_token] >= _amount){
            collateraUsed[_user][_token] -= _amount;
        }
    }
}
