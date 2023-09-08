import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { GoBell } from "react-icons/go";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { LuSearch } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MainPurpleColor } from "../../../Colors";


export default function Header() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [arrowUp, setArrowUp] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setArrowUp(!arrowUp);
};

useEffect(() => {
  window.addEventListener('click', listenerOutsiteClick);
  return () => {
      window.removeEventListener('click', listenerOutsiteClick);
  };
}, []);

function listenerOutsiteClick(event) {
  if (!event.target.classList.contains('menu')) {
    setMenuOpen(false);
    setArrowUp(false);
  }
}
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

function logout(){
  Swal.fire({
    title: `<span style="font-family: Plus Jakarta Sans, sans-serif;font-size: 20px;color:black">Deseja sair?</span>`,
    showCancelButton: true,
    confirmButtonColor: '#c9c9c9',
    cancelButtonColor: `${MainPurpleColor}`,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Cancelar',
    width: 300,
    heightAuto: false,
    imageUrl: '/images/pictures/logout.svg',
    imageWidth: 200,
}).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('token');
      navigate('/');
    }
});
}

  return (
    <SCHeader>
      <Container>
        <Main>
          {
            location.pathname.includes('/loans') &&
            <SearchContainer>
            <StyledInput placeholder="Pesquise aqui" />
            <SearchIcon>
              <LuSearch />
            </SearchIcon>
          </SearchContainer>
          }
        </Main>

        <InfoUser className="menu"  $open={menuOpen}>
          <ButtonBell className="menu" >
            <GoBell className="go-bell-icon" />
          </ButtonBell >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJFiKHbkBQTYhaU1x1TGreeVViDrWp3pPQEf-zcX9Smb80kGgEUkTPeGp95adj2PrIYSI&usqp=CAU"
            alt="User"
          />
          <p>Nome e Último Nome</p>

          <div>
             <ArrowButton className="menu"  onClick={toggleMenu}>
                    {arrowUp ? <FiChevronUp className="menu"  color="#292D32" size={24} /> : <FiChevronDown className="menu" color="#292D32" size={24} />}
                </ArrowButton>
                {menuOpen && (
                    <DropdownMenu className="menu">
                        <MenuItem className="menu" onClick={goToScore}>Meu Score</MenuItem>
                        <MenuItem className="menu" onClick={goToFinances}>Finanças</MenuItem>
                        <MenuItem className="menu" onClick={goToConnectPage}>Conectar Redes</MenuItem>
                        <MenuItem className="menu" onClick={goToLoansPage}>Empréstimo</MenuItem>
                        <MenuItem className="menu" onClick={goToDocumentation}>Documentação</MenuItem>
                        <MenuItem className="menu" onClick={logout}>Logout</MenuItem>
                    </DropdownMenu>
                )}
          </div>
        </InfoUser>
      </Container>
    </SCHeader>
  );
}

const SCHeader = styled.header`
  width: 100%;
  height: 100%;
  max-height: 100px;
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
  width: 100%;
  max-width: 717px;
  margin-right: 20px;
`;

const InfoUser = styled.div`
  width: 100%;
  height: 100%;
  max-width: 350px;
  max-height: 64px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border: none;
  border-radius: 100px;
  background-color: #ffffff;
  margin-right: 20px;
  border-bottom-right-radius: ${(props) => props.$open ? 0 : '100px'};

  img {
    width: 100%;
    height: 100%;
    max-width: 48px;
    max-height: 48px;
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
    width: 100%;
    height: 100%;
    max-width: 24px;
    max-height: 24px;
  }
`;


const StyledInput = styled.input`
  width: 100%;
  max-width: 717px;
  max-height: 100%;
  height: 64px;
  background-color: #ffffff;
  border-radius: 100px;
  margin-right: 20px;
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
  left: 25px;
`;


const ArrowButton = styled.div`
    cursor: pointer;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 6.4rem;
    right: 2.5rem;
    z-index: 1;
    padding-top: 1rem;

    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 210px;
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
