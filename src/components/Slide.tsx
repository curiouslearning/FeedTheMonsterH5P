import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import './app.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragDrop from './DragDrop';
import { trim } from 'jquery';
import Progress from './progress-bar/progress';
import PuzzelBar, { PuzzelBarHook } from './puzzel-bar/PuzzelBar';
import ScoreBoard from './score-board/ScoreBoard';
import PauseMenu from './pause-menu/PauseMenu';
import PromptText from './prompt-text/PromptText';
import { SpriteAnimationComponent } from './animations/SpriteAnimation';
import eatingspSheet from "../../assets/images/eating1.png";

let audio: HTMLAudioElement = null;
let initialTime = 10;
let id: NodeJS.Timeout;

const Wrapper = styled.div`
    height: 600px;
    width: 100%;
    position: relative;
`;

// const Progress = ({done} : {done : string}) => {
//     const [style, setStyle] = React.useState({});  
//     setTimeout(() => {
//       const newStyle = {
//         opacity: 1,
//         width: `${done}%`
//       }
      
//       setStyle(newStyle);
//     }, 200);
  
//     return (
//         <div className='headItem' style={{}}>
//             <button style={{}} onClick={() => {}}>Pause</button>
//             <button style={{}} onClick={() => {}}>Restart</button>
//             <div className="progress">
//                 <div className="progress-done" style={style}></div>
//             </div>
//         </div>
//     );
// }

const DragDropComp = (props: any) => {

    console.log(props.promptVisibility + "<------");

    const [timeOver, setTimeOver] = useState(false);
    const [correctDrop, setCorrectDrop] = useState(false);
    const [levelCount, setLevelCount] = useState(0);
    const [currentProgressCount, setProgressCount] = useState(initialTime);
    const [prompted, setPromted] = useState(props.promptVisibility);
    const [activeIndicators, setActiveIndicator] = useState(0);

    const levelChange = useRef<number>();

    let prompT = props.puzzles[levelCount].prompt.PromptText.toString();

    const answerDrop = () => {
        setCorrectDrop(true);
    }

    const levelUp = () => {
        console.log("changedd")
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
        console.log(props.playing)
        if (props.playing) {
            setProgressCount(preValue => preValue - 1);
        }        
    }

    const pauseGame = () => {
        props.stopPlaying();
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
    }, [currentProgressCount, props.start, props.playing, timeOver, correctDrop])


    return <div>
        <div style={{display: 'flex', justifyContent: "space-between", marginInline: "50px", marginTop: "20px"}}>
            <PuzzelBar puzzelCount={4} activeIndicators={activeIndicators}/>
            <ScoreBoard score={280}/>
            <PauseMenu />
        </div>
        <Progress done={(currentProgressCount * 10).toString()} />
        <PromptText letter={ props.puzzles[levelCount].prompt.PromptText} /> 
        {prompted ? <></> : <DndProvider backend={HTML5Backend}>
            <div className="dragAndDrop" style={{height: "200px"}}>
                <DragDrop timeOver={timeOver} answerDrop={answerDrop} startDrag={false} props={props.puzzles[levelCount]} changePuzzel={levelUp} levelCount={levelCount} />
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
            console.log("stoppppp");
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
            console.log("aaaa")
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
            {data.audio && data.audio.length > 0 ? "" : <audio src={audFile} autoPlay></audio>}
                { start ? <></> :
                    <div style={{height: "100%", backgroundImage: `url(${props.images})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                        <div style={{width: "100%", height: "100%", background: "rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", justifyContent: "center", transform: "translateX(0px)"}}>
                            <h1 style={{textAlign: "center", fontSize: "2.857em", color: "white"}}>{"Level - " + data.LevelNumber}</h1>
                            <button onClick={() => onStartClick()} style={{marginInline: "auto"}}>Start</button>
                        </div>
                    </div>
                }
            {!start ? <div></div> : <>
            {/* <div
                        style={{
                        width: '200px',
                        height: '200px',
                        top:'250px',
                        left:'250px',
                        position:'absolute'
                        // bottom:'50%',
                        // left:'50%',
                        // right:'50%'            
                        
                        
                        
                       
                        }}
                    >
                        <SpriteAnimationComponent spImage={eatingspSheet} nFrames={18} />
                    </div> */}
                    <DragDropComp playing={playing} start={start} levelType={data.LevelMeta.LevelType == "LetterInWord" ? true : false} promptVisibility={data.LevelMeta.PromptType == "Visible" ? true : false} puzzles={data.Puzzles} stopPlaying={stopPlaying} playAudio={playAudio} />
                </>
            }
                
                {/* { data.audio && data.audio.length > 0 ? <AudioWrapper>
                { audioPlaying ? <WavesWrapper><SoundWaves /></WavesWrapper> :  <PlayButton onClick={playAudio}><Play /></PlayButton> }
                <audio src={audioFile} autoPlay ref={audioPlayerRef}  onEnded={() => setAudioPlaying(false)}></audio>
            </AudioWrapper> : null} */}
        </Wrapper>
    );
}

export default SlideComponent;

// const [audioPlaying, setAudioPlaying] = useState(false);
    // const [currentProgressCount, setProgressCount] = useState(initialTime);
    // const [timeOver, setTimeOver] = useState(false);
    // const [correctDrop, setCorrectDrop] = useState(false);

// Get the url to the img
    
// const imgSrc = H5P.getContentPath(props.contentId) + '/' + data.Puzzles[0].prompt.PromptAudio;


// const playAudio = () => {
//     var playPromise = (audioPlayerRef.current as HTMLAudioElement).play();
//     if (playPromise !== undefined) {
//         playPromise.then(() => {
//             setAudioPlaying(true);
//         }).catch((err: any) => {
//             console.log(err);
//         });
//     }
// };

// if (data) {
//     var re = new RegExp("^(http|https)://", "i");
//     var match = re.test(data.audio[0].path);
//     if (match) {
//         audioFile = data.audio[0].path;
//         audFile = audioFile
//     } else {
//         // If the path is not a url then we need to build the URL manually for the audioplayer to work
//         audioFile = H5P.getContentPath(props.contentId) + '/' + data.Puzzles[0].prompt.PromptAudio;
//         audFile = audioFile
//     }
// }

// const SlideLabel = styled.h2`
//     width: 30px;
//     height: 30px;
//     background-color: red;
//     border-radius: 50%;
//     align-items: left;
//     margin: 24px auto;
//     align-content: center;
// `;

// const ImgWrapper = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 520px;
//     overflow: hidden;
//     img {
//         width: 95%;
//         height: auto;
//     }
// `;

// const AudioWrapper = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin: 24px auto;
// `;

// const PlayButton = styled.button`
//     background: none;
//     border: none;
//     width: 248px;
//     height: 248px;
//     transition: transform ease 0.3s;

//     svg {
//         width: 100%;
//         height: auto;
//     }

//     &:hover {
//         cursor: pointer;
//     }

//     &:active {
//         transform: scale(0.925);
//     }
// `;

// const WavesWrapper = styled.div`
//     width: 248px;
//     height: 248px;
// `;

// const Button = styled.button`
//     width: 50px;
//     height: 50px;
// `;

// const StartButton = styled.div`
//     width: 60px;
//     height: 60px;
    
// `;


// declare var H5P: any;
// declare var H5PIntegration: any;

// import image1 from '../../assets/images/duck.gif';
// import img from '../../assets/images/img.png'

// useEffect(() => {

    //     if (!start) {
    //         setProgressCount(10);
    //         setPlaying(false);
    //         return;
    //     }

    //     if (currentProgressCount <= 0 && !timeOver) {
    //         setTimeout(() => {
    //             setProgressCount(10);
    //             setPlaying(false);
    //             return
    //         }, 1000)
    //     }

    //     if (currentProgressCount <= 0 || correctDrop) {
    //         setTimeOver(false)
    //         return;
    //     }

    //     id = setInterval(timer,500, start);

    //     return () => clearInterval(id);
    // }, [currentProgressCount, start, playing])

    // const [levelCount, setLevelCount] = useState(0);
    // const audioPlayRef = useRef();

    // let id: NodeJS.Timeout;

    // const answerDrop = () => {
    //     setCorrectDrop(true);
    // }

    // const levelUp = () => {
    //     console.log("exece")
    //     setLevelCount(preCount => preCount + 1);
    // }

    // const timer = () => {
    //     if (playing) {
    //         setProgressCount(preValue => preValue - 1);
    //     }        
    // }

