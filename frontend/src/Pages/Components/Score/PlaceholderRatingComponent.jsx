import React from 'react'
import { styled } from 'styled-components';

export default function PlaceholderRatingComponent({ name, value }) {
    return (
        <RatingComponent>
            <img src="/images/pictures/gauge-chart.png" alt="" />
            <h2>{name}</h2>
        </RatingComponent>
    )
}

const RatingComponent = styled.div`
    width: 100%;
    max-width: 10.3125rem;
    height: 13.5625rem;
    border-radius: 1.75rem;
    background: #FFF;
    box-shadow: 6px 8px 18px 0px rgba(0, 0, 0, 0.25);
    padding: 0.86rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    align-items: center;

    h2{
        text-align: center;
        font-family: Plus Jakarta Sans;
        line-height: 1.2rem;

        @media (max-width: 1300px) {
            font-size:10px;
            line-height: 12px;
        }
    }
    img{
        width: 100%;
    }

    @media (max-width: 1300px) {
        max-width: 5rem;
        height: 7rem;
        border-radius: 1rem;
    }
`;
