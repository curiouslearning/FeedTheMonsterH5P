import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import './app.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragDrop from './dragdrop-stones/DragDrop';
import Progress from './progress-bar/progress';
import PuzzelBar, { PuzzelBarHook } from './puzzel-bar/PuzzelBar';
import ScoreBoard from './score-board/ScoreBoard';
import PauseMenu from './pause-menu/PauseMenu';
import PromptText from './prompt-text/PromptText';
import PopupMenu from './popup-menu/PopupMenu';
import bg from '../../assets/images/bg.jpg';
import { url } from 'inspector';



let audio: HTMLAudioElement = null;
let initialTime = 10;
let id: NodeJS.Timeout;

const Wrapper = styled.div`
    height: 600px;
    width: 100%;
    position: relative;
`;

const DragDropComp = (props: any) => {

    const [timeOver, setTimeOver] = useState(false);
    const [correctDrop, setCorrectDrop] = useState(false);
    const [levelCount, setLevelCount] = useState(0);
    const [currentProgressCount, setProgressCount] = useState(initialTime);
    const [prompted, setPromted] = useState(props.promptVisibility);
    const [activeIndicators, setActiveIndicator] = useState(0);
    const [ isMenuPopup, setPauseMenu ] = useState(false);


    const onClickRestart = () => {
        setTimeout(() => {
            setLevelCount(0);
            setPauseMenu(false);
            setProgressCount(initialTime);
            setActiveIndicator(0)
        }, 1000)
    }

    const onClickPauseMenu = () => {
        
        if (!isMenuPopup) {
            setPauseMenu(true);
            if (props.playing) {
                audio.pause();
            }
        }

        if (isMenuPopup) {
            setPauseMenu(false);
        }
    }

    const answerDrop = () => {
        setCorrectDrop(true);
    }

    const levelUp = () => {
        setTimeout(() => {
            setLevelCount(preCount => preCount + 1)
            setCorrectDrop(false)
            setProgressCount(initialTime);
            setActiveIndicator(pre => pre + 1);
            setPromted(true);
            props.stopPlaying();
            props.playAudio();
        }, 4000)
    }

    const timer = () => {
        if (props.playing && !isMenuPopup) {
            setProgressCount(preValue => preValue - 0.5);
        }        
    }

    useEffect(() => {

        if (props.playing) {
            if (prompted) {
                setPromted(false);
            }
        }

        if (!props.start) {
            setProgressCount(10);
            props.stopPlaying()
            return;
        }

        if (currentProgressCount <= 0 && !timeOver) {
            setTimeout(() => {
                // setProgressCount(10);
                // props.stopPlaying()
                levelUp()
                return
            }, 1000)
        }

        if (currentProgressCount <= 0 || correctDrop) {
            setTimeOver(false)
            return;
        }
        id = setInterval(timer,500, props.start);

        return () => clearInterval(id);
    }, [currentProgressCount, props.start, props.playing, timeOver, correctDrop, isMenuPopup])

    return <div>
        <div style={{display: 'flex', justifyContent: "space-between", marginInline: "50px", marginTop: "20px"}}>
            <PuzzelBar puzzelCount={4} activeIndicators={activeIndicators}/>
            <ScoreBoard score={280}/>
            <PauseMenu onClickPauseMenu={onClickPauseMenu} />
        </div>
        {isMenuPopup ? <PopupMenu onClickPauseMenu={onClickPauseMenu} onClickRestart={onClickRestart} nextLevel={props.nextLevel}/> : <></>} 
        <Progress done={(currentProgressCount * 10).toString()} />
        <PromptText letter={ props.puzzles[levelCount].prompt.PromptText} /> 
        { <DndProvider backend={HTML5Backend}>
            <div className="dragAndDrop" style={{height: "200px"}}>
                <DragDrop timeOver={timeOver} promted={prompted} answerDrop={answerDrop} startDrag={false} props={props.puzzles[levelCount]} changePuzzel={levelUp} levelCount={levelCount} isMenuOpen={isMenuPopup} />
            </div>
        </DndProvider>}
    </div>
}


const SlideComponent = (props: any) => {
    const { data } = props;
    var audFile: string;

    const [playing, setPlaying] = useState(false);
    const [start, setStart] = useState(false);

    const stopPlaying = () => {
        if (playing) {
            setPlaying(false);
        }
    }

    useEffect(() => {
        setStart(false)
        return () => {
            if (playing || audio!=null) {
                audio.pause()
            }
            audio = null
            initialTime = 10
            clearInterval(id);
            setPlaying(false)
        } 

    },[props.started])
    
    const playAudio = () => {
        audio = new Audio("https://www.kozco.com/tech/piano2.wav")
        var playPromise =  audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // setPlaying(true);
            }).catch((err: any) => {
                console.log(err);
            });
        }
        audio.addEventListener('ended', ()=>{
            setPlaying(true);
        })
    }

    const onStartClick = () => {
        setTimeout(() => {
            setStart(true);
        }, 0)
        playAudio();
    }

    return (
        <Wrapper>
            <img src={bg} style={{position: "absolute", width: "100%", height: "600px", zIndex: -2}}></img>
            
            {data.audio && data.audio.length > 0 ? "" : <audio src={audFile} autoPlay></audio>}
                { start ? <></> :
                    <div style={{height: "100%", backgroundImage: `url(${props.images})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                        <div style={{width: "100%", height: "100%", background: "rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", justifyContent: "center", transform: "translateX(0px)"}}>
                            <h1 style={{textAlign: "center", fontSize: "2.857em", color: "white"}}>{"Level - " + data.LevelNumber}</h1>
                            <button onClick={() => onStartClick()} style={{marginInline: "auto"}}>Start</button>
                        </div>
                    </div>
                }
            {!start ? <div></div> : 
                <DragDropComp playing={playing} start={start} levelType={data.LevelMeta.LevelType == "LetterInWord" ? true : false} promptVisibility={data.LevelMeta.PromptType == "Visible" ? true : false} puzzles={data.Puzzles} stopPlaying={stopPlaying} playAudio={playAudio} nextLevel={props.nextLevel} />
            }
        </Wrapper>
    );
}

export default SlideComponent;


