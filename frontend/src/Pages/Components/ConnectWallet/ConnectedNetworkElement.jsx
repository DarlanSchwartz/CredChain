import React from 'react'
import { styled } from 'styled-components';

export default function ConnectedNetworkElement({image,name}) {
  return (
    <SCConnectedNWElement>
      <img src={image} alt={name} />
      <h1>{name}</h1>
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
`;
