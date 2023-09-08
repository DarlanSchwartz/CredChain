import React from 'react'
import { styled } from 'styled-components';
import Blockchain from './Blockchain';

export default function BlockchainList() {
  const blockchains = [
    {
      name: "Real Digital",
      currencies:[
        {
          name:'Drex',
          price:'1.00',
          units:'10.000.00',
          totalValue:'10.000.00',
          image:'/images/icons/drex.svg'
        },
        {
          name:'Titulo Público Federal',
          price:'100.00',
          units:'21.003',
          totalValue:'2.100.30',
          image:'/images/icons/tesouro.svg'
        }
      ]
    },
    {
      name: "Ethereum",
      currencies:[
        {
          name:'Ether',
          price:'9300.00',
          units:'0.5',
          totalValue:'4650.00',
          image:'/images/icons/ETH.svg'
        },
        {
          name:'stETH',
          price:'9310.00',
          units:'0.563909',
          totalValue:'5250.00',
          image:'/images/icons/stETH.svg'
        }
      ]
    },
  ]
  return (
    <SCBlockchainList>
       {blockchains.map((blockchain,index) =>{
        return(
          <Blockchain key={index} name={blockchain.name} currencies={blockchain.currencies} />
        );
       })}
    </SCBlockchainList>
  )
}


const SCBlockchainList = styled.div`
    display: flex;
    gap: 0.75rem;
    align-items: center;
    flex-direction: column;
    margin-top: 1.94rem;
    width: 100%;
    margin-bottom: 40px;
`;