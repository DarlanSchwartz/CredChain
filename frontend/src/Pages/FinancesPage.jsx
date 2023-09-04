import React from 'react'
import PageContentWrapper from './Components/PageContentWrapper';
import { styled } from 'styled-components';
import Graph from './Components/Graph/Graph';
import Transactions from './Components/Transactions/Transactions';
import BlockchainList from './Components/Blockchain/BlockchainList';

export default function FinancesPage() {
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
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  margin-left: 310px;
  gap: 22px;
  margin-top: 44px;
`;