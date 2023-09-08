import React from "react";
import { styled } from "styled-components";
import { MainPurpleColor } from "../Colors";
import Footer from "./Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import Logo from "./Components/Logo";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Container>
      <Header>
        <SizeLogo>
          <Logo on_click={() => navigate('/')} />
        </SizeLogo>

        <MenuItems>
          <Buttons>Documentação</Buttons>
          <Buttons>Cadastre-se</Buttons>
          <ButtonLogin>Entrar</ButtonLogin>
        </MenuItems>
      </Header>

      <BackgroundContainer>
        <ImageBackground src="images/pictures/background.png" />
        <Register>
          <h1>
            Consulte seu score e consiga crédito através de ativos
            colateralizados.
          </h1>
          <p>
            Somos o primeiro Birô de Crédito on-chain e multi-chain do Brasil.
          </p>
          <button>Cadastre-se</button>
        </Register>
        <ScoreBackground>
          <img src="/images/pictures/score.png" />
        </ScoreBackground>
      </BackgroundContainer>

      <ContainerSecondPage>
        <Item>
          <img src="images/pictures/undraw_ether_re_y7ft.svg" />
          <h2>Empréstimos com colateral</h2>
          <p>
            Colateralize financiamentos e empréstimos utilizando stETH como stake na Lido Finance para obter crédito junto a bancos comerciais.
          </p>
        </Item>

        <Item>
          <img src="images/pictures/undraw_success_factors_re_ce93.svg" />
          <h2>Score para tokenizar recebíveis</h2>
          <p>
            Conecte suas redes e contas bancárias para obter uma pontuação positiva, ajudando assim sua empresa a antecipar recebíveis e ter acesso facilitado ao crédito.
          </p>
        </Item>

        <Item>
          <img src="images/pictures/undraw_revenue_re_2bmg.svg" />
          <h2>Cadastro positivo do seu CPF e CNPJ</h2>
          <p>
            Com o cadastro positivo, você pode ter acesso mais facilitado ao crédito e a serviços em bancos e instituições financeiras.
          </p>
        </Item>

        <Item>
          <img src="images/pictures/undraw_reviews_lp8w.svg" />
          <h2>Rating para negócios</h2>
          <p>
            Saiba o risco de cada empresa na hora de realizar negócios e comprar ativos tokenizados com a mesma.
          </p>
        </Item>

        <Item>
          <img src="images/pictures/undraw_investment_data_re_sh9x.svg" />
          <h2>Acompanhe todos os seus ativos</h2>
          <p>
            Acompanhe todo o seu patrimônio em qualquer rede blockchain existente e no sistema financeiro nacional.
          </p>
        </Item>
      </ContainerSecondPage>

      <ContainerThirdPage>
        <FooterBackgDegrade src="images/pictures/footer-background.png" />

        <CellphoneImage>
          <img src="/images/pictures/phone-footer-background.png" />
        </CellphoneImage>

        <InfosForDownload>
          <h1>Baixe já</h1>
          <h2>nosso APP!</h2>

          <IconsForDownload>
            <DivApple>
              <img src="/images/pictures/apple.png" />
              <div>
                <h4>Download on the</h4>
                <h3>App Store</h3>
              </div>

            </DivApple>

            <DivAndroid>
              <img src="/images/pictures/android.png" />
              <div>
                <h4>GET IT ON</h4>
                <h3>Google Play</h3>
              </div>
            </DivAndroid>
          </IconsForDownload>
        </InfosForDownload>
      </ContainerThirdPage>
      <Footer />
    </Container>
  );
}

const Container = styled.main`
  height: 100%;

  * {
    font-family: "Roboto", sans-serif;
  }
`;

const SizeLogo = styled.div`

margin-left: 70px;
`;

const ImageBackground = styled.img`
  width: 100%;
  height: 100%;
  max-height: 90%;
`;

const BackgroundContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 91%;
  margin-top: 90px;
`;

const Header = styled.header`
  width: 100%;
  height: 100%;
  max-height: 90px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  z-index: 2;
`;

const MenuItems = styled.div`
  button {
    height: 100%;
    min-height: 50px;
    border-radius: 20px;
    border: none;
    width: 150px; //ajeitar esse depois
    font-size: 18px;
    font-weight: 500px;
    margin-left: 3px;
  }
`;

const Buttons = styled.button`
  color: #646464da;
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
  top: 25%;
  left: 0;
  width: 100%;
  max-width: 780px;


  h1 {
    font-size: 60px;
    color: #ffffff;
    font-weight: 600;
    padding-left: 70px;
    line-height: 60px;
  }

  p {
    font-size: 32px;
    color: #ffffff;
    font-weight: 400;
    margin-top: 20px;
    padding-left: 70px;
    line-height: 36px;
  }

  button {
    width: 100%;
    max-width: 150px;
    height: 100%;
    min-height: 55px;
    margin-left: 70px;
    margin-top: 30px;
    border-radius: 20px;
    border: none;
    font-size: 20px;
    font-weight: bold;
    color: ${MainPurpleColor};
  }
`;

const ScoreBackground = styled.div`
    position: absolute;
    top: 18%;
    left: 45%;
    min-width: 400px;
    max-width: 859px;
    max-height: 630px;

    img{
      width: 100%;
    }
`;

const ContainerSecondPage = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Item = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 10px 40px 30px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;

  img {
    height: 100%;
    max-height: 280px;
    margin-bottom: 30px;
  }

  h2 {
    font-size: 30px;
    font-weight: bold;
    color: #000000;
    text-align: center;
    margin-bottom: 30px;
    width: 550px;
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
  height: 100%;
  max-height: 700px;
`;

const CellphoneImage = styled.div`
width: 100%;
height: 100%;
  max-width: 859px;
  max-height: 630px;
  position: absolute;

  bottom: 10%;
  left: 3%;
`;

const InfosForDownload = styled.div`
  position: absolute;
  top: 25%;
  right: 10%;
  width: 100%;
  max-width: 650px;

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
    width: 100%;
    height: 100%;
    max-width: 150px;
    max-height: 55px;
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
  width: 100%;
  max-width: 200px;
  margin-right: 20px;
  padding: 10px 10px;
  border: none;
  background-color: black;
  border-radius: 10px;
  cursor: pointer;
  
  img {
    width: 100%;
    max-width: 30px;
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
  width: 100%;
  max-width: 200px;
  padding: 10px 10px;
  border: none;
  background-color: black;
  border-radius: 10px;
  cursor: pointer;

  img {
    width: 100%;
    max-width: 30px;
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

