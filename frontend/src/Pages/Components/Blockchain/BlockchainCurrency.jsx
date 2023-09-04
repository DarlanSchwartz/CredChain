import React from 'react'
import { styled } from 'styled-components'

export default function BlockchainCurrency({ name, image, price, units, total_value }) {
  return (
    <Container>
      <NameLogo>
        <img src="/drex.svg" alt="" />
        <h1>Drex</h1>
      </NameLogo>
      <MainInfo>
        <p className='price'>R$ 1.00</p>
        <p className='units'>10.000.00</p>
        <p className='total'>R$ 10.000.00</p>
      </MainInfo>
    </Container>
  )
}

const MainInfo = styled.div`

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-left: 120px;
  p{
    color: #0D163A;
    font-family: Plus Jakarta Sans;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; 
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
`;

const NameLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  gap: 1.31rem;

  img{
    width: 3rem;
    height: 3rem;
    flex-shrink: 0;
    border-radius: 50%;
  }

  h1{
    color: #0D163A;
font-family: Plus Jakarta Sans;
font-size: 1rem;
font-style: normal;
font-weight: 400;
line-height: 1.5rem; 
  }
`;

const Container = styled.div`
align-items: center;
display: flex;
justify-content: space-between;



`;
