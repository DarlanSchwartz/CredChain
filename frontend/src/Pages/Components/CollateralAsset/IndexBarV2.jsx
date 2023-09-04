import React from 'react'
import { styled } from 'styled-components';

export default function IndexBarV2() {
  return (
    <Bar>
        <p className='asset'>Ativo</p>
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
  justify-content: flex-start;
  margin-bottom: 1rem;
  margin-top: 0.63rem;
  .asset{
    width:260px;
    text-align: left;
    padding-left: 70px;
    /*background-color: red;*/
  }
  .units{
    width: 160px;
    /* background-color: blue; */
    padding-left: 20px;
  }
  .total{
    width: 255px;
    padding-left: 20px;
   /* background-color: yellow;*/
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