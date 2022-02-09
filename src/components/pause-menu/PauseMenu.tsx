import React, { useState } from 'react';
import './pause-menu.css';
import Pause from '../../../assets/images/pause.png';

const PauseMenu = (props: any) => {
    
    return <div className='menu' onClick={() => props.onClickPauseMenu()}> 
        <img src={Pause} width="27px" height="27px"></img>
    </div>;
}

export default PauseMenu;
