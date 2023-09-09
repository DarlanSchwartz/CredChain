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
  },[])

  return (
    <PageContentWrapper>
      <Container>

        <Main>
          <Graph />
          <BlockchainList />
        </Main>

        <RightCollumn>
          <Transactions />
          
        </RightCollumn>

      </Container>
    </PageContentWrapper>
  )
}
const Main = styled.div`
  display: flex;
  flex-direction: column;
width: 100%;
  max-width: 44.8125rem;
  align-items: center;

  @media (max-width: 1000px) {
    max-width: 100%;
}
`;

const RightCollumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 21.6875rem;

  @media (max-width: 1000px) {
      justify-content: center;
      flex-direction: row;
      width: 100%;
      max-width: 100%;
  }

  @media (max-width: 500px) {
     width: 100%;
     max-width: 100%;
     flex-direction: column;
     justify-content: flex-start;
     align-items: center;
  }
`;

const Container = styled.div`
  display: flex;
  gap: 22px;
  margin-top: 44px;
  padding-right: 20px;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 1000px) {
        justify-content: center;
        flex-direction: column;
    }
`;