import React, { useState } from 'react'
import { styled } from 'styled-components';
import IndexBar from '../Blockchain/IndexBar';
import BlockchainCurrency from '../Blockchain/BlockchainCurrency';
import { MainPurpleColor } from '../../../Colors';

export default function Collaterals({total_used= 0, assets, show_actions = true ,ask_loan_start_event ,ask_checkout_start_event}) {
  return (
    <SCCollaterals>
      {
        assets && assets.length > 0 &&

        <>
          <h1 className='title'>Colaterais</h1>
          <IndexBar />
          {
            assets?.map((asset) =>{
              return (
                <BlockchainCurrency 
                  name={asset?.name} 
                  price={asset?.price} 
                  units={asset?.units} 
                  total_value={asset?.total_value} 
                  image={asset?.image}
                  total_used={total_used}
                  show_actions={show_actions}
                  onStartLoan={ask_loan_start_event}
                  onCheckout={ask_checkout_start_event}
                  show_used={true}
              />
              )
            })
          }
          
        </>
      }

      {
        (assets && assets.length === 0 || !assets) && <p className='none-assets'>Você não nenhum ativo depositado.</p>
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
