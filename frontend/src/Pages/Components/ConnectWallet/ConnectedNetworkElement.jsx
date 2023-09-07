import React from 'react'
import { BiTrashAlt } from 'react-icons/bi';
import { styled } from 'styled-components';
import Swal from 'sweetalert2';
import { MainPurpleColor } from '../../../Colors';

export default function ConnectedNetworkElement({image,name}) {

  function removeNetwork(){
    Swal.fire({
      title: `<span style="font-family: Plus Jakarta Sans, sans-serif;font-size: 20px;color:black">Remover ${name} das redes salvas?</span>`,
      showCancelButton: true,
      confirmButtonColor: '#c9c9c9',
      cancelButtonColor: `${MainPurpleColor}`,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      width: 300,
      heightAuto: false,
      imageUrl:image,
      imageWidth: 200,
  }).then((result) => {

  });
  }

  return (
    <SCConnectedNWElement>
      <img src={image} alt={name} />
      <h1>{name}</h1>
      <BiTrashAlt className='icon' onClick={removeNetwork}/>
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
