import React from "react";
import { styled } from "styled-components";
import { GoBell } from "react-icons/go";
import { SlArrowDown } from "react-icons/sl";
import { LuSearch } from "react-icons/lu";

export default function Header() {
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
          <Arrow>
            <SlArrowDown className="arrow-down-icon" />
          </Arrow>
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

const Arrow = styled.button`
  border: none;
  background-color: #ffffff;

  .arrow-down-icon {
    width: 18px;
    height: 18px;
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
