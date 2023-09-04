import React from 'react'
import { styled } from 'styled-components';
import NetworkInfo from './NetworkInfo';

export default function Networks() {
    return (
        <NetworkList>
            <NetworkInfo />
        </NetworkList>
    )
}

const NetworkList = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    flex-direction: column;
`;