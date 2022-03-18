import React, { useState } from 'react';
import './pause-menu.css';
import pauseBg from '../../../assets/images/pause_v01.png';
import { ScaleButton } from '../common/ScaleButton';

const PauseMenu = (props: any) => {
    const [scale, setScale] = useState(1);
    return <div className='menu' onClick={() => {
        props.onClickPauseMenu();
        setScale(0.9);
        setTimeout(() => {
            setScale(1);
        }, 200)
    }} style={{backgroundImage: `url(${pauseBg})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", transform: `scale(${scale})`}}> 
    </div>;
}

export default PauseMenu;
