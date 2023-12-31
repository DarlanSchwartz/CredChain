import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import PageContentWrapper from './Components/PageContentWrapper'
import { styled } from 'styled-components';
import ConnectWalletFirst from './Components/Generic/ConnectWalletFirst';
import Collaterals from './Components/Collaterals/Collaterals';
import InWalletCollateralElement from './Components/CollateralAsset/InWalletCollateralElement';
import { MainPurpleColor } from '../Colors';
import Offer from './Components/Collaterals/Offer';
import { LoginContext } from '../Contexts/LoginContext';
import OpenFinance from './Components/Banners/OpenFinance';
import NetworkPlaceholder from './Components/Generic/NetworkPlaceholder';
import Web3 from 'web3';
import { ThreeDots } from 'react-loader-spinner';
import CollateralSlideBar from './Components/Collaterals/CollateralSlideBar';
import { Tooltip as ReactTooltip } from "react-tooltip";
import axios from 'axios';
import { API } from '../routes/routes';
import {ethers} from 'ethers';
const ABI = {
  "abi": [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "name": "Deposit",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "inputs": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "token",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "isEth",
                "type": "bool"
              }
            ],
            "internalType": "struct DepositDto",
            "name": "depositDto",
            "type": "tuple"
          }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_user",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_token",
            "type": "address"
          }
        ],
        "name": "getBalanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          }
        ],
        "name": "isAcceptedToken",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_token",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_recipient",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_user",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "releaseLockedTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          }
        ],
        "name": "setAcceptedToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
};

const MOCKdepositedCurrencies = [
  {
    name: 'WstETH',
    price: '0',
    units: 0,
    total_value: 0,
    image: '/images/icons/lido.svg',
    used: 0
  }
];

const MOCKinUserWalletCurrencies = [
  {
    name: 'Ethereum',
    currencies: [
      {
        name: 'stETH',
        units: 0,
        totalValue: 0,
        image: '/images/icons/stETH.svg',
      },
      {
        name: 'ETH',
        units: 0,
        totalValue: 0,
        image: '/images/icons/ETH.svg',
      },
      {
        name: 'wstETH',
        units: 0,
        totalValue: 0,
        image: '/images/icons/wst.svg',
      }
    ]
  },
  {
    name: 'Lachain',
    currencies: [
      {
        name: 'LAC',
        units: 1,
        totalValue: 10,
        image: '/images/icons/lachain.svg',
      }
    ]
  }
];

//
export default function LoansPage({ connected = true }) {
  // Check if the user is logged-in
  const { isLoged } = useContext(LoginContext);
  const transactionQuantityInputRef = useRef();
  // Not functional, needs to be updated in the future?!
  const [isConnected, setIsConnected] = useState(connected);
  const [showModal, setShowModal] = useState(false);
  // User is looking at offers page
  const [askingForLoans, setAskingForLoans] = useState(false);
  // In user's wallet currencies
  const [userCurrencies, setUserCurrencies] = useState(null);
  // Its for showing purposes on deposit/withdraw modal
  const [currentTransactionCoin, setCurrentTransactionCoin] = useState(null);
  // User balance in our possession
  const [userDepositedBalance, setUserDepositedBalance] = useState(null);
  // User selected a wallet in the wallet modal
  const [hasSelectedWalletForDeposit, setHasSelectedWalletForTransaction] = useState(false);
  // Show modal transaction wallets
  const [showTransactionWallets, setShowTransactionWallets] = useState(false);
  //Just the wallet name
  const [selectedTransactionWalletName, setSelectedTransactionWalletName] = useState('');
  //Network id, like 0x1
  const [selectedTransactionNetwork, setSelectedNetwork] = useState('');

  const [selectedTransactionWalletAddress, setSelectedTransactionWalletAddress] = useState('');
  const [selectedTransactionNetworkAddres, setSelectedTransactionNetworkAddress] = useState('');
  // Amount to deposit or withdraw
  const [transactionQuantity, setTransactionQuantity] = useState('0');

  // User is requesting a transaction for the API
  const [inTransactionProcess, setInTransactionProcess] = useState(false);
  // Differentiate the modal window elements
  const [isDepositTransaction, setIsDepositTransaction] = useState(false);

  useEffect(() => {
    isLoged();
    getUserInWalletCurrencies();
    getUserBalance();
    // TODO: check if user is connected via metamask, THEN -> setIsConnected( false or true);
  }, []);

  function getUserBalance() {
    const responseData = MOCKdepositedCurrencies;
    // TODO: Get user balance
    // const userBody = {
    //   user: '',
    //   tokenAddress: ''
    // };

    // axios.post(API.getBalanceOfTokensLockedByUser, userBody, { headers: { Authorization: localStorage.getItem('token') } })
    //   .then((res) => {

    //   }).catch(error => {
    //     console.log(error);
    //   });
    setUserDepositedBalance(responseData);
  }
  async function makeDeposit(tokenAddress, amount, isEth) {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    const depositDto = {
      token: tokenAddress,
      amount: amount,
      isEth: isEth
    };
    try {
      const contract = new ethers.Contract("0xF7713Ef80DCe2DA67548c25c2B581D6c7acf3537", ABI.abi, signer);
      console.log(contract);
      const tx = await contract.deposit(depositDto,{gasLimit: 1000000});
      console.log(`Transaction hash: ${tx.hash}`);
      
      const ret = await tx.wait();  // Wait for transaction confirmation
      console.log(ret.status);
      console.log('Transaction has been confirmed!');
    } catch (error) {
      console.error(`Failed to send transaction: ${error.message}`);
    }
  }

  function getUserInWalletCurrencies() {
    // TODO: Get user currencies
    const responseData = MOCKinUserWalletCurrencies;
    setUserCurrencies(responseData);
  }

  async function startTransaction(type = "deposit", transaction) {
    setInTransactionProcess(true);
    getWalletAddress();
    switch (type) {
      case "deposit":
        console.log('sad');
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
          const accounts = await window.web3.eth.getAccounts();
          if (accounts.length > 0) setSelectedTransactionWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          alert('MetaMask não encontrada. Você precisa instalar o MetaMask para usar este aplicativo.');
        }
        makeDeposit('0x65774858b7dC5b2E6A8ebD69a1Cd495b82e235f4',10000000000,false);
    return;

        // TODO: Deposit coins on user wallet
        // const depositBody = {
        //   amount: Number(transaction.amount),
        //   token: '',
        //   user: ''
        // };
        // axios.post(API.depositPvt, depositBody, { headers: { Authorization: localStorage.getItem('token') } })
        //   .then((res) => {

        //   }).catch(error => {
        //     console.log(error);
        //   });
        break;
      case "checkout":
        const withdrawBody = {};
        // TODO: Needs a Withdraw endpoint
        // axios.post(API,withdrawBody,{headers:{Authorization:localStorage.getItem('token')}})
        // .then((res) =>{

        // }).catch(error =>{
        //   console.log(error);
        // });
        break;
    }
  }

  function startDepositProcess(asset) {
    setCurrentTransactionCoin(asset);
    setShowModal(true);
    setIsDepositTransaction(true);
    //console.log(asset);
  }

  function startCheckoutProcess(asset) {
    setCurrentTransactionCoin(asset);
    setIsDepositTransaction(false);
    setShowModal(true);
    //console.log(asset);
  }

  // asset =>

  /*
  {
    image:"/images/icons/lido.svg",
    name: "WstETH",
    price: "0",
    total_used: 0,
    total_value: 0,
    units: 0
  }
  
  */
  function viewShowOffers(asset) {

    setAskingForLoans(true);
  }

  function closeModal() {
    setShowModal(false);
    setCurrentTransactionCoin(null);
    setSelectedTransactionWalletName('');
    setSelectedNetwork('');
    setHasSelectedWalletForTransaction(false);
  }

  function userSelectedWalletForDeposit(networkAddress, name) {
    setHasSelectedWalletForTransaction(true);
    setShowTransactionWallets(false);
    setSelectedTransactionNetworkAddress(networkAddress);
    setSelectedTransactionWalletName(name);
  }
  async function getWalletAddress() {
    if (window.ethereum) {
      try {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await window.web3.eth.getAccounts();
        if (accounts.length > 0) setSelectedTransactionWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (error) {
        console.error("Erro ao conectar à Ethereum:", error);
      }
    } else {
      alert('MetaMask não encontrada. Você precisa instalar o MetaMask para usar este aplicativo.');
    }
  }
  const addEthereumWallet = async () => {
    if (window.ethereum) {
      try {
        const ethereum = window.ethereum;
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x1',
              chainName: 'Ethereum Mainnet',
              nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18
              },
              rpcUrls: ['https://mainnet.infura.io/v3/604ad354539a45f5b33ff874e90fd3d7'],
              blockExplorerUrls: ['https://etherscan.io/']
            },
          ],
        });
        userSelectedWalletForDeposit('0x1', 'Ethereum Mainnet');

      } catch (error) {
        console.error("Erro ao conectar à Ethereum:", error);
      }
    } else {
      alert('MetaMask não encontrada. Você precisa instalar o MetaMask para usar este aplicativo.');
    }
  }
  const addLaChainWallet = async () => {
    if (window.ethereum) {
      try {
        const ethereum = window.ethereum;
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x112', // ID da rede LaChain
              chainName: 'LaChain',
              nativeCurrency: {
                name: 'LaCoin',
                symbol: 'LAC',
                decimals: 18,
              },
              rpcUrls: ['https://rpc1.mainnet.lachain.network/'], // URL RPC da LaChain
              blockExplorerUrls: ['https://explorer.lachain.network/'], // URL do explorador de blocos
            },
          ],
        });
        userSelectedWalletForDeposit('0x112', 'LaChain');
      } catch (error) {
        console.error("Erro ao conectar à LaChain:", error);
      }
    } else {

    }
  };

  const addMumbaiWallet = async () => {
    if (window.ethereum) {
      try {
        const ethereum = window.ethereum;
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x13881', // ID da rede LaChain
              chainName: 'Mumbai',
              nativeCurrency: {
                name: 'Matic',
                symbol: 'MATIC',
                decimals: 18,
              },
              rpcUrls: ['https://rpc-mumbai.maticvigil.com'], // URL RPC da LaChain
              blockExplorerUrls: ['https://mumbai.polygonscan.com'], // URL do explorador de blocos
            },
          ],
        });
        userSelectedWalletForDeposit('0x112', 'LaChain');
      } catch (error) {
        console.error("Erro ao conectar à LaChain:", error);
      }
    } else {

    }
  };
  return (
    <PageContentWrapper>
      <PageContainer>
        <Container>
          {/*Maybe remove later?! -------------NO NETWORKS FOUND--------------- */}

          {!isConnected && !askingForLoans && <ConnectWalletFirst />}

          {/*-------------NETWORKS FOUND AND SHOW COLLATERALS-- CHECK line 25------------- */}

          <Collaterals
            assets={userDepositedBalance}
            ask_loan_start_event={viewShowOffers}
            show_actions={!askingForLoans}
            ask_checkout_start_event={startCheckoutProcess}
          />
          {isConnected && !askingForLoans &&
            <InWalletCollaterals >
              {/* Map here the coins in the user wallet */}
              {userCurrencies?.map(chain => {
                return (
                  <InWalletCollateralElement
                    key={chain.name}
                    deposit_btn_click={startDepositProcess}
                    name={chain.name}
                    currencies={chain.currencies}
                  />
                );
              })}
            </InWalletCollaterals>
          }

          {askingForLoans &&
            <AvailableOffers>
              <Offer />
            </AvailableOffers>
          }
        </Container>
        {/*--------------ASKING FOR LOANS--------------- */}

        <RightCollumn>
          <OpenFinance />
        </RightCollumn>
      </PageContainer>

      {/*--------------MODAL--------------- */}

      {showModal && !askingForLoans &&
        <ModalDepositCollateral onMouseDown={() => {
          if (!inTransactionProcess) {
            closeModal();
          }
        }}>
          {
            hasSelectedWalletForDeposit ?
              <ContainerDepositCoin $h={isDepositTransaction ? 237 : 290} onMouseDown={(e) => e.stopPropagation()}>

                {/*----------------------------- */}

                <DepositQuantityContainer>
                  {
                    !isDepositTransaction &&

                    <CoinInfoWithdraw>
                      <ReactTooltip
                        id="my-tooltip-1"
                        place="bottom"
                        content={`Você pode realizar o saque de ${100 - currentTransactionCoin?.total_used}%. pois ${currentTransactionCoin?.total_used}% estão como garantia`}
                        style={{ background: "#FAFAFA", color: "black" }}
                      />
                      <div className='left'>
                        <img src="/images/icons/lido.svg" alt="" />
                        <p>wstETH</p>
                      </div>
                      <CollateralSlideBar show_tooltip={true} value={currentTransactionCoin?.total_used} />
                    </CoinInfoWithdraw>
                  }
                  <h1>Quantidade</h1>
                  <InputBorderBoxContainer>
                    <InputAndMiniValueContainer>
                      <input
                        disabled={inTransactionProcess}
                        max={currentTransactionCoin?.total_value}
                        value={transactionQuantity}
                        onChange={(e) => setTransactionQuantity(e.target.value)}
                        ref={transactionQuantityInputRef} type="number" placeholder='00.00' />
                      <p>R$ {Number(transactionQuantity).toFixed(2).toString().replace('.', ',')}</p>
                    </InputAndMiniValueContainer>
                    <CoinInfoAndMaxValue>
                      <CoinameAndIcon>
                        <img
                          src={isDepositTransaction ? currentTransactionCoin?.image : '/images/icons/stETH.svg'}
                          alt={isDepositTransaction ? currentTransactionCoin?.name : 'stETH'} />
                        <p>{isDepositTransaction ? currentTransactionCoin?.name : 'stETH'}</p>
                      </CoinameAndIcon>
                      <p className='max-amount'>Saldo Máximo: {currentTransactionCoin?.total_value}</p>
                    </CoinInfoAndMaxValue>
                  </InputBorderBoxContainer>
                </DepositQuantityContainer>

                {/*----------------------------- */}

                <button
                  onClick={() => startTransaction(isDepositTransaction ? "deposit" : "checkout", { amount: transactionQuantityInputRef.current.value })}
                  disabled={Number(transactionQuantity) <= 0 || inTransactionProcess}
                  className='deposit-btn'>
                  {
                    inTransactionProcess ?
                      <ThreeDots
                        type="ThreeDots"
                        color="#FFFFFF"
                        height={20}
                        width={50}
                      /> : <>{isDepositTransaction ? "Depositar" : "Sacar"}</>
                  }
                </button>

              </ContainerDepositCoin>

              : showTransactionWallets ?


                <ConnectWalletContainer onMouseDown={(e) => e.stopPropagation()}>
                  <h2>Selecione sua carteira</h2>
                  <WalletAndNetworkList>
                    <WalletOrNetworkElement $disabled={'false'} onClick={() => setSelectedTransactionWalletName('metamask')} $selected={(selectedTransactionWalletName == 'metamask').toString()}>
                      <img src="/images/icons/metamask.svg" alt="" />
                      <p>Metamask</p>
                    </WalletOrNetworkElement>
                    <WalletOrNetworkElement $disabled={'true'} $selected={'false'}>
                      <img src="/images/icons/ripio.svg" alt="" />
                      <p>Ripio Wallet</p>
                      <div className='overlay'>
                        <p>Em breve</p>
                      </div>
                    </WalletOrNetworkElement>
                    <NetworkPlaceholder />
                  </WalletAndNetworkList>

                  <h3>Selecione a rede</h3>
                  <WalletAndNetworkList>
                    <WalletOrNetworkElement $disabled={'false'} onClick={() => setSelectedNetwork('ethereum')} $selected={(selectedTransactionNetwork == 'ethereum').toString()}>
                      <img src="/images/icons/etherium.svg" alt="" />
                      <p>Ethereum</p>
                    </WalletOrNetworkElement>
                    {/* <WalletOrNetworkElement $disabled={'false'} onClick={() => setSelectedNetwork('Mumbai')} $selected={(selectedTransactionNetwork == 'Mumbai').toString()}>
                      <img src="/images/icons/polygon.svg" alt="" />
                      <p>Mumbai</p>
                    </WalletOrNetworkElement> */}
                    <NetworkPlaceholder/>
                    <WalletOrNetworkElement $disabled={'false'} onClick={() => setSelectedNetwork('LaChain')} $selected={(selectedTransactionNetwork == 'LaChain').toString()}>
                      <img src="/images/icons/lachain.svg" alt="" />
                      <p>LaChain</p>
                    </WalletOrNetworkElement>
                    
                  </WalletAndNetworkList>
                  {selectedTransactionWalletName === 'metamask' && selectedTransactionNetwork === 'ethereum' &&
                    <button onClick={addEthereumWallet} disabled={selectedTransactionWalletName == '' || selectedTransactionNetwork == ''}>Conectar</button>
                  }
                  {selectedTransactionWalletName === 'metamask' && selectedTransactionNetwork === 'LaChain' &&
                    <button onClick={addLaChainWallet} disabled={selectedTransactionWalletName == '' || selectedTransactionNetwork == ''}>Conectar</button>
                  }
                  {selectedTransactionWalletName === 'metamask' && selectedTransactionNetwork === 'Mumbai' &&
                    <button onClick={addMumbaiWallet} disabled={selectedTransactionWalletName == '' || selectedTransactionNetwork == ''}>Conectar</button>
                  }
                </ConnectWalletContainer>
                :
                <SelectWalletFirstBox onMouseDown={(e) => e.stopPropagation()}>
                  <h1>Para {isDepositTransaction ? "depositar" : "sacar"} seu colateral, conecte sua carteira!</h1>
                  <button onClick={() => setShowTransactionWallets(true)}>Conectar</button>
                </SelectWalletFirstBox>


          }
        </ModalDepositCollateral>
      }
    </PageContentWrapper>
  )
}

const CoinInfoWithdraw = styled.div`
width: 100%;
height: 48px;
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 10px;

.left{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  img{
    width: 40px;
    height: 40px;
  }
  p{
    color: #0D163A;
    font-family: Plus Jakarta Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
  }
}
`;

const SelectWalletFirstBox = styled.div`
  background-color: white;
  height: 237px;
  max-width: 33.75rem;
  width: 100%;
  padding: 20px;
  border-radius: 1.25rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5rem;

  h1{
    color: #A8A8A8;
    text-align: center;
    font-family: Plus Jakarta Sans;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem;
  }
  
  button{
    color: #FFF;
    font-family: Plus Jakarta Sans;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem;
    margin-top: 1.62rem;
    border: 0;
    width: 100%;
    max-width: 11.8125rem;
    min-height: 2rem;
    border-radius: 12rem;
    border: 1px solid transparent;

    &:enabled{
      background-color: ${MainPurpleColor};
      &:hover{
        background-color: white;
        color: ${MainPurpleColor};
        border: 1px solid ${MainPurpleColor}
      }
    }

  }
`;

const RightCollumn = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2.31rem;
  width: 100%;
  max-width:  21.375rem;
`;

const PageContainer = styled.div`
 display: flex;
  width: 100%;
  gap: 2.31rem;
  margin-top: 44px;
  justify-content: space-between;
  padding-right: 20px;
`;

const AvailableOffers = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  max-width: 45.375rem;
  gap: 1.56rem;
`;


const CoinInfoAndMaxValue = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  align-items: flex-end;

  .max-amount{
    color: #A8A8A8;
    font-family: Plus Jakarta Sans;
    font-size: 0.625rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 240% */
    height: 1.5rem;
    user-select: none;
  }
`;

const CoinameAndIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  img{
    width: 1.9375rem;
    height: 1.9375rem;
    border-radius: 1.9375rem;
  }
`;

const InputAndMiniValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  max-width: 19rem;
  width: 100%;
  input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number]{
        -moz-appearance: textfield;
        appearance: textfield;
    }
  p{
    color: #A8A8A8;
    font-family: Plus Jakarta Sans;
    font-size: 0.625rem;
    font-style: normal;
    font-weight: 400;
    line-height:0.625rem;
    padding-left: 3px;
  }
  input{
    border: 0;
    font-family: Plus Jakarta Sans;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem;
    width: 100%;
    &:focus{
      outline: 0;
    }
    &::placeholder{
      color: #9c9c9c;
    }
  }
`;

const InputBorderBoxContainer = styled.div`
  width: 100%;
  height: 4.5rem;
  border-radius: 1.25rem;
  border: 1px solid #CFCFCF;
  background: rgba(217, 217, 217, 0.00);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1.13rem;
  padding-right: 1.13rem;
`;

const ContainerDepositCoin = styled.div`
  width: 100%;
  max-width: 33.75rem;
  height: ${(props) => props.$h + "px"};
  border-radius: 1.25rem;
  background: #FFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  gap: 0.8rem;
  padding-top: 2.31rem;
  padding-bottom: 2.31rem;
  

  .deposit-btn{
    color: #FFF;
    font-family: Plus Jakarta Sans;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem; /* 100% */
    margin-top: 1.62rem;
    border: 0;
    width: 100%;
    min-height: 3.25rem;
    border-radius: 12rem;
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    justify-content: center;

    &:enabled{
      background-color: ${MainPurpleColor};
      &:hover{
        background-color: white;
        color: ${MainPurpleColor};
        border: 1px solid ${MainPurpleColor}
      }
    }

    &:disabled{
      background-color: #D9D9D9;
      cursor: not-allowed;
    }
  }
`;

const DepositQuantityContainer = styled.div`
  
width: 100%;
  h1{
    color: #A8A8A8;
    font-family: Plus Jakarta Sans;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem;
  }
`;

const ModalDepositCollateral = styled.main`
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

`;


const InWalletCollaterals = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
    align-items: center;
  gap: 20px;
  margin-bottom: 40px;
`;


const Container = styled.div`
  display: flex;
  gap: 22px;
  flex-direction: column;
  gap: 3.19rem;
  max-width: 45.375rem;
  width: 100%;
  align-items: center;
`;

const WalletOrNetworkElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #F3F3F3;
  width: 8.25rem;
  height: 8.25rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 3px solid ${(props) => props.$selected == 'true' ? MainPurpleColor : 'transparent'};
  background: #F3F3F3;
  cursor: ${(props) => props.$disabled == 'false' ? 'pointer' : 'not-allowed'};
  overflow: hidden;
  position: relative;
  .overlay{
    width: 100%;
    height: 100%;
    border-radius: 1.25rem;
    background-color: rgba(255,255,255,0.8);
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    p{
      color: ${MainPurpleColor};
      font-family: Plus Jakarta Sans;
      font-size: 20px;
    }
  }
  img{
    width: 4.5rem;
    height: 4.5rem;
    flex-shrink: 0;
    border-radius: 50%;
  }

  p{
    color: #0D163A;
    font-family: Plus Jakarta Sans;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5rem;
    padding-top: 0.5rem;
  }

  &:hover{
    border: 3px solid ${(props) => props.$selected == 'true' && props.$disabled == 'false' ? MainPurpleColor : props.$disabled == 'false' ? 'black' : 'transparent'};;
  }

  h1{
    color: #ad00ff;
    font-size: 0.800rem;
  }
`;

const WalletAndNetworkList = styled.div`
  display: flex;
  padding: 1.37rem;
  gap: 3.37rem;
`;

const ConnectWalletContainer = styled.div`
  width: 100%;
  max-width: 40.5rem;
  min-height: 20rem;
  max-height: 32.75rem;
  border-radius: 1.25rem;
  background: #FFF;
  padding: 2.05rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2,h3{
    width: 32rem;
    color: #0D163A;
    font-family: Plus Jakarta Sans;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem; /* 150% */
  }

  button{
    width: 100%;
    max-width: 8.25rem;
    min-height: 2.375rem;
    border-radius: 1.25rem;
    background-color: ${MainPurpleColor};
    border: 1px solid transparent;
    color: #FFF;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem;
    align-self: center;

    &:enabled{
      &:hover{
      color: ${MainPurpleColor};
      border: 1px solid ${MainPurpleColor};
      background-color: #FFF;
      }
    }

    &:disabled{
      cursor: not-allowed;
      opacity: 50%;
    }
  }
`;