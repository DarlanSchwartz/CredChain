import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "./Components/Logo";
import { MainPurpleColor } from "../Colors";
import { AiOutlineEyeInvisible } from "react-icons/ai";

export default function SignUpPage() {
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);

  const navigate = useNavigate();

  function goToLogin() {
    navigate("/login");
  }

  function SignUp(e) {
    e.preventDefault();

    const newSignUp = {
      cpf: cpf,
      name: name,
      date: date,
      email: email,
      password: password,
    };
    setDisable(true);
  }

  return (
    <Container>
      <SizeLogo>
        <Logo />
      </SizeLogo>

      <FormSignUp onSubmit={SignUp}>
        <h1>Cadastre-se</h1>

        <input
          type="text"
          autoComplete="cpf"
          placeholder="CPF"
          required
          disabled={disable}
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          maxLength="11"
        />

        <input
          type="text"
          autoComplete="name"
          placeholder="Nome Completo"
          required
          disabled={disable}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          autoComplete="date"
          placeholder="Data de nascimento"
          required
          disabled={disable}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="email"
          autoComplete="email"
          placeholder="E-mail"
          required
          disabled={disable}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <DivPassword>
          <input
            type="password"
            placeholder="Senha"
            autoComplete="password"
            required
            disabled={disable}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AiOutlineEyeInvisible className="closed-eye" />
        </DivPassword>

        <DivCheckbox>
          <Checkbox type="checkbox" />
          <p>
            Declaro que li e aceito os <span>termos</span>
          </p>
        </DivCheckbox>

        <button type="submit" disabled={disable}>
          <LoadingButtonContent>
            {disable ? <h1>Carregando...</h1> : "CRIAR CONTA GRÁTIS"}
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
  max-width: 663px;
  max-height: 700px;
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
    background-color: rgba(217, 217, 217, 1);
    border: none;
    width: 100%;
    height: 100%;
    max-width: 350px;
    max-height: 45px;
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;

    &:hover {
      background-color: ${MainPurpleColor};
    }
  }
`;

const DivPassword = styled.div`
  background-color: red;
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
  }
`;

const DivCheckbox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px 0px 60px 0px;
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
