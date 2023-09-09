import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import { styled } from 'styled-components'
import Header from './Header/Header';

export default function PageContentWrapper({ props, children }) {
    return (
        <Wrapper>
        <PageWrapper className='wrapper'>
            <Sidebar/>
            <Header/>
            {children}
        </PageWrapper>
        </Wrapper>
       
    )
}

const PageWrapper = styled.div`
    display: flex;
    width: 100%;
    min-height: 100svh;
    max-width: 1440px;
    flex-direction: column;
    padding-left: 300px;
    position: relative;
    background-color: #f7f7fb;;
`;
// small viewport height


const Wrapper = styled.div`
    display: flex;
    width: 100%;
    min-height: 100svh;
    justify-content: center;
`;


