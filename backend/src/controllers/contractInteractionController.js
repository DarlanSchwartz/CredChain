import { ethers } from "ethers"; //biblioteca JavaScript para interagir com a etherium
import * as credchainAbi from "./abis/credchainAbi.json"; //A ABI descreve como interagir com o contrato inteligente.
import * as creditorAbi from "./abis/creditorAbi.json";
import * as credchainAbiPvt from "./abis/credchainAbiPvt.json";

const getSigner = async (privateKey, providerUrl) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    const wallet = new ethers.Wallet(privateKey, provider);

    const signer = wallet.connect(provider);

    return signer;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


const getContract = async (privateKey, providerUrl, contractAddress, abi) => {
  try {
    const signer = await getSigner(privateKey, providerUrl);
    const contract = new ethers.Contract(contractAddress, abi, signer);

    return contract;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


const requestCredit = async (creditOrderDto, privateKey, providerUrl, contractAddress) => {
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
};
