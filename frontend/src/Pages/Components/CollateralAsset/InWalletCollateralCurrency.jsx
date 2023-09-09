import React from 'react'
import { styled } from 'styled-components';
import { MainPurpleColor } from '../../../Colors';

export default function InWalletCollateralCurrency({ onClick, name ='name', image ='/images/icons/stETH.svg', units = '10.000.00', total_value='0' }) {
  return (
    <Container>
      <NameLogo>
       {image &&  <img src={image} alt="" />}
        <h1>{name}</h1>
      </NameLogo>
      <MainInfo>
        <p className='units'>{units}</p>
        <p className='total'>R$ {total_value}</p>
        <button onClick={() => onClick({ name , image, units , total_value })} disabled={Number(total_value) <= 0}>Depositar</button>
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
    width: 100%;
    max-width: 100px;
  }
  .units{
    width: 100%;
    max-width: 160px;
    padding-left: 20px;
  }
  .total{
    width: 100%;
    max-width: 120px;
  }

  
  button{
    border-radius: 1.25rem;
    width: 100%;
    max-width: 6.6875rem;
    min-height: 1.9375rem;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 150% */

    &:enabled{
        background-color: ${MainPurpleColor};
        border: 1px solid transparent;
        color: #FFF;
        &:hover{
            color: ${MainPurpleColor};
            border: 1px solid ${MainPurpleColor};
            background-color: #FFF;
        }
    }

   &:disabled{
    background: rgba(173, 0, 255, 0.00);
    color: rgba(144, 144, 144, 0.98);
    border: 1px solid #909090;
    cursor: not-allowed;
   }
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
