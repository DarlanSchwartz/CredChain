import { getContract } from './utils';
import { abi } from "../abis/credchainAbi.json"

export const setAcceptedTokens = async (
    privateKey,
    providerUrl,
    contractAddress,
    tokenAddress,
    isAccepted
) => {
    try {
        const contract = getContract(privateKey, providerUrl, contractAddress, abi)
        const tx = await contract.setAcceptedTokens(tokenAddress, isAccepted);
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

export const releaseLockedTokens = async (
    privateKey,
    providerUrl,
    contractAddress,
    tokenAddress,
    recipient,
    user,
    amount
) => {
    try {
        const contract = getContract(privateKey, providerUrl, contractAddress, abi)
        const tx = await contract.releaseLockedTokens(tokenAddress, recipient, user, amount);
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

export const getBalanceOfTokensLockedByUser = async (
    privateKey,
    providerUrl,
    contractAddress,
    user,
    tokenAddress
) => {
    try {
        const contract = getContract(privateKey, providerUrl, contractAddress, abi)
        const balance = await contract.getBalanceOf(user, tokenAddress);

        return balance

    } catch (error) {
        console.log(error);
        throw error;
    }
}



