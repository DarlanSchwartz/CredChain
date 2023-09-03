import React from 'react'
import Sidebar from './Components/Sidebar/Sidebar'
import { styled } from 'styled-components';

export default function FinancesPage() {
  return (
    <Container>
        
    <Sidebar/>
    <p>Finances</p>
    </Container>
  )
}

const Container = styled.div`

height: 100%;
min-height: 100%;
display: flex;

`;