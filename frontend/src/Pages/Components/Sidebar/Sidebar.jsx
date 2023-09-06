import React from "react";
import { styled } from "styled-components";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";
import { BiCube } from "react-icons/bi";
import { BsGrid } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";
import { LuBarChart4 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MainPurpleColor } from "../../../Colors";
import Swal from "sweetalert2";
import Logo from "../Logo";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

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
      imageUrl: '/logout.svg',
      imageWidth: 200,
  }).then((result) => {
      if (result.isConfirmed) {
          navigate('/');
      }
  });
  }

  function goToScore() {
    navigate("/score");
  }

  function goToFinances() {
    navigate("/finances");
  }

  function goToConnectpage() {
    navigate("/connect");
  }

  function goToLoansPage() {
    navigate("/loans");
  }

  function goToDocumentation() {
    navigate("/documentation");
  }

  const isScoreActive = location.pathname === "/score";
  const isFinancesActive = location.pathname === "/finances";
  const isConnectActive = location.pathname === "/connect";
  const isLoansActive = location.pathname === "/loans";
  const isDocumentationActive = location.pathname === "/documentation";
  const isLogoutActive = location.pathname === "/";

  return (
    <SidebarContainer>
      <ItemsUp>
        <SizeLogo>
        <Logo on_click={()=> goToFinances()} />
        </SizeLogo>
        <button
          onClick={goToScore}
          style={{
            fontWeight: isScoreActive ? "bold" : "",
            borderLeft: isScoreActive ? `4px solid ${MainPurpleColor}` : "",
          }}
        >
          <LuBarChart4
            className="icon-buttons"
            style={{
              color: isScoreActive ? `${MainPurpleColor}` : "",
            }}
          />
          Meu score
        </button>

        <button
          onClick={goToFinances}
          style={{
            fontWeight: isFinancesActive ? "bold" : "",
            borderLeft: isFinancesActive ? `4px solid ${MainPurpleColor}` : "",
          }}
        >
          <BsGrid
            className="icon-buttons"
            style={{
              color: isFinancesActive ? `${MainPurpleColor}` : "",
            }}
          />
          Finanças
        </button>

        <button
          onClick={goToConnectpage}
          style={{
            fontWeight: isConnectActive ? "bold" : "",
            borderLeft: isConnectActive ? `4px solid ${MainPurpleColor}` : "",
          }}
        >
          <BiCube
            className="icon-buttons"
            style={{
              color: isConnectActive ? `${MainPurpleColor}` : "",
            }}
          />
          Conectar Redes
        </button>

        <button
          onClick={goToLoansPage}
          style={{
            fontWeight: isLoansActive ? "bold" : "",
            borderLeft: isLoansActive ? `4px solid ${MainPurpleColor}` : "",
          }}
        >
          <FiCopy
            className="icon-buttons"
            style={{
              color: isLoansActive ? `${MainPurpleColor}` : "",
            }}
          />
          Empréstimo
        </button>
      </ItemsUp>

      <ItemsDown>
        <button
          onClick={goToDocumentation}
          style={{
            fontWeight: isDocumentationActive ? "bold" : "",
            borderLeft: isDocumentationActive
              ? `4px solid ${MainPurpleColor}`
              : "",
          }}
        >
          <IoDocumentTextOutline
            className="icon-buttons"
            style={{
              color: isDocumentationActive ? `${MainPurpleColor}` : "",
            }}
          />
          Documentação
        </button>

        <button
          onClick={logout}
          style={{
            fontWeight: isLogoutActive ? "bold" : "",
            borderLeft: isLogoutActive ? `4px solid ${MainPurpleColor}` : "",
          }}
        >
          <IoExitOutline
            className="icon-buttons"
            style={{
              color: isLogoutActive ? `${MainPurpleColor}` : "",
            }}
          />
          Sair
        </button>
      </ItemsDown>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  background-color: #ffffff;
  height: 100%;
  width: 100%;
  max-width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  flex-shrink: 0;
  padding: 0px 0px 10px 0px;

  position: fixed;
  left: 0;
  top: 0;
`;

const SizeLogo = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
margin: 50px 0px;
`;

const ItemsUp = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-left: 5px;

  button {
    background-color: #ffffff;
    border: none;
    font-family: "Plus Jakarta Sans", sans-serif;
    font-size: 16px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    height: 100%;
    min-height: 64px;
    padding-left: 20px;
  }

  button:hover {
    font-weight: bold;
  }

  .icon-buttons {
    max-width: 24px;
    width: 100%;
    max-height: 24px;
    height: 100%;
    margin-right: 20px;
  }
`;

const ItemsDown = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-left: 5px;

  button {
    background-color: #ffffff;
    border: none;
    font-family: "Plus Jakarta Sans", sans-serif;
    font-size: 16px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    height: 100%;
    min-height: 64px;
    padding-left: 20px;
  }

  button:hover {
    font-weight: bold;
  }

  .icon-buttons {
    max-width: 24px;
    width: 100%;
    max-height: 24px;
    height: 100%;
    margin-right: 20px;
  }
`;
