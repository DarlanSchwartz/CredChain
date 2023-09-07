import React from 'react'
import PlaceholderRatingComponent from './PlaceholderRatingComponent'
import { styled } from 'styled-components';
import { MainPurpleColor } from '../../../Colors';

export default function Company({ name, ratings=[10,10,10,10] }) {
    return (
        <MyCompany>
            <h1 className='mycompany-title'>{name}</h1>
            <RatingComponentsContainer>
                <GaugesContainer>
                    <PlaceholderRatingComponent name={"Rating"} value={ratings[0]} />
                    <PlaceholderRatingComponent name={"Pagamentos Recorrentes"} value={ratings[1]} />
                    <PlaceholderRatingComponent name={"Dívidas"} value={ratings[2]} />
                    <PlaceholderRatingComponent name={"Compromissos"} value={ratings[3]} />
                </GaugesContainer>
                <OverallNoteContainer>
                    <h1>Nota Geral</h1>
                    <Note>
                         {/*FIXME:> CALCULATE AND MAP THIS */}
                        <div>A</div>
                        <div>A</div>
                        <div>A</div>
                    </Note>
                </OverallNoteContainer>
                 {/*TEMPORARY */}
                <Overlay>
                    <p>Em breve</p>
                </Overlay>
            </RatingComponentsContainer>
        </MyCompany>
    )
}


const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.8);
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  p{
    color:${MainPurpleColor};
    text-align: center;
    font-family: Plus Jakarta Sans;
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const RatingComponentsContainer = styled.div`
  display: flex;
  align-items: center;

`;
const GaugesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 1.63rem;
  margin-top: 2.28rem;
`;
const OverallNoteContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  max-width: 10.3125rem;

  h1{
    font-family: Plus Jakarta Sans;
    color: #000;
    text-align: center;
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    white-space: nowrap;
  }
`;

const Note = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap:0.5rem;
  justify-content: center;

  div{
    width: 2.25rem;
    height: 2.25rem;
    background-color: #3BBB6E;
    color: white;
    font-size: 2rem;
    border-radius: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MyCompany = styled.div`
  width: 100%;
  max-width: 41.5625rem;
  min-height: 36.375rem;
  flex-shrink: 0;
  margin-bottom: 4rem;
  border-radius: 1.25rem;
  background: rgba(255, 255, 255, 0.80);
  padding: 1.69rem;
  padding-top: 3.38rem;
  overflow: hidden;
  position: relative;

  .mycompany-title{
    color: #020202;
    font-family: Plus Jakarta Sans;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.5rem; /* 100% */
  }
`;