import React, { useState } from 'react'
import PageContentWrapper from './Components/PageContentWrapper'
import { styled } from 'styled-components';
import ConnectWalletFirst from './Components/Generic/ConnectWalletFirst';
import Collaterals from './Components/Collaterals/Collaterals';
import InWalletCollateralElement from './Components/CollateralAsset/InWalletCollateralElement';
import ModalDepositCollateral from './Components/CollateralAsset/ModalDepositCollateral';


export default function LoansPage({ connected = true }) {
  const [isConnected, setIsConnected] = useState(connected);
  const [showModal,setShowModal] = useState(false);
  return (
    <PageContentWrapper>
      <Container>
        {!isConnected && <ConnectWalletFirst />}
        {isConnected &&
          <>
            <Collaterals />
            <InWalletCollaterals>
            <InWalletCollateralElement deposit_btn_click={()=> setShowModal(true)} name='Etherium' currency={{name:'Something',units:5000,totalValue:500.00}} />
            </InWalletCollaterals>
          </>
        }
      </Container>
      { showModal && 
      <ModalDepositCollateral onClick={()=> setShowModal(false)}>
        </ModalDepositCollateral>
        }
    </PageContentWrapper>
  )
}

const InWalletCollaterals = styled.div`
width: 100%;
display: flex;
flex-direction: column;
gap: 20px;
margin-bottom: 40px;

`;


const Container = styled.div`
  display: flex;
  margin-left: 310px;
  gap: 22px;
  margin-top: 44px;
  flex-direction: column;
  gap: 3.19rem;
`;