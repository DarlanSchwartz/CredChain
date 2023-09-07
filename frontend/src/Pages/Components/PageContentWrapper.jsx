import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import { styled } from 'styled-components'
import Header from './Header/Header';

export default function PageContentWrapper({ props, children }) {
    return (
        <PageWrapper className='wrapper'>
            <Sidebar/>
            <Header/>
            {children}
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding-left: 300px;
`;
