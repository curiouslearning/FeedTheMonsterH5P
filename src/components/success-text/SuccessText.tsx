import React from 'react';
import fantastic from '../../../assets/images/Fantastic_01.png';
import { opacity } from '../prompt-text/PromptText';

const SuccessText = (props: any) => {

    return opacity == 0 ? <div className='ans-pop-up' style={{height: "70px", backgroundImage: `url(${fantastic})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", marginLeft: "30%"}}>
    </div>: <div></div>;
}

export default SuccessText;