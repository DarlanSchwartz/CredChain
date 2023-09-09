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
const MOCKdepositedCurrencies = [
  {
    name: 'WstETH',
    price: '500',
    units: 50,
    total_value: 200,
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
        name: 'UXD',
        units: 0,
        totalValue: 10,
        image: '/images/icons/uxd.svg',
      }
    ]
  }
];

//
export default function LoansPage({ connected = true }) {

  const { isLoged } = useContext(LoginContext);

  const [isConnected, setIsConnected] = useState(connected);
  const [showModal, setShowModal] = useState(false);
  const [askingForLoans, setAskingForLoans] = useState(false);
  const [userCurrencies, setUserCurrencies] = useState(null);
  const [currentTransactionCoin, setCurrentTransactionCoin] = useState(null);
  const [hasSelectedWalletForDeposit, setHasSelectedWalletForTransaction] = useState(false);
  const [showTransactionWallets, setShowTransactionWallets] = useState(false);
  const [selectedTransactionWallet, setSelectedTransactionWalletName] = useState('');
  const [selectedTransactionNetwork, setSelectedNetwork] = useState('');
  const [selectedTransactionWalletAddress, setSelectedTransactionWalletAddress] = useState('');
  const [selectedTransactionNetworkAddres, setSelectedTransactionNetworkAddress] = useState('');
  const [transactionQuantity, setTransactionQuantity] = useState('0');
  const transactionQuantityInputRef = useRef();
  const [inTransactionProcess, setInTransactionProcess] = useState(false);
  const [isDepositTransaction, setIsDepositTransaction] = useState(false);

  useEffect(() => {
    isLoged();
    setUserCurrencies(MOCKinUserWalletCurrencies);
  }, []);

  function startTransaction(type = "deposit", transaction) {
    setInTransactionProcess(true);
    switch (type) {
      case "deposit":
        break;
      case "checkout":

        break;
    }
    setTimeout(() => {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
      closeModal();
    }, 4000);
  }

  function startDepositProcess(asset) {
    setCurrentTransactionCoin(asset);
    setShowModal(true);
    getWalletAddress();
    setIsDepositTransaction(true);
    //console.log(asset);
  }

  function startCheckoutProcess(asset) {
    setCurrentTransactionCoin(asset);
    setIsDepositTransaction(false);
    setShowModal(true);
    getWalletAddress();
    //console.log(asset);
  }

  function askForALoan(asset) {
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
  const addEthereum = async () => {
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
  const addLaChain = async () => {
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
  return (
    <PageContentWrapper>
      <PageContainer>
        <Container>
          {/*-------------NO NETWORKS FOUND--------------- */}

          {!isConnected && !askingForLoans && <ConnectWalletFirst />}

          {/*-------------NETWORKS FOUND AND SHOW COLLATERALS-- CHECK line 25------------- */}

          <Collaterals
            assets={MOCKdepositedCurrencies}
            ask_loan_start_event={askForALoan}
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
                  onClick={() => startTransaction(isDepositTransaction ? "deposit" : "checkout", {})}
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
                    <WalletOrNetworkElement onClick={() => setSelectedTransactionWalletName('metamask')} $selected={(selectedTransactionWallet == 'metamask').toString()}>
                      <img src="/images/icons/metamask.svg" alt="" />
                      <p>Metamask</p>
                    </WalletOrNetworkElement>
                    <WalletOrNetworkElement onClick={() => setSelectedTransactionWalletName('ripio')} $selected={(selectedTransactionWallet == 'ripio').toString()}>
                      <img src="/images/icons/ripio.svg" alt="" />
                      <p>Ripio Wallet</p>
                    </WalletOrNetworkElement>
                    <NetworkPlaceholder />
                  </WalletAndNetworkList>

                  <h3>Selecione a rede</h3>
                  <WalletAndNetworkList>
                    <WalletOrNetworkElement onClick={() => setSelectedNetwork('ethereum')} $selected={(selectedTransactionNetwork == 'ethereum').toString()}>
                      <img src="/images/icons/etherium.svg" alt="" />
                      <p>Ethereum</p>
                    </WalletOrNetworkElement>
                    <WalletOrNetworkElement onClick={() => setSelectedNetwork('LaChain')} $selected={(selectedTransactionNetwork == 'LaChain').toString()}>
                      <img src="/images/icons/lachain.svg" alt="" />
                      <p>LaChain</p>
                    </WalletOrNetworkElement>
                    <NetworkPlaceholder />
                  </WalletAndNetworkList>
                  {selectedTransactionWallet === 'metamask' && selectedTransactionNetwork === 'ethereum' &&
                    <button onClick={addEthereum} disabled={selectedTransactionWallet == '' || selectedTransactionNetwork == ''}>Conectar</button>
                  }
                  {selectedTransactionWallet === 'metamask' && selectedTransactionNetwork === 'LaChain' &&
                    <button onClick={addLaChain} disabled={selectedTransactionWallet == '' || selectedTransactionNetwork == ''}>Conectar</button>
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
  cursor: pointer;
  overflow: hidden;
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
    border: 3px solid ${(props) => props.$selected == 'true' ? MainPurpleColor : 'black'};;
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