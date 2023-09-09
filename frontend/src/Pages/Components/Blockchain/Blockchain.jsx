import React from 'react'
import { styled } from 'styled-components'
import BlockchainCurrency from './BlockchainCurrency';
import IndexBar from './IndexBar';

export default function Blockchain({ name, currencies }) {
  return (
    <Container>
      <h1 className='title'>{name}</h1>
      <IndexBar/>
      <Currencies>
        {currencies.map((currency,index) => {
          return (
            <BlockchainCurrency
              key={index}
              image={currency.image}
              name={currency.name}
              price={currency.price}
              units={currency.units}
              total_value={currency.totalValue} />
          );
        })}

      </Currencies>
    </Container>
  )
}

const Currencies = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;



const Container = styled.div`
  width: 100%;
  min-height: 100px;
  max-width: 44.8125rem;

  max-height: 214px;
  flex-shrink: 0;
  border-radius: 14px;
  background: #FFF;
  padding: 2.19rem;
  padding-top: 0.63rem;
  padding-bottom: 0.63rem;

  @media (max-width: 1000px) {

    max-width: 100%;
    border-radius: 0;
}

.title{
  color: #0D163A;
font-family: Plus Jakarta Sans;
font-size: 1rem;
font-style: normal;
font-weight: 700;
line-height: 1.5rem;
}

`;
