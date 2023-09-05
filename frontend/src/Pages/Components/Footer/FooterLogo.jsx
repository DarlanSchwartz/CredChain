import React from 'react'
import { styled } from 'styled-components'

export default function FooterLogo({on_click}) {
    return (
        <LogoContainer onClick={on_click}>
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                <path d="M13.2775 20.3182C14.0998 17.2499 17.2537 14.096 20.322 13.2738L39.4509 8.1474C42.5192 7.32513 44.3399 9.14588 43.5177 12.2142L38.3913 31.3431C37.569 34.4114 34.4151 37.5653 31.3469 38.3876L12.2179 43.5139C9.14963 44.3362 7.32888 42.5154 8.15115 39.4472L13.2775 20.3182Z" fill="#AD00FF" />
                <path d="M5.60885 12.6493C6.43111 9.58107 9.58501 6.42717 12.6533 5.60491L31.7823 0.47854C34.8505 -0.343725 36.6713 1.47702 35.849 4.54529L30.7227 23.6743C29.9004 26.7425 26.7465 29.8964 23.6782 30.7187L4.54923 35.8451C1.48096 36.6673 -0.339785 34.8466 0.482479 31.7783L5.60885 12.6493Z" fill="#6941C6" />
            </svg>
            <LogoText>CredChain</LogoText>
        </LogoContainer>

    )
}

const LogoContainer = styled.div`
    display: flex;
    width: 11.125rem;
    height: 2.75rem;
    justify-content: center;
    align-items: center;
    gap: 0.0625rem;
    cursor: pointer;
`;

const LogoText = styled.h3`
    color: #000;
    font-family: Plus Jakarta Sans !important;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 800;
    line-height: 100%; /* 1.5rem */
    letter-spacing: 0.045rem;
`;