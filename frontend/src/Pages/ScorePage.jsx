import React, { useEffect, useRef, useState, useContext } from 'react'
import PageContentWrapper from './Components/PageContentWrapper';
import { styled } from 'styled-components';
import VisualScore from './Components/Score/VisualScore';
import { MainPurpleColor } from '../Colors';
import Company from './Components/Score/Company';
import { useNavigate } from "react-router-dom";
import { LoginContext } from '../Contexts/LoginContext';
import RipioBanner from './Components/Banners/RipioBanner';
import OpenFinance from './Components/Banners/OpenFinance';
import { API } from '../routes/routes';
import axios from 'axios';
import { MutatingDots, ThreeDots } from "react-loader-spinner";
import { toast } from 'react-toastify';
/*
  cpf: joi.string().required(),
  inscription: joi.string().trim().required(),
  socialReason: joi.string().trim().required(),
  fantasyName: joi.string().trim().required(),
  phone: joi.number().required()
*/

export default function ScorePage() {

  const { isLoged } = useContext(LoginContext);

  const navigate = useNavigate();

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
  const [myCompanies, setMyCompanies] = useState(undefined);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loadingCompany, setLoadingCompany] = useState(false);


  useEffect(() => {

    isLoged();
    if (localStorage.getItem('token')) {
      findMyCompanies();
    }
  }, [])

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
      && phoneRef.current.value.length == 15
      && termsRef.current.checked
      && responsibleRef.current.checked) {
      setCanRegister(true);
    }
    else {
      setCanRegister(false);
    }
  }

  function findMyCompanies() {
    if (myCompanies) return;
    setLoadingCompany(true);
    axios.get(API.getCompanies, { headers: { Authorization: localStorage.getItem('token') } })
      .then(res => {
        setMyCompanies(res.data);
        setLoadingCompany(false);
      }).catch(error => {
        console.log(error);
        // alert(error.response.data);
        setLoadingCompany(false);
      })
  }

  function register(e) {
    e.preventDefault();
    setIsRegistering(true);

    const company = {
      cnpj: cpnj,
      inscription: inscricaoRef.current.value,
      socialReason: razaoRef.current.value,
      fantasyName: nome_fantasiaRef.current.value,
      phone: phone.replace(/\D/g, '')
    };
    axios.post(API.registerCompany, company, { headers: { Authorization: localStorage.getItem('token') } })
      .then(res => {
        setIsRegistering(false);
        findMyCompanies();
        closeModal();
        toast.success('Empresa registrada com sucesso!', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }).catch(error => {
        setIsRegistering(false);
        toast.error(`Error: ${error.response.data}`, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
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
      <PageContainer>
        <Container>
          <VisualScore />
          <MyEnterprise>
            <h1>Minha Empresa</h1>
            <button disabled={!myCompanies || myCompanies?.length >= 1 || loadingCompany} onClick={openModal}>+</button>
          </MyEnterprise>
          {
            myCompanies ?

              myCompanies.map(company => {
                return <Company key={company.cnpj} name={"Empresa: " + company.fantasyName} />
              })

              :

              <MutatingDots
                height="100"
                width="100"
                color={MainPurpleColor}
                secondaryColor='#6941c6'
                radius='12.5'
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
          }
          {
            showModalConnect &&
            <ModalContainer onMouseDown={closeModal}>
              <RegisterCompanyForm onSubmit={register} onMouseDown={(e) => e.stopPropagation()}>
                <h1 className='title'>Cadastre sua Empresa</h1>
                <FieldsContainer>
                  <input disabled={isRegistering} value={cpnj} onChange={(e) => { setCnpj(formatCNPJ(e.target.value)); updateCanRegister(); }} minLength={18} maxLength={18} required ref={cpnjRef} type="text" placeholder='CNPJ' id='cnpj' name='cnpj' />
                  <input disabled={isRegistering} onChange={updateCanRegister} minLength={3} maxLength={49} required ref={inscricaoRef} type="text" placeholder='Inscrição Estadual' id='inscricao' name='inscricao' />
                  <input disabled={isRegistering} onChange={updateCanRegister} minLength={3} maxLength={49} required ref={razaoRef} type="text" placeholder='Razão Social' id='razao' name='razao' />
                  <input disabled={isRegistering} onChange={updateCanRegister} minLength={3} maxLength={49} required ref={nome_fantasiaRef} type="text" placeholder='Nome Fantasia' id='nome_fantasia' name='nome_fantasia' />
                  <input disabled={isRegistering} value={phone} onChange={(e) => { setPhone(formatPhone(e.target.value)); updateCanRegister(); }} minLength={15} maxLength={15} required ref={phoneRef} type="text" placeholder='Telefone' id='phone' name='phone' />
                </FieldsContainer>
                <CheckboxesContainer>
                  <CheckboxElementContainer>
                    <input required onChange={updateCanRegister} ref={responsibleRef} type="checkbox" />
                    <h2>Declaro ser responsável legal pela empresa</h2>
                  </CheckboxElementContainer>
                  <CheckboxElementContainer>
                    <input required onChange={updateCanRegister} ref={termsRef} type="checkbox" />
                    <h2>Declaro que li e aceito os <span>termos</span></h2>
                  </CheckboxElementContainer>
                </CheckboxesContainer>
                <button disabled={(!canRegister || isRegistering)} id='cadastrar'> {isRegistering ? (
                  <ThreeDots
                    type="ThreeDots"
                    color="#FFFFFF"
                    height={20}
                    width={50}
                  />
                ) : (
                  "Cadastrar"
                )}</button>
              </RegisterCompanyForm>
            </ModalContainer>
          }
        </Container>
        <RightCollumn>
          <OpenFinance />
          <RipioBanner />
        </RightCollumn>
      </PageContainer>
    </PageContentWrapper>
  )
}

const RightCollumn = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2.31rem;
  @media (max-width: 1000px) {
      justify-content: center;
      flex-direction: row;
      width: 100%;
  }

  @media (max-width: 500px) {
     width: 100%;
     flex-direction: column;
     justify-content: flex-start;
     align-items: center;
  }
 
`;

const PageContainer = styled.main`
  display: flex;
  width: 100%;
  gap: 2.31rem;
  margin-top: 44px;
  justify-content: space-between;
  padding-right: 20px;
  @media (max-width: 1000px) {
        justify-content: center;
        flex-direction: column;
    }
`;

const CheckboxElementContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;

  h2{
    color: #A8A8A8;
    font-family: Plus Jakarta Sans;
    font-size:0.8rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 133.333% */
    span{
      color: ${MainPurpleColor};
      font-weight: 700;
      cursor: pointer;
    }
  }

  input[type=checkbox]{
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 0.125rem;
    border: 1px solid #999;
    background: #FFF;
    &:enabled{
      cursor: pointer;
    }
    &:disabled{
      cursor: not-allowed;
    }

  }

`;

const CheckboxesContainer = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  margin-top: 1rem;

`;

const FieldsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem ;
  margin-top: 3.56rem;
`;

const RegisterCompanyForm = styled.form`
  width: 100%;
  max-width: 30rem;
  min-height: 20rem;
  border-radius: 1.25rem;
  background: #FFF;
  padding: 2.13rem;
  padding-top: 1.75rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;


  input[type=text]{
      font-family: Plus Jakarta Sans;
      width: 100%;
      border: 0;
      font-size: 1rem;
      line-height: 1rem; 
      font-style: normal;
      border-bottom: 1px solid lightgray;
      height: 1.5rem;
      &:focus{
        outline: 0;
      }
      &::placeholder {
      color: #A8A8A8;
      font-weight: 400;
    }
    &:disabled{
      cursor: not-allowed;
      opacity: 50%;
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
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
    font-family: Plus Jakarta Sans;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5rem; /* 100% */
    margin-top: 1.62rem;
    border: 0;
    width: 100%;
    max-width: 15rem;
    min-height: 2rem;
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
  width: 100%;
  flex-direction: column;
  gap: 2.31rem;
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
    display: flex;
    align-items: center;
    justify-content: center;
    
    height: 2.5rem;
    width: 2.5rem;
    padding: 0;
    padding-bottom: 10px;
    margin: 0;

    border: 0;
    color: #020202;
    font-family: Plus Jakarta Sans;
    font-size: 40px;
    font-style: normal;
    font-weight: 600;
  
   
    background-color: ${MainPurpleColor};
    border-radius: 50%;
    &:disabled{
      cursor: not-allowed;
      opacity: 50%;
    }
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