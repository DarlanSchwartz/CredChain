import React from 'react'
import { styled } from 'styled-components'
import { MainPurpleColor } from '../../../Colors';

export default function NetworkPlaceholder() {
    return (
       <Container>
         <Placeholder xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
            <circle cx="36" cy="36" r="36" fill="#D9D9D9" />
        </Placeholder>
       </Container>
    )
}
const Placeholder = styled.svg`
    width: 4.5rem;
    height: 4.5rem;
    flex-shrink: 0;
    border-radius: 50%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #F3F3F3;
  width: 8.25rem;
  height: 8.25rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 2px solid transparent;
  background: #F3F3F3;
  cursor: not-allowed;
`;