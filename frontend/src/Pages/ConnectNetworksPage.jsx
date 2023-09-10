import React, { useCallback, useContext, useEffect, useState } from 'react'
import PageContentWrapper from './Components/PageContentWrapper';
import { styled } from 'styled-components';
import ConnectedNetworkElement from './Components/ConnectWallet/ConnectedNetworkElement';
import { MainPurpleColor } from '../Colors';
import NetworkPlaceholder from './Components/Generic/NetworkPlaceholder';
import Web3 from 'web3';
import { LoginContext } from '../Contexts/LoginContext';
import OpenFinance from './Components/Banners/OpenFinance';
import RipioBanner from './Components/Banners/RipioBanner';
import axios from 'axios';
import { backendroute } from '../routes/routes';
/*
name: 'Ethereum',
image: '/images/icons/nomedoicone.svg'

*/
export default function ConnectNetworksPage() {

  const { isLoged } = useContext(LoginContext);

  const [showModalConnect, setShowModalConnect] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [savedNetWorks,setSavedNetworks] = useState([]);
  const [userAddress, setUserAddress] = useState(null);
  const [message, setMessage] = useState('');
  const [connect, setConnect] = useState(false);
  const [connect2, setConnect2] = useState(false);


  useEffect(() => {
    isLoged();

    const token = localStorage.getItem("token");

    const config = {
      headers: {
          Authorization: "Bearer " + token
      }
  }

  const promise = axios.get(backendroute.getNetworks, config);

    promise.then((resposta) => {
      setSavedNetworks(resposta.data);
      console.log(resposta.data, "lista");
    })

    promise.catch((erro) => {
      console.log(erro.response.data);
    })
  },[]);

  function closeModal() {
    setShowModalConnect(false);
    setSelectedWallet('');
    setSelectedNetwork('');
  }

  function openModal() {
    setShowModalConnect(true);
    if (window.ethereum) {
      if (window.ethereum.selectedAddress) {
        console.log('O site já tem permissão para interagir com o MetaMask.');
        // Adicione aqui a lógica para interagir com o MetaMask
      } else {
        console.log('O site ainda não tem permissão para interagir com o MetaMask.');
        setConnect(false);
        setConnect2(false);
        // Adicione aqui a lógica para lidar com a falta de permissão
      }
    } else {
      console.log('MetaMask não encontrado. Certifique-se de que o MetaMask está instalado.');
      // Adicione aqui a lógica para lidar com o MetaMask não instalado
    }
  }


const connectWallet = useCallback(async () => {
  if (window.ethereum) {
    try {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();

      const accounts = await window.web3.eth.getAccounts();
      if (accounts.length > 0) {
        setUserAddress(accounts[0]);
        console.log("Endereço da carteira conectada:", accounts[0]);
      }

      // ID da rede que você deseja selecionar (certifique-se de que a rede já está adicionada)
      const desiredNetworkId = '0x1';

      // Alternar para a rede desejada
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: desiredNetworkId }]
      });


      const networkData = {
        name: 'Ethereum',
        image: '/images/icons/etherium.svg',
        chainId: '0x1', // Substitua pelo endereço real se necessário
      }
     
        const token = localStorage.getItem("token");

        const config = {
          headers: {
              Authorization: "Bearer " + token
          }
      }

        axios
        .post(backendroute.postNetwork, networkData, config)
        .then((resposta) => {
        console.log('resposta do postNetwork ETHEREUM no front:',resposta)
        window.location.reload();
      })
        .catch((erro) => {
          alert(erro.response.data);
          console.log("Erro do postNetwork no front", erro);
        }); 

      setShowModalConnect(false); 
      setConnect(true);
      setConnect2(false);


    } catch (error) {
      console.error("Erro ao conectar à Ethereum:", error);
      setConnect(false);
    }
  } else {
    alert('MetaMask não encontrada. Você precisa instalar o MetaMask para usar este aplicativo.');
  }
}, []);


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

      const networkData = {
        name: 'LaChain',
        image: '/images/icons/lachain.svg',
        chainId: '0x112', // Substitua pelo endereço real se necessário
      }
     
        const token = localStorage.getItem("token");

        const config = {
          headers: {
              Authorization: "Bearer " + token
          }
      }

        axios
        .post(backendroute.postNetwork, networkData, config)
        .then((resposta) => {
          window.location.reload();
        console.log('resposta do postNetwork no front:',resposta)
        })
        .catch((erro) => {
          alert(erro.response.data);
          console.log("Erro do postNetwork no front", erro);
        }); 

      setMessage('LaChain foi adicionada com sucesso.');
      setShowModalConnect(false);
      setConnect(false);
      setConnect2(true);
    } catch (error) {
      setMessage('Erro ao adicionar LaChain: ' + error.message);
      setConnect2(false);
    }
  } else {
    setMessage('Metamask não está instalada.');
  }
};

  return (
    <PageContentWrapper>
      <PageContainer>
        <Container>
          <ConnectedNetworks>
            <h1>Redes Salvas</h1>
            <SCConnectedNetworksList>
              {
                savedNetWorks?.map(net =>{
                  return <ConnectedNetworkElement key={net.id} name={net.name} image={net.image} id={net.id} />;
                })
              }
              <ConnectedNetworkElement name="Rede Piloto RD" image={'/images/icons/tesouro.svg'} />
            </SCConnectedNetworksList>
          </ConnectedNetworks>
          <SCConnectNewNetwork>
            <h1>Salvar nova rede</h1>
            <button onClick={openModal}>Selecione a blockchain</button>
          </SCConnectNewNetwork>
        </Container>
        <RightCollumn>
          <OpenFinance />
          <RipioBanner />
        </RightCollumn>
      </PageContainer>

      {/*----------------------------MODAL---------------------------MODAL-------------------*/}


      {showModalConnect &&

        <ModalContainer onMouseDown={closeModal}>
          <ConnectWalletContainer onMouseDown={(e) => e.stopPropagation()}>
            <h2>Selecione sua carteira</h2>
            <WalletAndNetworkList>
              <WalletOrNetworkElement onClick={() => setSelectedWallet('metamask')} $selected={(selectedWallet == 'metamask').toString()}>
                <img src="/images/icons/metamask.svg" alt="" />
                <p>Metamask</p>
              </WalletOrNetworkElement>
              <WalletOrNetworkElement onClick={() => setSelectedWallet('ripio')} $selected={(selectedWallet == 'ripio').toString()}>
                <img src="/images/icons/ripio.svg" alt="" />
                <p>Ripio Wallet</p>
              </WalletOrNetworkElement>
              <NetworkPlaceholder />
            </WalletAndNetworkList>

            <h3>Selecione a rede</h3>
            <WalletAndNetworkList>
              <WalletOrNetworkElement onClick={() => setSelectedNetwork('ethereum')} $selected={(selectedNetwork == 'ethereum').toString()}>
                <img src="/images/icons/etherium.svg" alt="" />
                <p>Ethereum</p>
                {connect &&
                <h1>conectado</h1>
                }
              </WalletOrNetworkElement>
              <WalletOrNetworkElement onClick={() => setSelectedNetwork('LaChain')} $selected={(selectedNetwork == 'LaChain').toString()}>
                <img src="/images/icons/lachain.svg" alt="" />
                <p>LaChain</p>
                {connect2 &&
                <h1>conectado</h1>
                }
              </WalletOrNetworkElement>
              <NetworkPlaceholder />
            </WalletAndNetworkList>
            {selectedWallet === 'metamask' && selectedNetwork === 'ethereum' &&
            <button onClick={connectWallet} disabled={selectedWallet == '' || selectedNetwork == ''}>Conectar</button>
            }
            {selectedWallet === 'metamask' && selectedNetwork === 'LaChain' &&
            <button onClick={addLaChain} disabled={selectedWallet == '' || selectedNetwork == ''}>Conectar</button>
            }
          </ConnectWalletContainer>
        </ModalContainer>

      }
    </PageContentWrapper>
  )
}
const RightCollumn = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2.31rem;
  @media (max-width: 1000px) {
      justify-content: center;
      flex-direction: row;
      width: 100%;
  }

  @media (max-width: 500px) {
     width: 100%;
     flex-direction: column;
     justify-content: flex-start;
     align-items: center;
  }
`;

const PageContainer = styled.div`
 display: flex;
  width: 100%;
  gap: 2.31rem;
  margin-top: 44px;
  justify-content: space-between;
  padding-right: 20px;
  @media (max-width: 1000px) {
      
      flex-direction: column;
      width: 100%;
  }
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
  @media (max-width: 600px) {
    gap:1rem;
    align-items: flex-start;
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  }
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

  @media (max-width: 632px) {
      max-width: 100%;
      border-radius: 0;
  }

  h2,h3{
    @media (max-width: 632px) {
      width: 100%;
  }
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

const ConnectedNetworks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 45.375rem;
  min-height: 7.625rem;
  border-radius: 0.875rem;
  background: #FFF;
  padding: 1.56rem;
  padding-top: 0.63rem;
  @media (max-width: 1000px) {
      max-width: 100%;
  }

  h1{
    color: #0D163A;
    font-family: Plus Jakarta Sans;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem; /* 150% */
    text-align: left;
    width: 100%;
  }
`;

const SCConnectNewNetwork = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 45.375rem;
  min-height: 10.125rem;
  border-radius: 0.875rem;
  background: #FFF;
  padding: 1.56rem;
  padding-top: 0.63rem;
  @media (max-width: 1000px) {
      max-width: 100%;
  }


  h1{
    color: #0D163A;
    font-family: Plus Jakarta Sans;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem; /* 150% */
    text-align: left;
    width: 100%;
  }

  button{
    width: 100%;
    max-width: 13.125rem;
    min-height: 2.5rem;
    border-radius: 1.25rem;
    border: 1px solid rgba(153, 153, 153, 0.60);
    background: #FFF;
    margin-top: 1.7rem;

    &:enabled{
      &:hover{
        opacity: 70%;
      }
    }
  }
`;

const ModalContainer = styled.main`
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

const SCConnectedNetworksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  padding-top: 0.81rem;
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  width: 100%;
  max-width: 45.375rem;
  @media (max-width: 1000px) {
      max-width: 100%;
  }
`;