import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import './app.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragDrop from './DragDrop';
import { trim } from 'jquery';

let audio: HTMLAudioElement = null;
let initialTime = 10;

const Wrapper = styled.div`
    height: 400px;
    width: 100%;
    position: relative;
`;

const Progress = ({done} : {done : string}) => {
    const [style, setStyle] = React.useState({});  
    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width: `${done}%`
      }
      
      setStyle(newStyle);
    }, 200);
  
    return (
        <div className='headItem' style={{}}>
            <button style={{}} onClick={() => {}}>Pause</button>
            <button style={{}} onClick={() => {}}>Restart</button>
            <div className="progress">
                <div className="progress-done" style={style}></div>
            </div>
        </div>
    );
}

const SlideComponent = (props: any) => {
    const { data } = props;

    console.log(props.started);
    console.log(data.Puzzles[0].prompt.PromptAudio)
    // const audioPlayerRef = useRef();
    // var audioFile;
    var audFile: string;

    // const [audioPlaying, setAudioPlaying] = useState(false);
    const [currentProgressCount, setProgressCount] = useState(initialTime);
    const [timeOver, setTimeOver] = useState(false);
    const [correctDrop, setCorrectDrop] = useState(false)
    const [playing, setPlaying] = useState(false);
    const [start, setStart] = useState(false);
    const [levelCount, setLevelCount] = useState(0);
    const audioPlayRef = useRef();

    let id: NodeJS.Timeout;

    const answerDrop = () => {
        setCorrectDrop(true);
    }

    const levelUp = () => {
        setLevelCount(preCount => preCount + 1);
    }

    const timer = () => {
        if (playing) {
            setProgressCount(preValue => preValue - 1);
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
        } 
    },[props.started])
    
    useEffect(() => {

        if (!start) {
            setProgressCount(10);
            setPlaying(false);
            return;
        }

        if (currentProgressCount <= 0 && !timeOver) {
            setTimeout(() => {
                setProgressCount(10);
                setPlaying(false);
                return
            }, 1000)
        }

        if (currentProgressCount <= 0 || correctDrop) {
            setTimeOver(false)
            return;
        }

        id = setInterval(timer,500, start);

        return () => clearInterval(id);
    }, [currentProgressCount, start, playing])


    const onStartClick = () => {
        setTimeout(() => {
            setStart(true);
        }, 0)
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

    return (
        <Wrapper>
            {data.audio && data.audio.length > 0 ? "" : <audio src={audFile} autoPlay ref={audioPlayRef}></audio>}
                { start ? <></> :
                    <div style={{height: "100%", backgroundImage: `url(${props.images})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                        <div style={{width: "100%", height: "100%", background: "rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", justifyContent: "center", transform: "translateX(0px)"}}>
                            <h1 style={{textAlign: "center", fontSize: "2.857em", color: "white"}}>{"Level - " + data.LevelNumber}</h1>
                            <button onClick={() => onStartClick()} style={{marginInline: "auto"}}>Start</button>
                        </div>
                    </div>
                }
            {!start ? <div></div> : <>
                    <Progress done={(currentProgressCount * 10).toString()} />
                    <DndProvider backend={HTML5Backend}>
                        <div className="dragAndDrop" style={{height: "200px"}}>
                            <DragDrop timeOver={timeOver} answerDrop={answerDrop} startDrag={false} props={data.Puzzles[levelCount]} />
                        </div>
                    </DndProvider>
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
