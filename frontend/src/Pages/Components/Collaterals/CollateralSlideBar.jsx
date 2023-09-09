import React from 'react';
import { styled } from 'styled-components';


export default function CollateralSlideBar({ value }) {
    return (
        <Container data-tooltip-id="my-tooltip-1">
            <SliderContainer>
                <Slider $value={value} />
            </SliderContainer>
            <p>{value}% ultilizado</p>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 7rem;
    padding-top: 5px;
    cursor: help;
    p{
        color: rgba(42, 42, 42, 0.60);
        font-family: Plus Jakarta Sans;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.5rem;
    }
`;

const SliderContainer = styled.div`
    width: 100%;
    height: 0.5rem;
    overflow: hidden;
    position: relative;
    background: rgba(121, 121, 121, 0.30);
`;

const Slider = styled.div`
    width: ${(props) => props.$value + '%'};
    height: 0.5rem;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    background: rgb(193, 125, 224);
    border-right: 0.2rem solid white;
`;




