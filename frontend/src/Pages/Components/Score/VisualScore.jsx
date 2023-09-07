import React from 'react'
import { styled } from 'styled-components'

export default function VisualScore() {
  return (
    <Container>
        <h1>Meu Score</h1>
        <img src="/images/pictures/gauge-chart.png" alt="" />
    </Container>
  )
}

const Container = styled.div`
    width: 100%;
    max-width: 41.4375rem;
    min-height: 19.125rem;
    border-radius: 1.25rem;
    background: #FFF;
    padding: 1.69rem;
    padding-top:0.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        width: 100%;
        max-width: 12rem;
    }

    h1{
        color: #020202;
        font-family: Plus Jakarta Sans;
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 600;
        line-height: 1.5rem;
        width: 100%;
        text-align: left;
    }
`;
