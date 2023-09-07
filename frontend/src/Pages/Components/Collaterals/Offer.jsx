import React from 'react'
import { styled } from 'styled-components'

export default function Offer({bank_name,value,CET,approval_chance,installments_cout,installment_value,necessity}) {
  return (
    <Container>
        <h1>Ofertas disponíveis</h1>
    </Container>
  )
}

const Container = styled.div`

    width: 100%;
    max-width:45.375rem;
    height: 18.125rem;
    border-radius: 0.875rem;
    background: #FFF;
    padding: 1.56rem;
    h1{
        color: #0D163A;
        font-family: Plus Jakarta Sans;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.5rem; 
        width: 100%;
        text-align: left;
    }
`;
