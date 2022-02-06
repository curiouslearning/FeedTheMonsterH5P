import React from 'react';
import './pause-menu.css';

const PauseMenu = () => {
    
    const menuClick = () => {
        console.log("hihihi")
    }

    return <div className='menu' onClick={() => menuClick()}> 
    </div>;
}

export default PauseMenu;

