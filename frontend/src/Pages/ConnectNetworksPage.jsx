import React, { useCallback, useState } from 'react'
import PageContentWrapper from './Components/PageContentWrapper';
import { styled } from 'styled-components';
import ConnectedNetworkElement from './Components/ConnectWallet/ConnectedNetworkElement';
import { MainPurpleColor } from '../Colors';
import NetworkPlaceholder from './Components/Generic/NetworkPlaceholder';
import Web3 from 'web3';


export default function ConnectNetworksPage() {
  const [showModalConnect, setShowModalConnect] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [userAddress, setUserAddress] = useState(null);
  function closeModal() {
    setShowModalConnect(false);
    setSelectedWallet('');
    setSelectedNetwork('');
  }

  function openModal() {
    setShowModalConnect(true);
  }
  
  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();

        const accounts = await window.web3.eth.getAccounts();
        if (accounts.length > 0) {
            setUserAddress(accounts[0])
            console.log("Endereço da carteira conectada:", accounts[0]);
        }
        const network = {
          chainId: '0x1',
          chainName: 'Ethereum Mainnet',
          nativeCurrency: {
              name: 'Ether',
              symbol: 'ETH',
              decimals: 18
          },
          rpcUrls: ['https://mainnet.infura.io/v3/604ad354539a45f5b33ff874e90fd3d7'],
          blockExplorerUrls: ['https://etherscan.io/']
      };
      

        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [network]
        });
        
    } else {
        alert('MetaMask não encontrada. Você precisa instalar o MetaMask para usar este aplicativo.');
    }
}, []);

  return (
    <PageContentWrapper>
      <Container>
        <ConnectedNetworks>
          <h1>Redes Conectadas</h1>
          <SCConnectedNetworksList>
            <ConnectedNetworkElement name="Etherium" image={'/images/icons/ETH.svg'} />
            <ConnectedNetworkElement name="Rede Piloto RD" image={'/images/icons/tesouro.svg'} />
          </SCConnectedNetworksList>
        </ConnectedNetworks>
        <SCConnectNewNetwork>
          <h1>Conectar nova rede</h1>
          <button onClick={openModal}>Selecione a blockhain</button>
        </SCConnectNewNetwork>
      </Container>

      {/*----------------------------MODAL---------------------------MODAL-------------------*/}


      {showModalConnect &&

        <ModalContainer onClick={closeModal}>
          <ConnectWalletContainer onClick={(e) => e.stopPropagation()}>
            <h2>Selecione sua carteira</h2>
            <WalletAndNetworkList>
              <WalletOrNetworkElement onClick={() => setSelectedWallet('metamask')} $selected={(selectedWallet == 'metamask').toString()}>
                <img src="/images/icons/metamask.svg" alt="" />
                <p>Metamask</p>
              </WalletOrNetworkElement>
              <NetworkPlaceholder />
              <NetworkPlaceholder />
            </WalletAndNetworkList>

            <h3>Selecione a rede</h3>
            <WalletAndNetworkList>
              <WalletOrNetworkElement onClick={() => setSelectedNetwork('etherium')} $selected={(selectedNetwork == 'etherium').toString()}>
                <img src="/images/icons/etherium.svg" alt="" />
                <p>Etherium</p>
              </WalletOrNetworkElement>
              <WalletOrNetworkElement onClick={() => setSelectedNetwork('piloto')} $selected={(selectedNetwork == 'piloto').toString()}>
                <img src="/images/icons/piloto.svg" alt="" />
                <p>Rede Piloto RD</p>
              </WalletOrNetworkElement>
              <NetworkPlaceholder />
            </WalletAndNetworkList>
            <button onClick={connectWallet} disabled={selectedWallet == '' || selectedNetwork == ''}>Conectar</button>
          </ConnectWalletContainer>
        </ModalContainer>

      }
    </PageContentWrapper>
  )
}

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

  h2,h3{
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
  margin-top: 4rem;
  padding: 1.56rem;
  padding-top: 0.63rem;
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
  align-items: center;
  flex-direction: column;
  gap: 2rem;
`;