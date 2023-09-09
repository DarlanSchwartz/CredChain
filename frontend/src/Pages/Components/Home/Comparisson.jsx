import React from 'react'
import styled from 'styled-components'

export default function Comparisson() {
    return (
        <Container>
           <Content>
           <BadBox>
                <h1>Sem Colateral</h1>
                <img src="/images/pictures/sad2.svg" alt="" />
            </BadBox>
            <Box>
                <h1>Com Colateral</h1>
                <img src="/images/pictures/happy.svg" alt="" />
            </Box>
           </Content>
        </Container>
    )
}

const Content = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
gap: 20px;
max-width: 1440px;
`;

const Container = styled.div`

height: 800px;
width: 100%;
display: flex;
align-items: center;
justify-content: center;


h1{
    color: #000;
    text-align: center;
    font-family: Roboto;
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    width: 100%;
}
`;
const Box = styled.div`

height: 40.5rem;
width: 100%;
max-width:36rem;
display: flex;
align-items: center;
flex-direction: column;
border-radius: 1.25rem;
box-shadow: 6px 8px 18px 0px rgba(0, 0, 0, 0.25);

border-left: 0;
padding: 1rem;
justify-content: space-between;
img{
    width: 100%;
}
`;

const BadBox = styled.div`

height: 40.5rem;
width: 100%;
max-width:36rem;
display: flex;
align-items: center;
flex-direction: column;
border-radius: 1.25rem;
box-shadow: 6px 8px 18px 0px rgba(0, 0, 0, 0.25);

padding: 1rem;
justify-content: space-between;
padding-bottom: 3rem;
img{
    width: 100%;
}
`;
