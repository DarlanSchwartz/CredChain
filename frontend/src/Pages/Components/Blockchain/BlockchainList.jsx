import React from 'react'
import { styled } from 'styled-components';
import Blockchain from './Blockchain';

export default function BlockchainList() {
  return (
    <SCBlockchainList>
        <Blockchain name={"Real Digital"} />
        <Blockchain name={"Etherium"} />
    </SCBlockchainList>
  )
}


const SCBlockchainList = styled.div`
    display: flex;
    gap: 0.75rem;
    align-items: center;
    flex-direction: column;
    margin-top: 1.94rem;
    width: 100%;
`;