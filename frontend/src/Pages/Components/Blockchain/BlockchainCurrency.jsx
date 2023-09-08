import React from 'react'
import { styled } from 'styled-components'

export default function BlockchainCurrency({ name, image, price, units, total_value }) {
  return (
    <Container>
      <NameLogo>
        <img src={image ? image : '/placeholder.svg'} alt={name} />
        <h1>{name ? name : '-----'}</h1>
      </NameLogo>
      <MainInfo>
        <p className='price'>{`${price ? 'R$ ' + price : '----'}`}</p>
        <p className='units'>{`${units ? units : '---'}`}</p>
        <p className='total'>{`${total_value ? 'R$ ' + total_value : '----'}`}</p>
      </MainInfo>
    </Container>
  )
}

const MainInfo = styled.div`

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 423px;
  
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
  justify-content: flex-start;
  align-items: center;
  gap: 1.31rem;
  min-width: 260px;
  max-width: 260px;
  width: 100%;

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
  width: 100%;
`;
