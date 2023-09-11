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


export const getContract = async (privateKey, providerUrl, contractAddress, abi) => {
    try {
        const signer = await getSigner(privateKey, providerUrl);
        const contract = new ethers.Contract(contractAddress, abi, signer);

        return contract;
    } catch (error) {
        console.log(error);
        throw error;
    }
};