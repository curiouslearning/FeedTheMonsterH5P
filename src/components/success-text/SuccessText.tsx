import React from 'react';

const SuccessText = (props: any) => {

    return <div className='ans-pop-up' style={{margin: "auto", display: "flex", width: "100px", height: "10px", justifyContent: "center", marginTop: "4px", background: ""}}>
        <p className='ans-pop-up-text' style={{fontSize: "1.557em", textAlign: "center"}}>{props.word}</p>
    </div>;
}

export default SuccessText;