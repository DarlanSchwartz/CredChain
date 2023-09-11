import { getContract } from './utils.js';
import * as credChainPvtAbi from "../abis/credchainAbiPvt.json" assert { type: "json" };
import * as creditorAbi from "../abis/creditorAbi.json" assert { type: "json" };

export const depositPvt = async (
    privateKey,
    providerUrl,
    contractAddress,
    amount,
    token,
    user
) => {
    try {
        const contract = getContract(privateKey, providerUrl, contractAddress, credChainPvtAbi.abi)
        const tx = await contract.deposit(token, amount, user, {gasPrice: 0});
        const receipt = await tx.wait();

        const returnObject = {
            "hash": tx.hash,
            "status": receipt.status
        }

        return returnObject

    } catch (error) {
        console.log(error);
        return null;

    }
}

export const requestCredit = async (
    creditOrderDto,
    privateKey,
    providerUrl,
    contractAddress
) => {
    try {
        const contract = await getContract(privateKey, providerUrl, contractAddress, creditorAbi.Abi)
        const tx = await contract.requestCredit(creditOrderDto, {gasPrice: 0});
        const receipt = await tx.wait();

        const returnObject = {
            "hash": tx.hash,
            "status": receipt.status
        }

        return returnObject

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const payCredit = async (
    orderId,
    user,
    isPaid,
    privateKey,
    providerUrl,
    contractAddress
) => {
    try {
        const contract = await getContract(privateKey, providerUrl, contractAddress, creditorAbi.Abi)

        const tx = await contract.payCredit(orderId, user, isPaid, {gasPrice: 0});
        const receipt = await tx.wait();

        const returnObject = {
            "hash": tx.hash,
            "status": receipt.status
        }

        return returnObject

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getBalanceOfTokensAvailable = async (
    privateKey,
    providerUrl,
    contractAddress,
    user,
    tokenAddress
) => {
    try {
        const contract = getContract(privateKey, providerUrl, contractAddress, credChainPvtAbi.abi)
        const balance = await contract.getBalanceOf(user, tokenAddress);

        return balance

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getUsedCollateral = async (
    privateKey,
    providerUrl,
    contractAddress,
    tokenAddress,
    user
) => {
    try {
        const contract = getContract(privateKey, providerUrl, contractAddress, credChainPvtAbi.abi)
        const usedCollateral = await contract.getCollateral(tokenAddress, user);

        return usedCollateral

    } catch (error) {
        console.log(error);
        return null;
    }
}

