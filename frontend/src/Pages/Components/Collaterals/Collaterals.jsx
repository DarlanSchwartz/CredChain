import React, { useState } from 'react'
import { styled } from 'styled-components';
import IndexBar from '../Blockchain/IndexBar';
import BlockchainCurrency from '../Blockchain/BlockchainCurrency';
import { MainPurpleColor } from '../../../Colors';
import CollateralSlideBar from './CollateralSlideBar';

export default function Collaterals({ assets, show_actions = true ,ask_loan_start_event}) {


  return (
    <SCCollaterals>
      {
        assets && assets.length > 0 &&

        <>
          <h1 className='title'>Colaterais</h1>
          <IndexBar />
          <BlockchainCurrency name={'WstETH'} price={'9310.00'} units={0.563909} total_value={5250.00} image={'/images/icons/stETH.svg'} />
          <Actions>
            <CollateralSlideBar value={80} />
            {
              show_actions &&
              <div className='btns'>
                <button onClick={()=> ask_loan_start_event(assets)}>Solicitar Empréstimo</button>
                <button disabled>Sacar</button>
              </div>
            }
          </Actions>
        </>
      }

      {
        (assets && assets.length === 0 || !assets) && <p className='none-assets'>Você não nenhum ativo depositado.</p>
      }
    </SCCollaterals>
  )
}

const Actions = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-top: 1.94rem;
  .btns{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.88rem;
  }
`;

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
    width: 100%;
    max-width: fit-content;
    padding-left: 1.4rem;
    padding-right: 1.4rem;
    height: 2.375rem;
    border-radius: 1.25rem;
    background-color: ${MainPurpleColor};
    border: 1px solid transparent;
    color: #FFF;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem;
    align-self: center;

    &:enabled{
        &:hover{
          color: ${MainPurpleColor};
          border: 1px solid ${MainPurpleColor};
          background-color: #FFF;
      }
    }

    &:disabled{
      background-color:white;
      border: 1px solid #D9D9D9;
      color:#D9D9D9;
      cursor: not-allowed;
    }
  }
`;
