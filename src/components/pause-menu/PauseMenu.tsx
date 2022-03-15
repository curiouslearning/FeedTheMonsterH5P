import React, { useState } from 'react';
import './pause-menu.css';
import pauseBg from '../../../assets/images/pause_v01.png';

const PauseMenu = (props: any) => {
    
    return <div className='menu' onClick={() => props.onClickPauseMenu()} style={{backgroundImage: `url(${pauseBg})`, backgroundSize: "contain", backgroundRepeat: "no-repeat"}}> 
    </div>;
}

export default PauseMenu;
