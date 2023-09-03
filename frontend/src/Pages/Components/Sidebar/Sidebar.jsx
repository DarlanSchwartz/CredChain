import React from 'react';
import { styled } from 'styled-components';
import { IoDocumentTextOutline} from 'react-icons/io5';
import { IoExitOutline} from 'react-icons/io5';
import { BiCube} from 'react-icons/bi';
import { BsGrid} from 'react-icons/bs';
import { FiCopy} from 'react-icons/fi';
import { LuBarChart4} from 'react-icons/lu';

export default function Sidebar() {
  return (
    <SidebarContainer>
      <ItemsUp>
      <a href="/score" className="icon-link">
 <LuBarChart4/>Meu Score
</a>

        <a href="/finances"><BsGrid/>Finanças</a>
        <a href="/connect"><BiCube/>Conectar Redes</a>
        <a href="/loans"><FiCopy/>Empréstimo</a>
      </ItemsUp>
       
       <ItemsDown>
        <a href="/documentation"><IoDocumentTextOutline/> Documentação</a>
        <a href="/logout"><IoExitOutline/>Sair</a>
       </ItemsDown>
        
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
  max-width: 280px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  flex-shrink: 0;
  padding: 120px 0px 50px 0px;
  position: fixed;
  left: 0;
  top: 0;
`;

const ItemsUp = styled.div`
display: flex;
width: 100%;
flex-direction: column;


a {
  margin-bottom: 2px;
  height: 64px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16px;
  display: flex;
  align-items: center;
  line-height: 64px;
  font-weight: 400;
  color: rgba(13, 22, 58, 1);
  text-decoration: none;
  padding-left: 20px;
  margin-left: 5px;

  &:hover {
    border-left: 4px solid rgba(173, 0, 255, 1);
    font-weight: bold;

    ion-icon {
     color: rgba(173, 0, 255, 1);
     fill: red;
    }

  }

  ion-icon {
    width: 24px;
    height: 24px;
    margin-right: 20px;
    transition: color 0.3s; /* Adiciona uma transição suave para a mudança de cor do ícone */
  }
}
`;

const ItemsDown = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  ion-icon {
    width: 24px;
    height: 24px;
    margin-right: 20px;
  }

  a {
  margin-bottom: 2px;
  height: 64px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16px;
  display: flex;
  align-items: center;
  line-height: 64px;
  font-weight: 400;
  color: rgba(13, 22, 58, 1);
  text-decoration: none;
  padding-left: 20px;
  margin-left: 5px;

  &:hover {
    border-left: 4px solid rgba(173, 0, 255, 1);
    font-weight: bold;

    ion-icon {
     color: rgba(173, 0, 255, 1);
     fill: red;
    }

  }

  ion-icon {
    width: 24px;
    height: 24px;
    margin-right: 20px;
    transition: color 0.3s; /* Adiciona uma transição suave para a mudança de cor do ícone */
  }
}
`;
