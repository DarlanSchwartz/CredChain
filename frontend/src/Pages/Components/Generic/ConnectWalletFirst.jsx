import React from 'react'
import { styled } from 'styled-components'
import { MainPurpleColor } from '../../../Colors';
import { useNavigate } from 'react-router-dom';

export default function ConnectWalletFirst() {
  const navigate = useNavigate();
  return (
    <SCConnectWalletFirst>
        <p>Você precisa estar conectado a uma rede que suporta a colatarização de ativos</p>
        <button onClick={()=> navigate('/connect')}>Conectar Redes</button>
    </SCConnectWalletFirst>
  )
}

const SCConnectWalletFirst = styled.nav`
  width: 100%;
  max-width: 45.375rem;
  min-height: 10.125rem;
  border-radius: 0.875rem;
  background: #FFF;
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.75rem;
  p{
    width: 50%;
    color: #0D163A;
    text-align: center;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 150% */
  }

  button{
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

    &:hover{
      color: ${MainPurpleColor};
      border: 1px solid ${MainPurpleColor};
      background-color: #FFF;
    }
  }
`;
