import React from 'react';
import fantastic from '../../../assets/images/Fantastic_01.png';
import { getImagePath } from '../../app';
import { opacity } from '../prompt-text/PromptText';

const SuccessText = (props: any) => {

    return opacity == 0 ? <div className='ans-pop-up' style={{height: "70px", backgroundImage: `url(${getImagePath()+'Fantastic_01.png'})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", marginLeft: "30%"}}>
    </div>: <div></div>;
}

export default SuccessText;