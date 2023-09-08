import React from 'react'
import { styled } from 'styled-components'
import CollateralSlideBar from '../Collaterals/CollateralSlideBar';

export default function BlockchainCurrency({show_actions=false, name='', image='/placeholder.svg', price=0, units=0, total_value=0,total_used=0,onCheckout,onStartLoan }) {
  return (
    <Container>
      <AssetInfo>
      <NameLogo>
        <img src={image} alt={name} />
        <h1>{name}</h1>
      </NameLogo>
      <MainInfo>
        <p className='price'>{`${'R$ ' + price}`}</p>
        <p className='units'>{`${units}`}</p>
        <p className='total'>{`${'R$ ' + total_value}`}</p>
      </MainInfo>
      </AssetInfo>
      <Actions>
            <CollateralSlideBar value={total_used} />
            {
              show_actions &&
              <div className='btns'>
                <button onClick={()=> onStartLoan({name,image,price,units,total_value,total_used})}>Solicitar Empréstimo</button>
                <button disabled={total_used == 100} onClick={()=> onCheckout({name,image,price,units,total_value,total_used})}>Sacar</button>
              </div>
            }
          </Actions>
    </Container>
  )
}
const Actions = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-top: 1.94rem;
  .btns{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.88rem;
  }
`;

const MainInfo = styled.div`

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 423px;
  
  p{
    color: #0D163A;
    font-family: Plus Jakarta Sans;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; 
  }

  .price{
    width: 100px;
  }
  .units{
    width: 100px;
  }
  .total{
    width: 120px;
  }
`;

const NameLogo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.31rem;
  min-width: 260px;
  max-width: 260px;
  width: 100%;

  img{
    width: 3rem;
    height: 3rem;
    flex-shrink: 0;
    border-radius: 50%;
  }

  h1{
    color: #0D163A;
    font-family: Plus Jakarta Sans;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; 
  }
`;

const AssetInfo = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content:center;
  flex-direction: column;
  width: 100%;
`;
