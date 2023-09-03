import React from 'react'
import { styled } from 'styled-components'

export default function Sidebar() {
  return (
    <SidebarContainer>
        <a href="/score">Meu Score</a>
        <a href="/connect">Conectar Redes</a>
        <a href="/finances">Finanças</a>
        <a href="/loans">Empréstimo</a>
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div`

    background-color: white;
    height: 100%;
    width: 100%;
    max-width: 280px;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    
`;
