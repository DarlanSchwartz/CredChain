import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "./Components/Logo";
import { MainPurpleColor } from "../Colors";
import { AiOutlineEyeInvisible } from "react-icons/ai";


export default function LoginPage() {
  const [cpf, setCpf] = useState("");
  //const [disable, setDisable] = useState(false);
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
    setCpf(inputText);
    setCharCount(inputText.length);
    //if(inputText.length === 11) {
      //  setDisable(true)
   // } else {
    //  setDisable(false)
   // }
  }

  function SignIn(e) {
    e.preventDefault();
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
   placeholder="CPF"
   required
   value={cpf}
   onChange={handleInputChange}
   minLength="11"
   maxLength="11"
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
    <img src="/images/pictures/user-check.png" alt="Image check user cpf"/>
    <div>
    <h4>CPF</h4>
    <h6>123.444.555.09</h6>
    </div>
    <h5>Trocar</h5>
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
   <button 
   type="submit" 
   //disabled={disable}
  // style={{ backgroundColor: disable ? `${MainPurpleColor}` : "#d9d9d9" }}
   >
      Entrar
   </button>

   <DivRememberPassword>
    <div>
      <Checkbox type="checkbox" />
      <h6>Lembrar senha</h6>
    </div>

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
    background-color: ${MainPurpleColor};
    //background-color: ${(props) => props.disabled === true ? '#000000' :' #d9d9d9'};
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
max-height: 570px;
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
  //background-color: ${(props) => props.disabled === true ? '#000000' :' #d9d9d9'};
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

const DivRememberPassword = styled.div`
display: flex;
flex-direction: row;
margin-bottom: 40px;
width: 100%;
height: 100%;
max-height: 26px;
font-size: 12px;
color: rgba(168, 168, 168, 1);

div {

  width: 100%;
  display: flex;
  flex-direction: row;
}

h6, p {
  width: 100%;
}

h6 {
  align-self: center;
}

p {
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