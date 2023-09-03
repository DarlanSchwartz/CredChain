import React from 'react'
import { styled } from 'styled-components'
import PageContentWrapper from './Components/PageContentWrapper';

export default function HomePage() {
  return (
      <PageContentWrapper>
        <Container>

        </Container>
      </PageContentWrapper>
  )
}

const Container = styled.main`

height: 100%;
margin-left: 280px;
*{
  font-family: 'Roboto', sans-serif;
}
`;