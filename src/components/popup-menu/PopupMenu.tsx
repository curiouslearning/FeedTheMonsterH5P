import React from 'react';
import styled from 'styled-components';

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
    width: 100px;
    height: 100px;
    background: grey;
    z-index: 7;
    margin-inline: 10px;
    border-radius: 50%;
    border: 2px solid red;
`

const ClosePopup = styled.div`
    position: relative;
    top: -50%;
    left: -45%;
    display: flex;
    height: 60px;
    width: 60px;
    border: 2px solid red;
    border-radius: 50%;
`;

const PopupMenu = () => {
  return <Popup>
      <ClosePopup />
      <div style={{display: "flex", position: "absolute"}}>
        <PopupContent />
        <PopupContent />
      </div>
  </Popup>
}

export default PopupMenu;