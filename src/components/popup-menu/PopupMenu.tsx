import React from 'react';
import styled from 'styled-components';
import CancelOutlinedIcon from '@material-ui/icons/Cancel';
import RestartAltOutlinedIcon from '@material-ui/icons/Refresh';
import RedoOutlinedIcon from '@material-ui/icons/RedoOutlined';
import popupBg from '../../../assets/images/popup_bg_v01.png';
import closeBtnBg from '../../../assets/images/close_btn.png';
import mapBg from '../../../assets/images/map_btn.png';
import retryBg from '../../../assets/images/retry_btn.png';

const Popup = styled.div`
    width: 50%;
    left: 25%;
    top: 20%;
    height: 60%;
    position: absolute;
    background-image: url(${popupBg});
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
    position: relative;
    top: -45%;
    left: 5%;
    display: flex;
    height: 60px;
    width: 60px;
    background-image: url(${closeBtnBg});
    background-size: contain;
    background-repeat: no-repeat;
    justify-content: center;
    align-item: center;
`;

const PopupMenu = (props: any) => {
  return <Popup>
      <ClosePopup onClick={(e) => {props.onClickPauseMenu()}}>
      </ClosePopup>
      <div  style={{display: "flex", flexDirection: "row", height: "100%", alignItems: "center", width: "100%"}}>
        <div onClick={(e)=> {props.nextLevel()}} style={{backgroundImage: `url(${mapBg})`,backgroundSize: "contain", backgroundRepeat: "no-repeat", height: 90, width: 80, marginLeft: 10}}>

        </div>
        <div onClick={(e)=> {props.onClickRestart()}} style={{backgroundImage: `url(${retryBg})`,backgroundSize: "contain", backgroundRepeat: "no-repeat",height: 90, width: 80, marginLeft: 35}}>

        </div>
      </div>
  </Popup>
}

export default PopupMenu;