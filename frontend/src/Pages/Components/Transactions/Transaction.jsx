import React from 'react'
import { styled } from 'styled-components';

export default function Transaction({ name = "Transaction name", date, value = '-R$ 200' }) {
  return (
    <Container>
      <Left>
        <TransImage>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="49" viewBox="0 0 48 49" fill="none">
            <circle cx="24" cy="24.25" r="24" fill="black" fillOpacity="0.2" />
          </svg>
        </TransImage>
        <Texts>
          <h1>{name}</h1>
          <p>dia 23 de  Agosto de 2023</p>
        </Texts>
      </Left>
      <h2>{value}</h2>
    </Container>
  )
}
const Container = styled.div`

display: flex;
justify-content: space-between;
width: 100%;
max-width: 19.1875rem;
align-items: center;

h2{
  color: #0D163A;
font-family: Plus Jakarta Sans;
font-size: 1.125rem;
font-style: normal;
font-weight: 600;
line-height: 1.5rem; /* 133.333% */
flex-shrink: 0;
}


`;

const Left = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap: 0.5rem;
width: 100%;
`;

const Texts = styled.div`
width: 100%;
h1{
  color: #0D163A;
font-family: Plus Jakarta Sans;
font-size: 1.125rem;
font-style: normal;
font-weight: 600;
line-height: 1.5rem; /* 133.333% */
letter-spacing: -0.0625rem;
}
p{
  color: #0D163A;
font-family: Plus Jakarta Sans;
font-size: 0.75rem;
font-style: normal;
font-weight: 600;
line-height: normal;
letter-spacing: -0.03125rem;
opacity: 0.5;
}
`;

const TransImage = styled.div`
width: 3rem;
height: 3rem;
`;


