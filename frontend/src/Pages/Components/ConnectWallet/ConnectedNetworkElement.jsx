import React, { useState } from 'react'
import { BiTrashAlt } from 'react-icons/bi';
import { styled } from 'styled-components';
import Swal from 'sweetalert2';
import { MainPurpleColor } from '../../../Colors';
import axios from 'axios';
import { backendroute } from '../../../routes/routes';

export default function ConnectedNetworkElement({image,name, id}) {

  const [isDeleting, setIsDeleting] = useState(false);

  function removeNetwork(){
    Swal.fire({
      title: `<span style="font-family: Plus Jakarta Sans, sans-serif;font-size: 20px;color:black">Remover ${name} das redes salvas?</span>`,
      showCancelButton: true,
      confirmButtonColor: '#000000',
      cancelButtonColor: `${MainPurpleColor}`,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      width: 300,
      heightAuto: false,
      imageUrl:image,
      imageWidth: 200,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        setIsDeleting(true);
        const identifier = id;

        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: "Bearer " + token
          }
        }

        await axios.delete(`${backendroute.deleteNetwork + identifier}`, config);
        window.location.reload();
      } catch (error) {
        console.error("Erro ao excluir a rede:", error);
      }
    }
  });
}

  return (
    <SCConnectedNWElement>
      <img src={image} alt={name} />
      <h1>{name}</h1>
      {!name.includes('Piloto') && !isDeleting && <BiTrashAlt className='icon' onClick={removeNetwork} />}
    </SCConnectedNWElement>
  )
}

const SCConnectedNWElement = styled.div`

  min-height: 3rem;
  display: flex;
  align-items: center;
  gap: 0.88rem;
  width: 100%;

  img{
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    flex-shrink: 0;
  }

  .icon{
    font-size: 1.4rem;
    cursor: pointer;
    color: gray;
  }
`;