import React from "react";
import { styled } from "styled-components";
import BackgroundDegrade from "../PictureMudarDepois/background.png";
import { MainPurpleColor } from "../Colors";
import ScoreImage from "../PictureMudarDepois/score.png";
import Emprestimos from "../PictureMudarDepois/undraw_ether_re_y7ft.svg";
import FooterBackgroundDegrade from "../PictureMudarDepois/footer-background.png";
import FooterCellphone from "../PictureMudarDepois/phone-footer-background.png";
import AppleIcon from "../PictureMudarDepois/apple.png";
import AndroidIcon from "../PictureMudarDepois/android.png";

export default function HomePage() {
  return (
    <Container>
      <Header>
        <img src="cred-chain-logo-aqui" />
        <MenuItems>
          <Buttons>Documentação</Buttons>
          <Buttons>Cadastre-se</Buttons>
          <ButtonLogin>Entrar</ButtonLogin>
        </MenuItems>
      </Header>

      <BackgroundContainer>
        <ImageBackground src={BackgroundDegrade} />
        <Register>
          <h1>
            Consulte seu score e consiga crédito através de ativos
            colateralizados.
          </h1>
          <p>
            Somos o primeiro Birô de Crédito on-chain e Multi chain do Brasil.
          </p>
          <button>Cadastre-se</button>
        </Register>
        <ScoreBackground>
          <img src={ScoreImage} />
        </ScoreBackground>
      </BackgroundContainer>

      <ContainerSecondPage>
        <Item>
          <img src={Emprestimos} />
          <h2>Empréstimos com Colateral</h2>
          <p>
            Colaterali-se financiamento e emprestimos utilizando stETH em Stake
            na Lido Finance para tomar credito a bancos comerciais.
          </p>
        </Item>

        <Item>
          <img src={Emprestimos} />
          <h2>Score para Tokenizar recebíveis</h2>
          <p>
            Conecte suas redes e bancos para ter um Score positivo para ajudar a
            sua empresa antecipar recebíveis e ter acesso facilitado a crédito
          </p>
        </Item>

        <Item>
          <img src={Emprestimos} />
          <h2>Cadastro positivo do seu CPF e CNPJ</h2>
          <p>
            Com cadastro positivo você pode ter acesso mais facilitado a credito
            e serviços em bancos e instituições financeiras
          </p>
        </Item>

        <Item>
          <img src={Emprestimos} />
          <h2>Rating para negócios</h2>
          <p>
            Saiba o risco de cada empresa na hora de realizar negócios e comprar
            ativos tokenizado com a mesma
          </p>
        </Item>

        <Item>
          <img src={Emprestimos} />
          <h2>Acompanhe todos seus ativos</h2>
          <p>
            Acompanhe todo seu patrimonio em qualquer rede blockchain existente
            e no sistema financeiro nacional
          </p>
        </Item>
      </ContainerSecondPage>

      <ContainerThirdPage>
        <FooterBackgDegrade src={FooterBackgroundDegrade} />

        <CellphoneImage>
          <img src={FooterCellphone} />
        </CellphoneImage>

        <InfosForDownload>
          <h1>Baixe já</h1>
          <h2>nosso APP</h2>

          <IconsForDownload>
            <DivApple>
              <img src={AppleIcon} />
              <div>
              <h4>Download on the</h4>
              <h3>App Store</h3>
              </div>
             
            </DivApple>

            <DivAndroid>
              <img src={AndroidIcon} />
              <div>
              <h4>GET IT ON</h4>
              <h3>Google Play</h3>
              </div>
            </DivAndroid>
          </IconsForDownload>
        </InfosForDownload>
      </ContainerThirdPage>
    </Container>
  );
}

const Container = styled.main`
  height: 100%;

  * {
    font-family: "Roboto", sans-serif;
  }
`;

const ImageBackground = styled.img`
  width: 100%;
  height: 90%;
`;

const BackgroundContainer = styled.div`
  position: relative;
  width: 100%;
  height: 91%;
  margin-top: 90px;
`;

const Header = styled.header`
  width: 100%;
  height: 90px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  z-index: 2;

  img {
    width: 170px;
    margin-left: 120px;
  }
`;

const MenuItems = styled.div`
  button {
    height: 50px;
    border-radius: 20px;
    border: none;
    width: 150px;
    font-size: 18px;
    font-weight: 500px;
    margin-left: 3px;
  }
`;

const Buttons = styled.button`
  color: rgb(32, 32, 32, 0.4);
  background-color: #ffffff;
`;

const ButtonLogin = styled.button`
  color: #ffffff;
  background-color: ${MainPurpleColor};
  font-weight: 700;
  margin-right: 80px;
`;

const Register = styled.div`
  position: absolute;
  top: 15%;
  left: 0;
  width: 650px;

  h1 {
    font-size: 48px;
    color: #ffffff;
    font-weight: 600;
    padding-left: 70px;
    line-height: 60px;
  }

  p {
    font-size: 24px;
    color: #ffffff;
    font-weight: 400;
    margin-top: 20px;
    padding-left: 70px;
    line-height: 30px;
  }

  button {
    width: 150px;
    height: 55px;
    margin-left: 70px;
    margin-top: 30px;
    border-radius: 20px;
    border: none;
    font-size: 20px;
    font-weight: bold;
    color: ${MainPurpleColor};
    background-color: #ffffff;
  }
`;

const ScoreBackground = styled.div`
  width: 859px;
  height: 630px;
  position: absolute;
  top: 18%;
  left: 45%;
`;

const ContainerSecondPage = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Item = styled.div`
  width: 380px;
  margin: 10px 40px 30px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;

  img {
    height: 280px;
    margin-bottom: 30px;
  }

  h2 {
    font-size: 30px;
    font-weight: bold;
    color: #000000;
    text-align: center;
    margin-bottom: 30px;
  }
  p {
    color: rgb(32, 32, 32, 0.4);
    font-size: 20px;
    text-align: center;
  }
`;

const ContainerThirdPage = styled.div`
  position: relative;
  width: 100%;
`;

const FooterBackgDegrade = styled.img`
  width: 100%;
  height: 700px;
`;

const CellphoneImage = styled.div`
  width: 859px;
  height: 630px;
  position: absolute;

  bottom: 10%;
  left: 3%;
`;

const InfosForDownload = styled.div`
  position: absolute;
  top: 25%;
  right: 10%;
  width: 650px;

  h1 {
    font-size: 60px;
    color: #ffffff;
    font-weight: 600;
    line-height: 60px;
  }

  h2 {
    font-size: 55px;
    color: #000000;
    font-weight: 600;
    line-height: 60px;
    margin-bottom: 100px;
  }

  button {
    width: 150px;
    height: 55px;
    margin-left: 70px;
    margin-top: 30px;
    border-radius: 20px;
    border: none;
    font-size: 20px;
    font-weight: bold;
    color: ${MainPurpleColor};
    background-color: #ffffff;
  }
`;

const IconsForDownload = styled.div`
display: flex;
flex-direction: row;
`;

const DivApple = styled.div`
  display: flex;
  flex-direction: row;
  width: 200px;
  margin-right: 20px;
  padding: 10px 10px;
  border: none;
  background-color: black;
  border-radius: 10px;
  cursor: pointer;
  
  img {
    width: 30px;
    margin-right: 10px;
  }

  h4, h3 {
    color: #FFFFFF;
  }

  h4 {
    font-size: 12px;
    font-weight: 500;
    padding-bottom: 5px;
  }

  h3 {
    font-size: 25px;
    font-weight: 500;
  }
`;

const DivAndroid = styled.div`
  display: flex;
  flex-direction: row;
  width: 200px;
  padding: 10px 10px;
  border: none;
  background-color: black;
  border-radius: 10px;
  cursor: pointer;

  img {
    width: 30px;
    margin-right: 10px;
  }

  h4, h3 {
    color: #FFFFFF;
  }

  h4 {
    font-size: 12px;
    font-weight: 500;
    padding-bottom: 5px;
  }

  h3 {
    font-size: 25px;
    font-weight: 400;
  }
`;

