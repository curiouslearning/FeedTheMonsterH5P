import { url } from 'inspector';
import React from 'react';
import AudioComponent from '../common/AudioComponent';
import textBg from '../../../assets/images/PromptTextBg.png';
import { css, keyframes } from 'styled-components';

const PromptText = (props: any) => {

    const { playing, setPlaying, playAudio } = AudioComponent();
    const textVisbility = props.textVisbility;
    const levelType = props.levelType;
    const letter = props.letter;
    let highlightText = "";
    let nonHighlightText = "";
    if (levelType == "LetterInWord") {
        highlightText = letter.slice(0, 1);
        nonHighlightText = letter.slice(1, letter.length);
    }
    
    return <div onClick={playAudio} className='ans-pop-up' style={{margin: "auto",marginTop:"-20px", backgroundImage: `url(${textBg})`, width: "200px", display: "flex", flex: 1, flexDirection: "column",  height: "200px", backgroundSize: "cover", justifyContent: "center"}}>
        {textVisbility ? <p className='ans-pop-up-text' style={{fontSize: "1.857em", textAlign: "center"}}>{levelType == "LetterInWord" ? <><span style={{color: "red"}}>{highlightText}</span><span>{nonHighlightText}</span></> : props.letter}</p> : <p style={{fontSize: "1.857em", textAlign: "center"}}>▶️</p>}
    </div>;
}

export default PromptText;