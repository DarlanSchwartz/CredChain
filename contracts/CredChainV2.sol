// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./DepositDto.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CredChainV2 is Ownable {
    event Deposit(
        address indexed from,
        address indexed token,
        uint amount,
        uint timestamp
    );

    // account => token => amount
    mapping(address => mapping(address => uint)) internal balanceOf;

    mapping(address => bool) internal acceptedTokens;

    function setAcceptedToken(address token) public onlyOwner {
        require(token != address(0), "Invalid address");
        acceptedTokens[token] = true;
    }

    function deposit(DepositDto memory depositDto) public payable {

        if (!isAcceptedToken(depositDto.token)) {
            revert("Token not accepted");
        }

        balanceOf[msg.sender][depositDto.token] += depositDto.amount;

        IERC20(depositDto.token).transferFrom(
            msg.sender,
            address(this),
            depositDto.amount
        );

        emit Deposit(
            msg.sender,
            depositDto.token,
            depositDto.amount,
            block.timestamp
        );
    }

    function isAcceptedToken(address token) public view returns (bool) {
        return acceptedTokens[token];
    }

    function getBalanceOf(
        address _user,
        address _token
    ) public view returns (uint) {
        return balanceOf[_user][_token];
    }

    function releaseLockedTokens(
        address _token,
        address _recipient,
        address _user,
        uint _amount
    ) public onlyOwner {
        
        if(balanceOf[_user][_token] < _amount) {
            revert("Insufficient balance");
        }
        
        balanceOf[_user][_token] -= _amount;

        IERC20(_token).transfer(_recipient, _amount);
    }
}
