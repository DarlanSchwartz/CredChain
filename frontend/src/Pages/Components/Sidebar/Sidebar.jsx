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
import logo from "../../../Images/Logo.png";
import { MainPurpleColor } from "../../../Colors";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

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

  function goToHomePage() {
    navigate("/");
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
        <img src={logo} onClick={goToHomePage} />
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
          onClick={goToHomePage}
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
  min-height: 100%;
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

const ItemsUp = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-left: 5px;

  img {
    width: 70%;
    align-self: center;
    margin-top: 30px;
    margin-bottom: 70px;
    cursor: pointer;
  }

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
    height: 64px;
    padding-left: 20px;
  }

  button:hover {
    font-weight: bold;
  }

  .icon-buttons {
    width: 24px;
    height: 24px;
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
    height: 64px;
    padding-left: 20px;
  }

  button:hover {
    font-weight: bold;
  }

  .icon-buttons {
    width: 24px;
    height: 24px;
    margin-right: 20px;
  }
`;
