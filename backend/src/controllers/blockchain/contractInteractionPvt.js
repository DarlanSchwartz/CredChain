import { getContract } from './utils';
import * as credChainPvtAbi from "../abis/credchainAbiPvt.json"
import * as creditorAbi from "../abis/creditorAbi.json"

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
        const tx = await contract.deposit(token, amount, user);
        const receipt = await tx.wait();

        const returnObject = {
            "hash": tx.hash,
            "status": receipt.status
        }

        return returnObject

    } catch (error) {
        console.log(error);
        throw error;

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
        const tx = await contract.requestCredit(creditOrderDto);
        const receipt = await tx.wait();

        const returnObject = {
            "hash": tx.hash,
            "status": receipt.status
        }

        return returnObject

    } catch (error) {
        console.log(error);
        throw error;
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

        const tx = await contract.payCredit(orderId, user, isPaid);
        const receipt = await tx.wait();

        const returnObject = {
            "hash": tx.hash,
            "status": receipt.status
        }

        return returnObject

    } catch (error) {
        console.log(error);
        throw error;
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
        throw error;
    }
}

