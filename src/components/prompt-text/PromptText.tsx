import React from 'react';

const PromptText = (props: any) => {

    return <div className='pop-up' style={{margin: "auto", display: "flex", width: "100px", height: "60px", justifyContent: "center", marginTop: "20px", background: "grey"}}>
        <p className='pop-up-text' style={{fontSize: "1.857em", textAlign: "center"}}>{props.letter}</p>
    </div>;
}

export default PromptText;