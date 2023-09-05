import React, { useState } from 'react'
import { styled } from 'styled-components';
import IndexBar from '../Blockchain/IndexBar';
import BlockchainCurrency from '../Blockchain/BlockchainCurrency';
import { MainPurpleColor } from '../../../Colors';

export default function Collaterals() {
  const [myAssets, setMyAssets] = useState([]);

  return (
    <SCCollaterals>
      {
        myAssets && myAssets.length > 0 &&

        <>
        <h1 className='title'>Colaterais</h1>
         <IndexBar />
          <BlockchainCurrency name={'WstETH'} price={'9310.00'} units={0.563909} total_value={5250.00} image={'/images/icons/stETH.svg'} />
          <button>Solicitar Empréstimo</button>
        </>
      }

      {
        myAssets.length === 0 && <p className='none-assets'>Você não nenhum ativo depositado.</p>
      }
    </SCCollaterals>
  )
}

const SCCollaterals = styled.div`
  width: 100%;
  max-width: 45.375rem;
  min-height: 10.125rem;
  border-radius: 0.875rem;
  background: #FFF;
  padding: 1.56rem;
  padding-top: 0.63rem;
  padding-bottom: 1.13rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .none-assets{
    align-self:center;
    color: rgba(42, 42, 42, 0.60);
    font-family: Plus Jakarta Sans;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem;
  }

  .title{
    color: #0D163A;
    font-family: Plus Jakarta Sans;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem; /* 150% */
  }

 
  button{
    margin-top: 1.94rem;
    width: 100%;
    max-width: 13.625rem;
    min-height: 2.375rem;
    border-radius: 1.25rem;
    background-color: ${MainPurpleColor};
    border: 1px solid transparent;
    color: #FFF;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem;
    align-self: center;

    &:hover{
      color: ${MainPurpleColor};
      border: 1px solid ${MainPurpleColor};
      background-color: #FFF;
    }
  }
`;
