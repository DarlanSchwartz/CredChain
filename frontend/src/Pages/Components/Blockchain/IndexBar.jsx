import React from 'react'
import { styled } from 'styled-components';

export default function IndexBar() {
  return (
    <Bar>
        <p className='asset'>Ativo</p>
        <p className='price'>Preço</p>
        <p className='units'>Unidades</p>
        <p className='total'>Valor Total</p>
      </Bar>
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

 
  .asset{
    width:250px;
    text-align: left;
    padding-left: 70px;
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