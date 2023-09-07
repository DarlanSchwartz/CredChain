import React, { useRef, useState } from 'react'
import PageContentWrapper from './Components/PageContentWrapper';
import { styled } from 'styled-components';
import VisualScore from './Components/Score/VisualScore';
import { MainPurpleColor } from '../Colors';
import Company from './Components/Score/Company';
export default function ScorePage() {
  const [showModalConnect, setShowModalConnect] = useState(false);
  const [canRegister, setCanRegister] = useState(false);
  const [phone, setPhone] = useState('');
  const [cpnj, setCnpj] = useState('');
  const cpnjRef = useRef();
  const inscricaoRef = useRef();
  const razaoRef = useRef();
  const nome_fantasiaRef = useRef();
  const termsRef = useRef();
  const phoneRef = useRef();
  const responsibleRef = useRef();
  function closeModal() {
    setShowModalConnect(false);
  }

  function openModal() {
    setShowModalConnect(true);
  }

  function updateCanRegister() {
    if (cpnjRef.current.value.length == 18
      && inscricaoRef.current.value.length >= 3
      && razaoRef.current.value.length >= 3
      && nome_fantasiaRef.current.value.length >= 3
      && phone.length == 15
      && termsRef.current.checked
      && responsibleRef.current.checked) {
      setCanRegister(true);
    }
    else {
      setCanRegister(false);
    }
  }

  function register(e) {
    e.preventDefault();
  }

  function formatPhone(value) {
    const number = value.replace(/\D/g, '');
    let formattedNumber = '';

    if (number.length >= 3) {
      formattedNumber = `(${number.substring(0, 2)}) `;

      if (number.length >= 8) {
        formattedNumber += `${number.substring(2, 7)}-`;

        if (number.length > 6) {
          formattedNumber += number.substring(7);
        }
      } else {
        formattedNumber += number.substring(2);
      }
    } else {
      formattedNumber = number;
    }

    return formattedNumber;
  }

  function formatCNPJ(cpnjText) {
    cpnjText = cpnjText.replace(/\D/g, "");
    if (cpnjText.length >= 2) {
      cpnjText = cpnjText.replace(/^(\d{2})(\d{0,3})?(\d{0,3})?(\d{0,4})?(\d{0,2})?/, function (match, p1, p2, p3, p4, p5) {
        let result = p1;
        result += ".";
        if (p2) {
          result += p2;
          if (p3) {
            result += ".";
            result += p3;
            if (p4) {
              result += "/";
              result += p4;
              if (p5) {
                result += "-";
                result += p5;
              }
            }
          }
        }
        return result;
      });
      return cpnjText;
    } else {
      return cpnjText;
    }
  }


  return (
    <PageContentWrapper>
      <Container>
        <VisualScore />
        <MyEnterprise>
          <h1>Minha Empresa</h1>
          <button onClick={openModal}>+</button>
        </MyEnterprise>
        <Company name={"Minha Empresa"}/>
        {
          showModalConnect &&
          <ModalContainer onMouseDown={closeModal}>
            <RegisterCompanyForm onSubmit={register} onMouseDown={(e) => e.stopPropagation()}>
              <h1 className='title'>Cadastre sua Empresa</h1>
              <FieldsContainer>
                <input value={cpnj} onChange={(e) => { setCnpj(formatCNPJ(e.target.value)); updateCanRegister(); }} minLength={18} maxLength={18} required ref={cpnjRef} type="text" placeholder='CNPJ' id='cnpj' name='cnpj' />
                <input onChange={updateCanRegister} minLength={3} required ref={inscricaoRef} type="text" placeholder='Inscrição Estadual' id='inscricao' name='inscricao' />
                <input onChange={updateCanRegister} minLength={3} required ref={razaoRef} type="text" placeholder='Razão Social' id='razao' name='razao' />
                <input onChange={updateCanRegister} minLength={3} required ref={nome_fantasiaRef} type="text" placeholder='Nome Fantasia' id='nome_fantasia' name='nome_fantasia' />
                <input value={phone} onChange={(e) => { setPhone(formatPhone(e.target.value)); updateCanRegister(); }} minLength={15} maxLength={15} required ref={phoneRef} type="text" placeholder='Telefone' id='phone' name='phone' />
              </FieldsContainer>
              <CheckboxesContainer>
                <CheckboxElementContainer>
                  <input onChange={updateCanRegister} ref={responsibleRef} type="checkbox" />
                  <h2>Declaro ser responsável legal pela empresa</h2>
                </CheckboxElementContainer>
                <CheckboxElementContainer>
                  <input onChange={updateCanRegister} ref={termsRef} type="checkbox" />
                  <h2>Declaro que li e aceito os <span>termos</span></h2>
                </CheckboxElementContainer>
              </CheckboxesContainer>
              <button disabled={!canRegister} id='cadastrar'>Cadastrar</button>
            </RegisterCompanyForm>
          </ModalContainer>
        }
      </Container>
    </PageContentWrapper>
  )
}

const CheckboxElementContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.69rem;

  h2{
    color: #A8A8A8;
    font-family: Plus Jakarta Sans;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 133.333% */
    span{
      color: ${MainPurpleColor};
      font-family: Plus Jakarta Sans;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.5rem;
      cursor: pointer;
    }
  }

  input[type=checkbox]{
    width: 1.125rem;
    height: 1.125rem;
    border-radius: 0.125rem;
    border: 1px solid #999;
    background: #FFF;
    cursor: pointer;
  }

`;

const CheckboxesContainer = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 2.25rem;
  margin-top: 3.81rem;

`;

const FieldsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.75rem ;
  margin-top: 3.56rem;
`;

const RegisterCompanyForm = styled.form`
  width: 100%;
  max-width: 41.4375rem;
  min-height: 44.5625rem;
  border-radius: 1.25rem;
  background: #FFF;
  padding: 2.13rem;
  padding-top: 1.75rem;
  display: flex;
  align-items: center;
  flex-direction: column;


  input[type=text]{
      font-family: Plus Jakarta Sans;
      width: 100%;
      border: 0;
      font-size: 1.5rem;
      line-height: 1.5rem; 
      font-style: normal;
      border-bottom: 1px solid lightgray;
      height: 2.2rem;
      &:focus{
        outline: 0;
      }
      &::placeholder {
      color: #A8A8A8;
     
      font-weight: 400;
   
    }
  }

  .title{
    color: #020202;
    font-family: Plus Jakarta Sans;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.5rem; /* 100% */
    text-align: left;
    width: 100%;
  }

  #cadastrar{
    color: #FFF;
    font-family: Plus Jakarta Sans;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem; /* 100% */
    margin-top: 1.62rem;
    border: 0;
    width: 100%;
    max-width: 25.625rem;
    min-height: 3.25rem;
    border-radius: 12rem;
    border: 1px solid transparent;

    &:enabled{
      background-color: ${MainPurpleColor};
      &:hover{
        background-color: white;
        color: ${MainPurpleColor};
        border: 1px solid ${MainPurpleColor}
      }
    }

    &:disabled{
      background-color: #D9D9D9;
      cursor: not-allowed;
    }
  }
`;

const Container = styled.div`
  display: flex;
  gap: 22px;
  margin-top: 44px;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;

`;

const MyEnterprise = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;

  width: 100%;
  max-width: 41.4375rem;
  min-height: 4.5625rem;
  border-radius: 1.25rem;
  background: #FFF;

  h1{
    color: #020202;
    font-family: Plus Jakarta Sans;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.5rem; /* 100% */
  }

  button{
    border: 0;
    background: 0;
    color: #020202;
    font-family: Plus Jakarta Sans;
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.5rem; 
  }
`;


const ModalContainer = styled.main`
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;