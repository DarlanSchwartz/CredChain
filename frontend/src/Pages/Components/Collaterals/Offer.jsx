import React, { useState } from 'react'
import { styled } from 'styled-components'
import { MainPurpleColor } from '../../../Colors';
import ReactSlider from "react-slider";

const AnualTax = 210; // em porcento
export default function Offer({ max_value = 5000, bank_name = 'Bank name', value = 0, CET = 0, installments_count = 0, installment_value = 0, necessity_wst = 0, necessity_uxd = 0 }) {
  const [currentNecessity, setCurrentNecessity] = useState(necessity_wst);
  const [currentValue, setCurrentValue] = useState(value);
  const [currentMaxValue, setCurrentMaxValue] = useState(max_value);
  function myCurrentValue() {
    return (Number(currentValue) / 100) * Number(currentMaxValue);
  }
  function myCurrentValueWithTaxes() {
    return myCurrentValue() * 2.1;
  }
  function monthlyTax(paidValue, installment, amountOfInstallments) {
    if(paidValue  == 0 || installment == 0  || amountOfInstallments == 0) return 0;
    var taxaJurosMensal = ((installment / (paidValue / amountOfInstallments)) - 1) * 12;
    return taxaJurosMensal.toFixed(1);
  }
  function myInstallmentPrice(){
    return Number((myCurrentValueWithTaxes() / 12).toFixed(2));
  }
  return (
    <Container className='offer'>
      <h1 className='title'>Ofertas disponíveis</h1>
      <Divider>
        <h2>{bank_name}</h2>
        <h3>Empréstimo Pessoal</h3>
      </Divider>
      <Content>
        <LeftContent>

          <h2>Parcelas</h2>
          <h3>{12} meses de R$ {myInstallmentPrice().toString().replace('.',',')}</h3>
          <h4>CET - Custo Efetivo Total</h4>
          <h5>{monthlyTax(myCurrentValue(),myInstallmentPrice(),12).toString().replace('.',',')}% ao mês</h5>
          <h3>Necessidade de colaterização</h3>
          <Actions>
            <div className='left'>
              <p>R$ {currentNecessity}</p>
              <div className='btns'>
                <img src="/images/icons/lido.svg" onClick={() => setCurrentNecessity(necessity_wst)} />
                <img src="/images/icons/uxd.svg" onClick={() => setCurrentNecessity(necessity_uxd)} />
              </div>
            </div>
            <button className='ask-loan-btn'>Solicitar empréstimo</button>
          </Actions>
        </LeftContent>
        <Slidebar>

          <ReactSlider
            className="customSlider"
            thumbClassName="customSlider-thumb"
            trackClassName="customSlider-track"
            markClassName="customSlider-mark"
            marks={20}
            min={0}
            max={100}
            defaultValue={0}
            value={currentValue}
            onChange={(value) => setCurrentValue(value)}
            renderMark={(props) => {
              if (props.key < currentValue) {
                props.className = "customSlider-mark customSlider-mark-before";
              } else if (props.key === currentValue) {
                props.className = "customSlider-mark customSlider-mark-active";
              }
              return <span {...props} />;
            }}
          />

          <h1>R$ {myCurrentValue().toFixed(2).toString().replace('.',',')}</h1>
        </Slidebar>
      </Content>

    </Container>
  )
}

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.63rem;
  width: 100%;

  .left{
    display: flex;
    align-items: center;
    justify-content: space-between;
    p{
      color: #000;
      text-align: center;
      font-family: Plus Jakarta Sans;
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.5rem; /* 200% */
    }
  }

  img{
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;
  }

  .btns{
    display: flex;
    gap: 10px;
  }
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  h1{
    color: #0D163A;
    font-family: Plus Jakarta Sans;
    font-size: 1.625rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem; 
  }
  h2{
    color: rgba(42, 42, 42, 0.60);
    font-family: Plus Jakarta Sans;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 200% */
  }
  h3{
    color: rgba(42, 42, 42, 0.60);
    font-family: Plus Jakarta Sans;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem; /* 200% */
  }
  h4{
    color: rgba(42, 42, 42, 0.60);
    font-family: Plus Jakarta Sans;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 200% */
  }
  h5{
    color: rgba(42, 42, 42, 0.60);
    font-family: Plus Jakarta Sans;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem; /* 200% */
  }
`;

const Slidebar = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 0;
  h1{
    color: #0D163A;
    font-family: Plus Jakarta Sans;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem;
    width: 100px;
    text-align: right;
  }

  .customSlider{
    width: 16rem;
    max-width: 16rem;
    height: 15px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .customSlider-thumb{
    width: 0.75rem;
    height: 0.75rem;
    flex-shrink: 0;
    background-color: #6941c6;
    border-radius: 50%;
    cursor: pointer;
  }

  .customSlider-mark.customSlider-mark-before {
      background-color: ${MainPurpleColor};
    }
    
    .customSlider-mark.customSlider-mark-active {
      display: none;
    }

    .customSlider-track-0{
      background-color: ${MainPurpleColor} !important;
    }

  .customSlider-track{
    height: 0.3125rem;
    background: #BEBEBE;
    width: 100%;
  }

  .customSlider-mark {
      width: 0.75rem;
      height: 0.75rem;
      flex-shrink: 0;
      background-color:#BEBEBE;
      border-radius: 50%;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  padding-top: 0.75rem;
  width: 100%;
  position: relative;
`;

const Divider = styled.div`

  margin-top: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding-bottom: 0.7rem;
  h2{
    color: #0D163A;
    font-family: Plus Jakarta Sans;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 150% */
  }
  h3{
    color: rgba(42, 42, 42, 0.60);
    font-family: Plus Jakarta Sans;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem;
  }

`;

const Container = styled.div`

    width: 100%;
    max-width:45.375rem;
    height: 18.125rem;
    border-radius: 0.875rem;
    background: #FFF;
    padding: 1.56rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    .title{
        color: #0D163A;
        font-family: Plus Jakarta Sans;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.5rem; 
        width: 100%;
        text-align: left;
    }

    .ask-loan-btn{
      width: 100%;
      height: 2.375rem;
      max-width: fit-content;
      padding-left: 1.4rem;
      padding-right: 1.4rem;
      border-radius: 1.25rem;
      background-color: ${MainPurpleColor};
      border: 1px solid transparent;
      color: #FFF;
      flex-shrink: 0;
      font-size: 1rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.5rem;
      align-self: center;

    &:enabled{
        &:hover{
          color: ${MainPurpleColor};
          border: 1px solid ${MainPurpleColor};
          background-color: #FFF;
      }
    }
  }

`;
