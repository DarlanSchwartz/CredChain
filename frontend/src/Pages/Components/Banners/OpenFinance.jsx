import React from 'react'
import styled from 'styled-components'
import { MainPurpleColor } from '../../../Colors';

export default function OpenFinance() {
  return (
    <Container>
<h1>Open Finance</h1>
<p>Conecte seus bancos a CredChain e tenha seu Score mais preciso.</p>
<button>Conectar</button>
    </Container>
  )
}

const Container = styled.div`
    width: 21.375rem;
    height: 19.125rem;
    border-radius: 1.25rem;
    background: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 3rem;

    @media (max-width: 1000px) {
      max-width: 19rem;
  }

  @media (max-width: 500px) {
     width: 100%;
     max-width: 100%;
  }

    h1{
        color: #020202;
        font-family: Plus Jakarta Sans;
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 600;
        line-height: 1.5rem; /* 100% */
    }

    p{
        color: #0D163A;
        text-align: center;
        font-family: Plus Jakarta Sans;
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.5rem; /* 150% */
    }

    button{
        margin-top: 0.5rem;
        width: 100%;
        max-width: 11.9375rem;
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

        &:enabled{
        &:hover{
        color: ${MainPurpleColor};
        border: 1px solid ${MainPurpleColor};
        background-color: #FFF;
        }
        }
  }
`;