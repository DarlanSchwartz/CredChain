import React from 'react'
import styled from 'styled-components'
import { MainPurpleColor } from '../../../Colors';

export default function RipioBanner() {
    return (
        <BannerContainer>
            <img src="/images/pictures/ripio-card.svg" alt="" />
            <h1>Ripio Card: o cartão com cashback em cripto!</h1>
            <a href='https://www.ripio.com/br/ripio-card/' target='_blank'>Peça já o seu</a>
            <AdBanner>
                Anúncio
            </AdBanner>
        </BannerContainer>
    )
}


const AdBanner = styled.div`
    position: absolute;
    right: 25px;
    top: -24px;
    width: 6.3125rem;
    height: 1.4375rem;
    flex-shrink: 0;
    color: #C2C2C2;
    text-align: center;
    font-family: Plus Jakarta Sans;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    background-color: #eeeeee;
`;

const BannerContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 2rem;
    width: 100%;
    max-width: 21rem;
    padding-bottom: 1rem;
    border-radius: 1.25rem;
    border: 1px solid #E6E6E6;
    background-color: white;

    h1{
        color: #0D163A;
        text-align: center;
        font-family: Plus Jakarta Sans;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.5rem;
        max-width: 15.4375rem;
    }

    img{
        max-width: 15.4375rem;
    }


    a{
        margin-top: 0.5rem;
        text-decoration: none;
        width: 100%;
        max-width: 11.9375rem;
        min-height: 2.375rem;
        border-radius: 1.25rem;
        background-color: ${MainPurpleColor};
        border: 1px solid transparent;
        color: #FFF;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.5rem;
        align-self: center;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover{
            color: ${MainPurpleColor};
            border: 1px solid ${MainPurpleColor};
            background-color: #FFF;
            text-decoration: underline;
        }
    }
`;