import React, { useState } from "react";
import { styled } from "styled-components";
import { GoBell } from "react-icons/go";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [arrowUp, setArrowUp] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setArrowUp(!arrowUp);
};

function goToScore() {
  navigate("/score");
}

function goToFinances() {
  navigate("/finances");
}

function goToConnectPage() {
  navigate("/connect");
}

function goToLoansPage() {
  navigate("/loans");
}

function goToDocumentation() {
  navigate("/documentation");
}

function goToHomePage() {
  navigate("/");
}

  return (
    <SCHeader>
      <Container>
        <Main>
          <SearchContainer>
            <StyledInput placeholder="Pesquise aqui" />
            <SearchIcon>
              <LuSearch />
            </SearchIcon>
          </SearchContainer>
        </Main>

        <InfoUser>
          <ButtonBell>
            <GoBell className="go-bell-icon" />
          </ButtonBell>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJFiKHbkBQTYhaU1x1TGreeVViDrWp3pPQEf-zcX9Smb80kGgEUkTPeGp95adj2PrIYSI&usqp=CAU"
            alt="User"
          />
          <p>Nome e Último Nome</p>
          <div>
             <ArrowButton onClick={toggleMenu}>
                    {arrowUp ? <FiChevronUp color="#292D32" size={24} /> : <FiChevronDown color="#292D32" size={24} />}
                </ArrowButton>
                {menuOpen && (
                    <DropdownMenu>
                        <MenuItem onClick={goToScore}>Meu Score</MenuItem>
                        <MenuItem onClick={goToFinances}>Finanças</MenuItem>
                        <MenuItem onClick={goToConnectPage}>Conectar Redes</MenuItem>
                        <MenuItem onClick={goToLoansPage}>Empréstimo</MenuItem>
                        <MenuItem onClick={goToDocumentation}>Documentação</MenuItem>
                        <MenuItem onClick={goToHomePage}>Logout</MenuItem>
                    </DropdownMenu>
                )}
          </div>
         
        </InfoUser>
      </Container>
    </SCHeader>
  );
}

const SCHeader = styled.header`
  width: calc(100% - 280px);
  height: 100px;
  margin-left: 280px;
`;

const Container = styled.div`
  display: flex;
  margin-top: 44px;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 717px;
  max-width: 717px;
`;

const InfoUser = styled.div`
  display: flex;
  max-width: 350px;
  max-height: 64px;
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border: none;
  border-radius: 100px;
  background: #fff;
  margin-right: 2.5rem;

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 10px;
  }

  p {
    margin-right: 10px;
  }
`;

const ButtonBell = styled.button`
  background-color: #ffffff;
  width: 100%;
  max-width: 100px;
  height: 48px;
  border: 1px solid rgba(155, 155, 155, 0.27);
  border-radius: 100px;
  margin-right: 10px;

  .go-bell-icon {
    width: 24px;
    height: 24px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  max-width: 717px;
  height: 64px;
  background-color: #ffffff;
  border-radius: 100px;
  padding-left: 40px;
  font-size: 16px;
  padding-left: 40px;
  position: relative;
  left: 5px;
  border: none;
  outline: none;

&:focus {
  border: 1px solid rgba(155, 155, 155, 0.27);
}
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 15px;
`;


const ArrowButton = styled.div`
    cursor: pointer;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 14%;
    right: 60px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
    width: 210px;
    border-radius: 0px 0px 20px 20px;
    background-color: #FFFFFF;
`;

const MenuItem = styled.div`
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.05em;
    padding: 10px 20px;
    cursor: pointer;
    margin-bottom: 2px;

    &:hover {
        font-weight: bold;
    }
`;