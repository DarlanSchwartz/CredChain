import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useState, useContext } from "react";
import Logo from "./Components/Logo";
import { MainPurpleColor } from "../Colors";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import UserContext from "../Contexts/LoginContext";
import { backendroute } from "../routes/routes";


export default function LoginPage() {

  const [cpf, setCpf] = useState("");
  const [disable, setDisable] = useState(false);
  const [charCount, setCharCount] = useState(0)
  const [mostrando, setMostrando] = useState("display-cpf");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function goToSignUp() {
    navigate("/signup");
  }


  function SignInCpf(e) {
    e.preventDefault();
    setMostrando("display-password")
  }

  function handleInputChange(e) {
    const inputText = e.target.value;
    setCpf(formatarCPF(e.target.value));
    setCharCount(inputText.length);
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

  function changeDisplay() {
    setMostrando("display-cpf")
  }

  function SignIn(e) {
    e.preventDefault();
    const newSignIn = { cpf: cpf.replaceAll('.', '').replaceAll('-', ''), password: password };

    setDisable(true);

    axios
      .post(backendroute.postLogin, newSignIn)
      .then((res) => {
        console.log('res.data do login', res.data)
        localStorage.setItem("token", res.data.token);
        navigate("/score");
        setDisable(false);
      })
      .catch((erro) => {
        alert(erro.response.data);
        console.log("Erro em postSignIn", erro);
        setDisable(false);
      });
  }


  return (
    <Container>
      <SizeLogo>
        <Logo />
      </SizeLogo>

      {mostrando === "display-cpf" && (
        <FormCpfLogin onSubmit={SignInCpf}>
          <div>
            <h1>Entrar na CredChain</h1>
            <h3>Identifique-se para entrar na CredChain</h3>
          </div>

          <input
            type="text"
            autoComplete="cpf"
            placeholder="CPF   (XXX.XXX.XXX-XX)"
            required
            value={cpf}
            onChange={handleInputChange}
            minLength="11"
            maxLength="14"
          />

          <div>
            <button
              type="submit"
            //disabled={disable}
            // style={{ backgroundColor: disable ? `${MainPurpleColor}` : "#d9d9d9" }}
            >
              Continuar
            </button>

            <DivLink>
              <p>Não possui cadastro?</p>
              <div onClick={goToSignUp}>CRIE SUA CONTA</div>
            </DivLink>
          </div>
        </FormCpfLogin>
      )}




      {mostrando === "display-password" && (
        <FormPasswordLogin onSubmit={SignIn}>
          <div>
            <h1>Entrar na CredChain</h1>
            <CpfInfo>
              <img src="/images/pictures/user-check.png" alt="Image check user cpf" />
              <div>
                <h4>CPF</h4>
                <h6>{cpf}</h6>
              </div>
              <h5 onClick={changeDisplay}>Trocar</h5>
            </CpfInfo>
          </div>


          <DivPassword>
            <input
              type="password"
              placeholder="Senha"
              autoComplete="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <AiOutlineEyeInvisible className="closed-eye" />
          </DivPassword>

          <div>
            <button type="submit" disabled={disable}>
              <LoadingButtonContent>
                {disable ? (
                  <ThreeDots
                    type="ThreeDots"
                    color="#FFFFFF"
                    height={20}
                    width={50}
                  />
                ) : (
                  "Entrar"
                )}
              </LoadingButtonContent>
            </button>


            <DivRememberPassword>
              <CheckboxDiv>
                <Checkbox type="checkbox" />
                <h6>Lembrar senha</h6>
              </CheckboxDiv>
              <p>Esqueci a senha</p>
            </DivRememberPassword>

          </div>
        </FormPasswordLogin>

      )}
    </Container>
  );
}

const Container = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  * {
    font-family: Plus Jakarta Sans, sans-serif;
  }
`;

const SizeLogo = styled.div`
  margin: 60px 0px;
`;

const FormCpfLogin = styled.form`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 400px;
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
    background-color: ${MainPurpleColor};
    //background-color: ${(props) => props.disabled === true ? '#000000' : ' #d9d9d9'};
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



const FormPasswordLogin = styled.form`
background-color: #ffffff;
width: 100%;
height: 100%;
max-width: 400px;
max-height: 400px;
border-radius: 20px;
padding: 30px;
display: flex;
flex-direction: column;
justify-content: space-between;

h1 {
  font-weight: 700;
  font-size: 25px;
  margin-bottom: 15px;
  align-self: flex-start;
  margin-bottom: 20px;
}

h3 {
  align-self: flex-start;
  color: rgba(168, 168, 168, 1);
}

input:not([type="checkbox"]) {
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
  background-color: ${MainPurpleColor};
  //background-color: ${(props) => props.disabled === true ? '#000000' : ' #d9d9d9'};
margin-bottom: 10px;
}
`;

const CpfInfo = styled.div`
border: 1px solid #CFCFCF;
border-radius: 20px;
padding: 15px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;

img {
  width: 100%;
  height: 100%;
  max-width: 47px;
  max-height: 47px;
}

div {
  display: flex;
  flex-direction: column
}

h4 {
  color: #000000;
  font-weight: bold
}

h6 {
  color: #A8A8A8;
  margin-top: 5px;
}

h5 {
  color: ${MainPurpleColor};
  font-weight: bold;
  cursor: pointer;
 
  &:hover {
    text-decoration: underline;
  }
}

`;

const DivPassword = styled.div`
  position: relative;
  height: 100%;
  max-height: 50px;
  width: 100%;
  max-width: 400px;

  .closed-eye {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: rgba(168, 168, 168, 1);
    font-size: 25px;
  }
`;

const LoadingButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DivRememberPassword = styled.div`
display: flex;
flex-direction: row;
margin-bottom: 40px;
width: 100%;
height: 100%;
max-height: 26px;
font-size: 12px;
color: rgba(168, 168, 168, 1);

p {
  align-self: center;
  width: 40%;
}
`;

const CheckboxDiv = styled.div`
display: flex;
flex-direction: row;
width: 100%;

h6 {
align-self: center;
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
  margin-right: 10px;

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