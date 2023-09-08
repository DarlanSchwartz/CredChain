import React, { useContext, useEffect, useState } from 'react'
import PageContentWrapper from './Components/PageContentWrapper'
import { styled } from 'styled-components';
import ConnectWalletFirst from './Components/Generic/ConnectWalletFirst';
import Collaterals from './Components/Collaterals/Collaterals';
import InWalletCollateralElement from './Components/CollateralAsset/InWalletCollateralElement';
import { MainPurpleColor } from '../Colors';
import Offer from './Components/Collaterals/Offer';
import { LoginContext } from '../Contexts/LoginContext';
import OpenFinance from './Components/Banners/OpenFinance';

export default function LoansPage({ connected = true }) {

  const { isLoged } = useContext(LoginContext);

  const [isConnected, setIsConnected] = useState(connected);
  const [showModal, setShowModal] = useState(false);
  const [askingForLoans, setAskingForLoans] = useState(false);
  
  useEffect(() => {
    isLoged();
  })
  
  function askForALoan(assets) {
    setAskingForLoans(true);
  }
  return (
    <PageContentWrapper>
      <PageContainer>
      <Container>
        {/*-------------NO NETWORKS FOUND--------------- */}

        {!isConnected && !askingForLoans && <ConnectWalletFirst />}

        {/*-------------NETWORKS FOUND AND SHOW COLLATERALS--------------- */}

        {isConnected && !askingForLoans &&
          <>
            <Collaterals assets={[1]} ask_loan_start_event={askForALoan} />
            <InWalletCollaterals >
              <InWalletCollateralElement deposit_btn_click={() => setShowModal(true)} name='Etherium' currency={{ name: 'Something', units: 5000, totalValue: 500.00 }} />
            </InWalletCollaterals>
          </>
        }
      </Container>
      <RightCollumn>
        <OpenFinance/>
      </RightCollumn>
      </PageContainer>

      {/*--------------ASKING FOR LOANS--------------- */}

      {askingForLoans &&

        <AvailableOffers>
          <Offer />
        </AvailableOffers>
      }

      {/*--------------MODAL--------------- */}

      {showModal && !askingForLoans &&
        <ModalDepositCollateral onMouseDown={() => setShowModal(false)}>
          <ContainerDepositCoin onMouseDown={(e) => e.stopPropagation()}>

            {/*----------------------------- */}

            <DepositQuantityContainer>
              <h1>Quantidade</h1>
              <InputBorderBoxContainer>
                <InputAndMiniValueContainer>
                  <input type="number" placeholder='00.00' />
                  <p>R$ 00,00</p>
                </InputAndMiniValueContainer>
                <CoinInfoAndMaxValue>
                  <CoinameAndIcon>
                    <img src="/images/icons/stETH.svg" alt="" />
                    <p>stETH</p>
                  </CoinameAndIcon>
                  <p className='max-amount'>Saldo Máximo: 1,0012</p>
                </CoinInfoAndMaxValue>
              </InputBorderBoxContainer>
            </DepositQuantityContainer>

            {/*----------------------------- */}

            <DepositQuantityContainer>
              <InputBorderBoxContainer>
                <InputAndMiniValueContainer>
                  <input disabled type="number" placeholder='00.00' />
                  <p>R$ 00,00</p>
                </InputAndMiniValueContainer>
                <CoinInfoAndMaxValue>
                  <CoinameAndIcon>
                    <img src="/images/icons/wstETH.svg" alt="" />
                    <p>wstETH</p>
                  </CoinameAndIcon>
                  <p className='max-amount'></p>
                </CoinInfoAndMaxValue>
              </InputBorderBoxContainer>
            </DepositQuantityContainer>

            {/*----------------------------- */}

            <button disabled className='deposit-btn'>Depositar</button>

          </ContainerDepositCoin>
        </ModalDepositCollateral>
      }
    </PageContentWrapper>
  )
}


const RightCollumn = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2.31rem;
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
  max-width: 6rem;
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
  min-height: 20.4375rem;
  border-radius: 1.25rem;
  background: #FFF;
  display: flex;
  flex-direction: column;
  padding: 4.5rem;
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
    max-width: 25.625rem;
    min-height: 3.25rem;
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

    &:disabled{
      background-color: #D9D9D9;
      cursor: not-allowed;
    }
  }
`;

const DepositQuantityContainer = styled.div`
  

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
  align-items: center;
`;