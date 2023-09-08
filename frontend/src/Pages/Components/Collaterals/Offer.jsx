import React, { useState } from 'react'
import { styled } from 'styled-components'
import { MainPurpleColor } from '../../../Colors';

export default function Offer({ bank_name = 'Bank name', value = 0, CET = 0, approval_chance = 'Baixa', installments_count=0, installment_value = 0, necessity_wst = 0, necessity_uxd = 0}) {
  const [currentNecessity,setCurrentNecessity]= useState(necessity_wst);
  return (
    <Container className='offer'>
      <h1 className='title'>Ofertas disponíveis</h1>
      <Divider>
        <h2>{bank_name}</h2>
        <h3>Empréstimo Pessoal</h3>
      </Divider>
      <Content>
        <LeftContent>
          <h1>R$ {value}</h1>
          <h2>Parcelas</h2>
          <h3>{installments_count} meses de R$ {installment_value}</h3>
          <h4>CET - Custo Efetivo Total</h4>
          <h5>{CET}% ao mês</h5>
        </LeftContent>
        <RightContent>
          <h2>Chance de aprovação</h2>
          <FakeButton>{approval_chance}</FakeButton>
          <h3>Necessidade de colateralzação</h3>
          <Actions>
              <FakeButton>R$ {currentNecessity}</FakeButton>
              <img src="/images/icons/lido.svg" onClick={()=> setCurrentNecessity(necessity_wst)} />
              <img src="/images/icons/uxd.svg"onClick={()=> setCurrentNecessity(necessity_uxd)} />
          </Actions>
        </RightContent>
      </Content>
      <button className='ask-loan-btn'>Solicitar empréstimo</button>
    </Container>
  )
}

const FakeButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5.5625rem;
  color: #000;
  text-align: center;
  font-family: Plus Jakarta Sans;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 200% */
  border: 1px solid black;
  border-radius: 2.5rem;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.63rem;

  img{
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
  }
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;

  h1{
    color: #0D163A;
    font-family: Plus Jakarta Sans;
    font-size: 1.625rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem; 
  }
  h2{
    color: rgba(42, 42, 42, 0.60);
    font-family: Plus Jakarta Sans;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 200% */
  }
  h3{
    color: rgba(42, 42, 42, 0.60);
    font-family: Plus Jakarta Sans;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem; /* 200% */
  }
  h4{
    color: rgba(42, 42, 42, 0.60);
    font-family: Plus Jakarta Sans;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 200% */
  }
  h5{
    color: rgba(42, 42, 42, 0.60);
    font-family: Plus Jakarta Sans;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem; /* 200% */
  }
`;


const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  h2{
    color: rgba(42, 42, 42, 0.60);
    font-family: Plus Jakarta Sans;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 200% */
  }

  h3{
    color: rgba(42, 42, 42, 0.60);
    font-family: Plus Jakarta Sans;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 200% */
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  width: 100%;
`;

const Divider = styled.div`

  margin-top: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding-bottom: 0.7rem;
  h2{
    color: #0D163A;
    font-family: Plus Jakarta Sans;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 150% */
  }
  h3{
    color: rgba(42, 42, 42, 0.60);
    font-family: Plus Jakarta Sans;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem;
  }

`;

const Container = styled.div`

    width: 100%;
    max-width:45.375rem;
    height: 18.125rem;
    border-radius: 0.875rem;
    background: #FFF;
    padding: 1.56rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    .title{
        color: #0D163A;
        font-family: Plus Jakarta Sans;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.5rem; 
        width: 100%;
        text-align: left;
    }

    .ask-loan-btn{
      width: 100%;
      height: 2.375rem;
      max-width: fit-content;
      padding-left: 1.4rem;
      padding-right: 1.4rem;
      border-radius: 1.25rem;
      background-color: ${MainPurpleColor};
      border: 1px solid transparent;
      color: #FFF;
      flex-shrink: 0;
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
  }

`;
