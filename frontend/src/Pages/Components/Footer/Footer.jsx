import React from 'react'
import { styled } from 'styled-components'
import Logo from '../Logo';

export default function Footer() {
    return (
        <FooterContainer>
            <div className='logo-cc'>
              <Logo />
                <p>Copyright © 2023 CredChain Ltda.
                    All rights reserved.</p>
            </div>
            <LinksContainer>
                <LinksList>
                    <li>
                        <a href="#">Linkedin</a>
                    </li>
                    <li>
                        <a href="#">Instagram</a>
                    </li>
                </LinksList>
                <LinksList>
                    <li>
                        <a href="#">Termos de uso</a>
                    </li>
                    <li>
                        <a href="#">Política de privacidade</a>
                    </li>
                    <li>
                        <a href="#">Entre em contato</a>
                    </li>
                </LinksList>
            </LinksContainer>
        </FooterContainer>
    )
}
const LinksList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 2.75rem;
    height: 100%;
    li{
        a{
            color: var(--secondary-dark, #16194F);
            font-family: Roboto;
            font-size: 1.25rem;
            font-style: normal;
            font-weight: 400;
            line-height: 150%;
            text-decoration: none;
            &:hover{
                text-decoration: underline;
            }
        }
    }
`;
const LinksContainer = styled.nav`
    display: flex;
    gap: 5.94rem;
    height: 100%;
`;

const FooterContainer = styled.footer`
    width: 100%;
    min-height: 27.5rem;
    flex-shrink: 0;
    background: #DCE2F0;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .logo-cc{
        display: flex;
        flex-direction: column;
        gap: 1.44rem;

        p{
            color: var(--secondary-light, #6A6D9E);
            font-family: Roboto;
            font-size: 1.25rem;
            font-style: normal;
            font-weight: 400;
            line-height: 150%;
            text-align: left;
            width: 19rem;
        }
    }
`;
