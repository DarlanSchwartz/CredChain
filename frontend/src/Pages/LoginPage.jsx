import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "./Components/Logo";
import { MainPurpleColor } from "../Colors";


export default function LoginPage() {
  const [cpf, setCpf] = useState("");
  const [disable, setDisable] = useState(false);
  const [charCount, setCharCount] = useState(0)

  const navigate = useNavigate();

  function goToSignUp() {
    navigate("/signup");
  }

  function SignIn(e) {
    e.preventDefault();

    const newSignIn = {
      cpf: cpf,
    };
  }

  function handleInputChange(e) {
    const inputText = e.target.value;
    setCpf(inputText);
    setCharCount(inputText.length);
    if(inputText.length === 11) {
        setDisable(true)
    } else {
      setDisable(false)
    }
  }

  console.log('disabled', disable)

  return (
    <Container>
      <SizeLogo>
        <Logo />
      </SizeLogo>

      <FormSignUp onSubmit={SignIn}>
        <div>
          <h1>Entrar na CredChain</h1>
          <h3>Identifique-se para entrar na CredChain</h3>
        </div>

        <input
          type="text"
          autoComplete="cpf"
          placeholder="CPF"
          required
          value={cpf}
          onChange={handleInputChange}
          maxLength="11"
        />

        <div>
          <button 
          type="submit" 
          disabled={disable}
          style={{ backgroundColor: disable ? `${MainPurpleColor}` : "#d9d9d9" }}
          >
             Continuar
          </button>

          <DivLink>
            <p>Não possui cadastro?</p>
            <div onClick={goToSignUp}>CRIE SUA CONTA</div>
          </DivLink>
        </div>
      </FormSignUp>
    </Container>
  );
}

const Container = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

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
  max-width: 400px;
  max-height: 570px;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1 {
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 15px;
    align-self: flex-start;
  }

  h3 {
    align-self: flex-start;
    color: rgba(168, 168, 168, 1);
  }

  input {
    height: 100%;
    max-height: 50px;
    width: 100%;
    max-width: 400px;
    border: 1px solid rgba(168, 168, 168, 1);
    border-radius: 20px;
    padding-left: 20px;
    font-size: 18px;
    align-self: center;

    outline: none;

    &::placeholder {
      color: rgba(168, 168, 168, 1);
    }
  }

  button {
    border: none;
    width: 100%;
    height: 100%;
    max-width: 350px;
    max-height: 45px;
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    background-color: ${(props) => props.disabled === true ? '#000000' :' #d9d9d9'};
  }
`;


const DivLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0px;
  color: rgba(168, 168, 168, 1);

  div {
    cursor: pointer;
    color: ${MainPurpleColor};
    font-weight: 500;
    margin-top: 10px;

    &:hover {
      text-decoration: underline;
    }
  }
`;
