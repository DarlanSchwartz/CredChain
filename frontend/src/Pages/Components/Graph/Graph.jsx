import React from 'react'
import { styled } from 'styled-components'

export default function Graph() {
  return (
    <GraphContainer>
      <Header>
        <h1 className='price'>R$ 21.000,30</h1>
        <Right>

          <CoinInfo>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
              <circle cx="6" cy="6.5" r="6" fill="#4745A4" />
            </svg>
            <CoinTexts>
              <h1>Real Digital</h1>
              <h2>R$ 12.100,30</h2>
            </CoinTexts>
          </CoinInfo>

          <CoinInfo>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
              <circle cx="6" cy="6.5" r="6" fill="#AD00FF" />
            </svg>
            <CoinTexts>
              <h1>Etherium</h1>
              <h2>R$ 9.900</h2>
            </CoinTexts>
          </CoinInfo>

          <select value="Semestre" name="period" id="period">
            <option value="Semestre">Semestre</option>
          </select>
        </Right>
      </Header>
      <img src="graph.svg" alt="" />
    </GraphContainer>
  )
}
const CoinInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  svg{
    margin-top: 5px;
    flex-shrink: 0;
  }
 
`;

const CoinTexts = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  h1{
    color: #0D163A;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Plus Jakarta Sans;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  h2{
    color: rgba(153, 153, 153, 0.60);
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Plus Jakarta Sans;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.0625rem;
  }
`;

const Right = styled.div`

  display: flex;
  align-items: center;
  gap: 2rem;

  select{
      cursor: pointer;
      display: flex;
      padding: 0.5rem;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      border-radius: 0.5rem;
      border: 1px solid #DEDEDE;
      color: #7C7C7C;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Plus Jakarta Sans;
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
  }

`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  .price{
    color: #0D163A;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Plus Jakarta Sans;
    font-size: 2.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.0625rem;
  }
`;

const GraphContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 717px;
    min-height: 402px;
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    border-radius: 14px;
    background: #FFF;
`;
