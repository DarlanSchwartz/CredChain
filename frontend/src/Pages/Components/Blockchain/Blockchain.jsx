import React from 'react'
import { styled } from 'styled-components'
import BlockchainCurrency from './BlockchainCurrency';

export default function Blockchain({name,currencies}) {
  return (
    <Container>
      <h1>{name}</h1>
      <Bar>
        <p className='asset'>Ativo</p>
        <p className='price'>Preço</p>
        <p className='units'>Unidades</p>
        <p className='total'>Valor Total</p>
      </Bar>
      <BlockchainCurrency/>
    </Container>
  )
}

const Bar = styled.div`
width: 100%;
display: flex;
align-items: center;
border-bottom: 1px solid rgba(155, 155, 155, 0.27);
justify-content: space-between;
margin-bottom: 1rem;
margin-top: 0.63rem;

p:first-child{
  text-align: right;
}
.asset{
    width: 100px;
  }

.price{
    width: 100px;
  }
  .units{
    width: 100px;
  }
  .total{
    width: 120px;
  }

p{
  color: rgba(42, 42, 42, 0.60);
font-family: Plus Jakarta Sans;
font-size: 0.75rem;
font-style: normal;
font-weight: 400;
line-height: 1.5rem;
}
`;

const Container = styled.div`
  width: 100%;
  min-height: 100px;
  max-width: 717px;
  max-height: 214px;
  flex-shrink: 0;
  border-radius: 14px;
  background: #FFF;
  padding: 2.19rem;
  padding-top: 0.63rem;
  padding-bottom: 0.63rem;

h1{
  color: #0D163A;
font-family: Plus Jakarta Sans;
font-size: 1rem;
font-style: normal;
font-weight: 700;
line-height: 1.5rem;
}

`;
