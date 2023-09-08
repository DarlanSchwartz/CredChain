import React, { useContext, useEffect } from 'react'
import PageContentWrapper from './Components/PageContentWrapper';
import { styled } from 'styled-components';
import Graph from './Components/Graph/Graph';
import Transactions from './Components/Transactions/Transactions';
import BlockchainList from './Components/Blockchain/BlockchainList';
import { LoginContext } from '../Contexts/LoginContext';
import RipioBanner from './Components/Banners/RipioBanner';

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
`;

const RightCollumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 21.6875rem;
`;

const Container = styled.div`
  display: flex;
  gap: 22px;
  margin-top: 44px;
  padding-right: 20px;
  width: 100%;
  justify-content: space-between;
`;