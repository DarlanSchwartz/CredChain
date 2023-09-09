import React from 'react'
import { styled } from 'styled-components'
import InWalletCollateralCurrency from './InWalletCollateralCurrency';
import IndexBarV2 from './IndexBarV2';

export default function InWalletCollateralElement({ name = 'Currency name', currencies, deposit_btn_click }) {
  return (
    <Container>
      <h1 className='title'>{name}</h1>
      <IndexBarV2 />
      <CurrenciesList>
      {
        currencies?.map(currency => {
          return (
            <InWalletCollateralCurrency
              key={currency.name}
              onClick={deposit_btn_click}
              name={currency.name}
              units={currency.units}
              total_value={currency.totalValue}
              image={currency.image}
            />
          )
            ;
        })
      }
      </CurrenciesList>

    </Container>
  )
}
const CurrenciesList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
  border-radius: 0.875rem;
  background: #FFF;
  max-width: 45.375rem;
  min-height: 10.125rem;
  padding: 1.56rem;
  padding-top: 0.63rem;
  padding-bottom: 1.13rem;
  
  .title{
    color: #0D163A;
    font-family: Plus Jakarta Sans;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem; /* 150% */
  }
`;

