import React, { useContext, useEffect } from 'react'
import PageContentWrapper from './Components/PageContentWrapper';
import { styled } from 'styled-components';
import Graph from './Components/Graph/Graph';
import Transactions from './Components/Transactions/Transactions';
import BlockchainList from './Components/Blockchain/BlockchainList';
import { LoginContext } from '../Contexts/LoginContext';

export default function FinancesPage() {

  const { isLoged } = useContext(LoginContext);
  
  useEffect(() => {
    isLoged();
  })

  return (
    <PageContentWrapper>
      <Container>

        <Main>
          <Graph />
          <BlockchainList/>
        </Main>
       
        <Transactions />
      </Container>
    </PageContentWrapper>
  )
}
const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  gap: 22px;
  margin-top: 44px;
`;