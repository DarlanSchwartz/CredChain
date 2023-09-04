import React from 'react'
import { styled } from 'styled-components'
import Transaction from './Transaction';
import { LinkColor, MainPurpleColor } from '../../../Colors';

export default function Transactions() {
    return (
        <Container>
            <Top>
                <h1>Transações  recentes</h1>
                <a href="#">Ver mais</a>
            </Top>
            <List>
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
            </List>
        </Container>
    )
}

const Top = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1.5rem;
    border-bottom: 0.0625rem solid #e7e8ec;

    h1{
        color: #0D163A;
        font-feature-settings: 'clig' off, 'liga' off;
        font-family: Plus Jakarta Sans;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: -1px;
    }
    a{
        color: ${LinkColor};
        text-decoration: none;
        font-family: Plus Jakarta Sans;
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.5rem;
        &:hover{
            text-decoration: underline;
        }
    }
   
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2.03rem;
    width: 100%;
    margin-top: 1.73rem;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background-color:${MainPurpleColor};
        border-radius: 3px;
    }
`;

const Container = styled.div`
    display: flex;
    max-width: 347px;
    height: 100%;
    max-height: 402px;
    width: 100%;
    height: 100%;
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
    border-radius: 14px;
    background: #FFF;
`;
