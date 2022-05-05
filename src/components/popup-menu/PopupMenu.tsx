import React, { useState } from 'react';
import styled from 'styled-components';
import { buttonCLick, getImagePath } from '../../app';
import { useAppDispatch } from '../../app/hooks/commonHook';
import { onClickPauseButton, onClickRestart } from '../../app/redux/features/GameLevel1';

const Popup = styled.div`
    width: 50%;
    left: 25%;
    top: 20%;
    height: 60%;
    position: absolute;
    background-image: url(${props => props.title});
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center; 
`;

const PopupContent =  styled.div`
    display: flex;
    width: 100px;
    height: 100px;
    justify-content: center;
    align-items: center; 
    z-index: 7;
    margin-inline: 10px;
    border-radius: 50%;
`

const ClosePopup = styled.div`
    position: absolute;
    top: 3.5em;
    left: 7em;
    height: 5em;
    width: 5em;
    background-image: url(${props => props.title});
    background-size: contain;
    background-repeat: no-repeat;
`;

const PopupMenu = (props: any) => {

  const [scaleCloseBtn, setScaleCloseBtn] = useState(1);
  const [scaleNextBtn, setScaleNextBtn] = useState(1);
  const [scaleRestartBtn, setScaleRestartBtn] = useState(1);

  const dispatch = useAppDispatch();
  
  return <div className='xyz' style={{width: "100%", height: "100%",  zIndex: 10,  display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", background: "rgba(0, 0, 0, 0.5)"}}>
      <div style={{backgroundImage: `url(${getImagePath()+'popup_bg_v01.png'})`,backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", width: "33em", height: "33em", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <ClosePopup title={getImagePath()+'close_btn.png'}
          onClick={(e) => {
            buttonCLick().play()
            dispatch(onClickPauseButton());
            setScaleCloseBtn(0.9);
            setTimeout(() => {
              setScaleCloseBtn(1);
            }, 200)
          }}>
          </ClosePopup>
        <div onClick={(e)=> {
           buttonCLick().play()
          props.allLevelScreen()
          setScaleNextBtn(0.9)
          setTimeout(() => {
            setScaleNextBtn(1);
          }, 200)
        }} style={{backgroundImage: `url(${getImagePath()+'map_btn.png'})`,backgroundSize: "contain", backgroundRepeat: "no-repeat", height: '7em', width: '7em', marginLeft: 10, transform: `scale(${scaleNextBtn})`}}>

        </div>
        <div onClick={(e)=> {
           buttonCLick().play()
           setTimeout(() => dispatch(onClickRestart()));
          setScaleRestartBtn(0.9)
          setTimeout(() => {
            setScaleRestartBtn(1);
          }, 200)
        }} style={{backgroundImage: `url(${getImagePath()+'retry_btn.png'})`,backgroundSize: "contain", backgroundRepeat: "no-repeat",height: '7em', width: '7em', marginLeft: 35, transform: `scale(${scaleRestartBtn})`}}>
        </div>
      </div>
  </div>
}

export default PopupMenu;