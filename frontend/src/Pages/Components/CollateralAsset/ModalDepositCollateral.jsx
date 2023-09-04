import React from 'react'
import { styled } from 'styled-components';

export default function ModalDepositCollateral({onClick,children}) {
  return (
    <ModalContainer onMouseDown={onClick}>
      {children}
    </ModalContainer>
  )
}

const ModalContainer = styled.main`
  background-color: black;
  opacity: 50%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

`;
