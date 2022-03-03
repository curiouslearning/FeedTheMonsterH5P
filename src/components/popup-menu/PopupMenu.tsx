import React from 'react';
import styled from 'styled-components';
import CancelOutlinedIcon from '@material-ui/icons/Cancel';
import RestartAltOutlinedIcon from '@material-ui/icons/Refresh';
import RedoOutlinedIcon from '@material-ui/icons/RedoOutlined';

const Popup = styled.div`
    width: 50%;
    left: 25%;
    top: 20%;
    height: 400px;
    position: absolute;
    background: rgb(235, 235, 235);
    z-index: 9;
    display: flex;
    border-radius: 10%;
    justify-content: center;
    align-items: center; 
`;

const PopupContent =  styled.div`
    display: flex;
    width: 100px;
    height: 100px;
    background: grey;
    justify-content: center;
    align-items: center; 
    z-index: 7;
    margin-inline: 10px;
    border-radius: 50%;
`

const ClosePopup = styled.div`
    position: relative;
    top: -50%;
    left: -45%;
    display: flex;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    justify-content: center;
    align-item: center;
`;

const PopupMenu = (props: any) => {
  return <Popup>
      <ClosePopup onClick={(e) => {props.onClickPauseMenu()}}>
        <CancelOutlinedIcon style={{fontSize: "60px"}} />
      </ClosePopup>
      <div style={{display: "flex", position: "absolute"}}>
        <PopupContent onClick={(e)=> {props.onClickRestart()}}>
          <RestartAltOutlinedIcon style={{display: "flex", justifyContent: "center", alignItems: "center", fontSize: "100px"}}/>
        </PopupContent>
        <PopupContent onClick={(e)=>{props.nextLevel()}}>
          <RedoOutlinedIcon style={{display: "flex", justifyContent: "center", alignItems: "center", fontSize: "100px"}}/>
        </PopupContent>
      </div>
  </Popup>
}

export default PopupMenu;