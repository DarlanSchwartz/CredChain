import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState,useRef} from "react";
import axios from "axios";
import Logo from "./Components/Logo";
import { MainPurpleColor } from "../Colors";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { backendroute } from "../routes/routes";
import { ThreeDots } from "react-loader-spinner";

export default function SignUpPage() {
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(true);
  const [signinUp, setSigninUp] = useState(false);
  const  [showPassword, setShowPassword]  = useState(false);


  const cpfRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const dateRef = useRef();
  const passwordRef = useRef();
  const terms = useRef();

  const navigate = useNavigate();

  function goToLogin() {
    navigate("/login");
  }
  function formatarCPF(value) {
    // Remover caracteres não numéricos
    var cpf = value.replace(/\D/g, '');

    // Verificar se o CPF está vazio
    if (cpf === '') {
      return cpf;
    }

    // Adicionar a formatação conforme o CPF é digitado
    if (cpf.length > 3) {
      cpf = cpf.substring(0, 3) + '.' + cpf.substring(3);
    }
    if (cpf.length > 7) {
      cpf = cpf.substring(0, 7) + '.' + cpf.substring(7);
    }
    if (cpf.length > 11) {
      cpf = cpf.substring(0, 11) + '-' + cpf.substring(11);
    }

    // Atualizar o valor do campo de entrada
     return cpf;
  }
  function formatarData(inputValue) {
    // Remove caracteres não numéricos da entrada
    const cleanedValue = inputValue.replace(/\D/g, '');

    // Formata a data conforme o usuário digita
    if (cleanedValue.length <= 2) {
      return cleanedValue;
    } else if (cleanedValue.length <= 4) {
      return cleanedValue.slice(0, 2) + '/' + cleanedValue.slice(2);
    } else {
      return cleanedValue.slice(0, 2) + '/' + cleanedValue.slice(2, 4) + '/' + cleanedValue.slice(4, 8);
    }
  }
//a@a.com
  function updateCanRegister() {
    // 12/12/2023
    //[12,12,2023]
    if (cpfRef.current.value.length == 14
      && nameRef.current.value.length >= 3
      && passwordRef.current.value.length >= 3
      && dateRef.current.value.length >= 10
      && emailRef.current.value.length >= 7
      && terms.current.checked
      && Number(dateRef.current.value.split('/')[2]) < new Date().getFullYear()
      && Number(dateRef.current.value.split('/')[1]) <= 12
      ) {
        setDisable(false);
    }
    else {
      setDisable(true);
    }
  }


  function SignUp(e) {
    e.preventDefault();
    const newSignUp = {
      cpf: cpf.replaceAll('.', '').replaceAll('-', ''),
      name: name,
      date: date.split('/').join('-'),
      email: email,
      password: password,
    };
    setSigninUp(true);
    setDisable(true);

    axios
    .post(backendroute.postSignUp, newSignUp)
    .then((res) => {
      navigate("/login");
      setDisable(false);
      setSigninUp(false);
    })
    .catch((erro) => {
      alert(erro.response.data);
      console.log("Erro em postSignUp", erro);
      setDisable(false);
      setSigninUp(false);
    });


  }

  return (
    <Container>
      <SizeLogo>
        <Logo />
      </SizeLogo>

      <FormSignUp $disabled={disable.toString()} onSubmit={SignUp}>
        <h1>Cadastre-se</h1>

        <input
        ref={cpfRef}
        autoFocus
          type="text"
          autoComplete="cpf"
          placeholder="CPF   (XXX.XXX.XXX-XX)"
          required
          disabled={signinUp}
          value={cpf}
          onChange={(e) => {
            setCpf(formatarCPF(e.target.value));
            updateCanRegister();
          }}
          minLength="14"
          maxLength="14"
        />

        <input
          ref={nameRef}
          type="text"
          autoComplete="name"
          placeholder="Nome Completo"
          required
          disabled={signinUp}
          value={name}
          minLength={3}
          onChange={(e) => {
            setName(e.target.value);
            updateCanRegister();
          }}
        />

        <input
          ref={dateRef}
          id="date"
          name="date"
          type="text"
          autoComplete="date"
          placeholder="Data de nascimento    (DD-MM-AAAA)"
          required
          disabled={signinUp}
          value={date}
          onChange={(e) => {
            setDate(formatarData(e.target.value));
            updateCanRegister();
          }}
          minLength={10}
          maxLength="10"
        />

        <input
        ref={emailRef}
          type="email"
          autoComplete="email"
          placeholder="E-mail"
          required
          disabled={signinUp}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            updateCanRegister();
          }}
        />

        <DivPassword>
          <input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            autoComplete="password"
            required
            disabled={signinUp}
            value={password}
            minLength={3}
            onChange={(e) => {
              setPassword(e.target.value);
              updateCanRegister();
            }}
          />
          <AiOutlineEyeInvisible  onClick={() => setShowPassword(!showPassword)} className="closed-eye" />
        </DivPassword>

        <DivCheckbox>
          <Checkbox type="checkbox" ref={terms} disabled={signinUp} onChange={()=> updateCanRegister()} />
          <p>
            Declaro que li e aceito os <span>termos</span>
          </p>
        </DivCheckbox>

        <button type="submit" disabled={disable}>
        <LoadingButtonContent>
          {signinUp ? (
            <ThreeDots
              type="ThreeDots"
              color="#FFFFFF"
              height={20}
              width={50}
            />
          ) : (
            "CRIAR CONTA GRÁTIS"
          )}
          </LoadingButtonContent>
        </button>

        <DivLink>
          <p>Já tenho cadastro.</p>
          <div onClick={goToLogin}>FAZER LOGIN</div>
        </DivLink>
      </FormSignUp>
    </Container>
  );
}

const Container = styled.main`
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f7f7fb;

  * {
    font-family: Plus Jakarta Sans, sans-serif;
  }
`;

const SizeLogo = styled.div`
  margin: 60px 0px;
`;

const FormSignUp = styled.form`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  max-width: 663px;
  max-height: 580px;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 20px;
    align-self: flex-start;
  }

  input:not([type="checkbox"]) {
    margin-bottom: 40px;
    height: 100%;
    max-height: 30px;
    width: 100%;
    border: none;
    border-bottom: 1px solid rgba(168, 168, 168, 1);
    font-size: 18px;

    outline: none;

    &::placeholder {
      color: rgba(168, 168, 168, 1);
    }
  }

  button {
    background-color:${(props) => props.$disabled == 'true' ? 'rgba(217, 217, 217, 1)' : 'white'} ;
    border: none;
    width: 100%;
    height: 100%;
    max-width: 350px;
    max-height: 45px;
    border: 1px solid ${(props) => props.$disabled == 'true' ? 'transparent' : MainPurpleColor};
    color: ${(props) => props.$disabled == 'true' ? 'white' : MainPurpleColor} ;
    font-size: 20px;
    font-weight: bold;
    border-radius: 45px;

    &:enabled{
      &:hover {
        color:white;
        background-color: ${MainPurpleColor};
      }
    }
    &:disabled{
      background: #D9D9D9;
      cursor: not-allowed;
    }
  }
`;

const DivPassword = styled.div`
  position: relative;
  height: 100%;
  max-height: 30px;
  width: 100%;

  .closed-eye {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: rgba(168, 168, 168, 1);
    font-size: 25px;
    cursor: pointer;
  }
`;

const DivCheckbox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px 0px 20px 0px;
  height: 100%;
  max-height: 30px;
  color: rgba(168, 168, 168, 1);
  p {
    margin-left: 10px;

    span {
      color: ${MainPurpleColor};
      font-weight: bold;
    }
  }
`;

const Checkbox = styled.input`
  width: 100%;
  height: 100%;
  max-width: 20px;
  max-height: 20px;
  appearance: none;
  border: 1px solid rgba(168, 168, 168, 1);
  border-radius: 4px;
  cursor: pointer;

  &:checked {
    background-color: ${MainPurpleColor};
  }

  &:checked::before {
    content: "\u2713";
    display: block;
    text-align: center;
    color: white;
    font-weight: bold;
  }
`;

export const LinkToSignIn = styled(Link)``;

const LoadingButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DivLink = styled.div`
  display: flex;
  flex-direction: row;
  margin: 30px 0px;
  color: rgba(168, 168, 168, 1);

  div {
    cursor: pointer;
    color: ${MainPurpleColor};
    font-weight: 500;
    margin-left: 5px;

    &:hover {
      text-decoration: underline;
    }
  }
`;
