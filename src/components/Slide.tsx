import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "./app.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from "./dragdrop-stones/DragDrop";
import Progress from "./progress-bar/progress";
import PuzzelBar, { PuzzelBarHook } from "./puzzel-bar/PuzzelBar";
import ScoreBoard from "./score-board/ScoreBoard";
import PauseMenu from "./pause-menu/PauseMenu";
import PromptText from "./prompt-text/PromptText";
import PopupMenu from "./popup-menu/PopupMenu";
import bg from "../../assets/images/background.png";
import { url } from "inspector";
import AnimationType from "./animations/AnimationType";
import { Container, Grid } from "@material-ui/core";
import AudioComponent from "./common/AudioComponent";
import { SpriteAnimationContainer } from "./animations/SpriteAnimationContainer";
import SuccessText from './success-text/SuccessText';
import fantastic from "../../assets/audio/fantastic.WAV";
import great from "../../assets/audio/great.wav";
import goodJob from "../../assets/audio/good job.WAV"
import EndLevelComponent from "./end-level/EndLevelComponent";
import star1 from "../../assets/images/pinStar1.png";
import star2 from "../../assets/images/pinStar2.png";
import star3 from "../../assets/images/pinStar3.png";
import mapIcon from "../../assets/images/mapIcon.png";
import map from "../../assets/images/map.jpg";
import mapLock from "../../assets/images/mapLock.png";
import { render } from "react-dom";
import { getImagePath } from "../app";

let audio: HTMLAudioElement = null;
let initialTime = 10;
let id: NodeJS.Timeout;
let timeoutId: NodeJS.Timeout;

// create HTMLAudioElement
const audioFantastic = new Audio(fantastic);
const audioGreat = new Audio(great);
const audiogoodJob = new Audio(goodJob);
let _levelNumber: number;

const Wrapper = styled.div`
  height: 600px;
  width: 100%;
  position: relative;
`;

const DragDropComp = (props: any) => {
  console.log(props);
  const [timeOver, setTimeOver] = useState(false);
  const [correctDrop, setCorrectDrop] = useState(false);
  const [levelCount, setLevelCount] = useState(0);
  const [currentProgressCount, setProgressCount] = useState(initialTime);
  const [prompted, setPromted] = useState(props.promptVisibility);
  const [activeIndicators, setActiveIndicator] = useState(0);
  const [isMenuPopup, setPauseMenu] = useState(false);
  const [isLevelEnded, setIsLevelEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [text, setText] = useState("");
  const feedbackArray: any[] = props.feedbackTexts;

  const resetState = () => {
    setTimeOver(false);
    setCorrectDrop(false);
    setLevelCount(0);
    setProgressCount(initialTime);
    setPromted(props.promptVisibility);
    setActiveIndicator(0);
    setPauseMenu(false);
    setIsLevelEnded(false);
    setScore(0);
    setText("");
  };

  const onClickRestart = () => {
    setTimeout(() => {
      setLevelCount(0);
      setPauseMenu(false);
      setProgressCount(initialTime);
      setActiveIndicator(0);
    }, 1000);
  };

  const onClickPauseMenu = () => {
    if (!isMenuPopup) {
      setPauseMenu(true);
      // if (props.playing) {
      //   audio.pause();
      // }
    }

    if (isMenuPopup) {
      setPauseMenu(false);
    }
  };

  const answerDrop = () => {
    setCorrectDrop(true);
  };

  const levelUp = () => {
    // TODo here
    if (props.lengthOfCurrentLevel - 1 == levelCount) {
      setIsLevelEnded(true);
    } else {
      setTimeout(() => {
        setLevelCount((preCount) => preCount + 1);
        setCorrectDrop(false);
        setProgressCount(initialTime);
        setActiveIndicator((pre) => pre + 1);
        setPromted(true);
        setIsLevelEnded(false);
        props.stopPlaying();
        props.playAudio();
      }, 4000);
    }
  };

  const timer = () => {
    if (props.playing && !isMenuPopup) {
      setProgressCount((preValue) => preValue - 0.5);
    }
  };

  useEffect(() => {
    if (props.playing) {
      props.monsterRef.current.style.display = "none";
      if (prompted) {
        setPromted(false);
      }
    } else {
      props.monsterRef.current.style.display = "block";
    }

    if (!props.start) {
      setProgressCount(10);
      props.stopPlaying();
      return;
    }

    if (currentProgressCount <= 0 && !timeOver) {
      timeoutId = setTimeout(() => {
        // setProgressCount(10);
        // props.stopPlaying()
        levelUp();
        return;
      }, 1000);
    }

    if (currentProgressCount <= 0 || correctDrop) {
      setTimeOver(false);
      return;
    }
    id = setInterval(timer, 500, props.start);

    return () => {
      clearInterval(id);
      clearTimeout(timeoutId);
    };
  }, [
    currentProgressCount,
    props.start,
    props.playing,
    timeOver,
    correctDrop,
    isMenuPopup,
    isLevelEnded,
  ]); 
  console.log(props);
  return isLevelEnded ? (
    <EndLevelComponent
      score={score}
      lengthOfCurrentLevel={props.lengthOfCurrentLevel}
      onClickPauseMenu={onClickPauseMenu}
      onClickRestart={() => {
        resetState();
      }}
      nextLevel={props.nextLevel}
    />
  ) : (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginInline: "50px",
          marginTop: "10px",
        }}
      >
        <PuzzelBar puzzelCount={4} activeIndicators={activeIndicators} />
        <ScoreBoard score={score} />
        <PauseMenu onClickPauseMenu={onClickPauseMenu} />
      </div>
      {isMenuPopup ? (
        <PopupMenu
          onClickPauseMenu={onClickPauseMenu}
          onClickRestart={onClickRestart}
          nextLevel={props.nextLevel}
        />
      ) : (
        <></>
      )}
      <Progress done={(currentProgressCount * 10).toString()} />
      <PromptText
        letter={
          props.puzzles[levelCount]
            ? props.editorData
              ? props.puzzles[levelCount].PromptText
              : props.puzzles[levelCount].prompt.PromptText
            : ""
        }
        isAudioPlaying={props.playing}
        textVisbility={props.promptVisibility}
        levelType={props.levelType}
      />
      <SuccessText word={text} />
      {prompted ? (
        <></>
      ) : (
        <DndProvider backend={HTML5Backend}>
          <div className="dragAndDrop" style={{ height: "200px" }}>
            <DragDrop
              timeOver={timeOver}
              answerDrop={answerDrop}
              startDrag={false}
              props={props.puzzles[levelCount]}
              changePuzzel={levelUp}
              levelCount={levelCount}
              isMenuOpen={isMenuPopup}
              levelType={props.levelType}
              setScore={(count: number) => {
                setScore(score + count);
                if (count == 100) {
                  const feedbackPhrase =
                    feedbackArray[
                      Math.floor(Math.random() * feedbackArray.length)
                    ];
                  setText(feedbackPhrase);

                  const playerProfile = [
                    {
                      _levelNumber: props.levelNumber+1,
                      data: {
                        _levelName: props.levelType.toString(),
                        _levelScore: score + count,
                        _levelStars: score + count === props.lengthOfCurrentLevel * 100 ? 3 :
                        score + count >= Math.ceil(props.lengthOfCurrentLevel / 2) * 100 ? 2:
                        score + count <= 100 ? 0 : 1,
                        _levelUnlocked: true,
                      },
                    },
                    score + count > 100 ?
                    {
                      _levelNumber: props.levelNumber+1+1,
                      data: {
                        _levelUnlocked: true,
                      },
                    }:{
                      _levelNumber: props.levelNumber+1+1,
                      data: {
                        _levelUnlocked: false,
                      },
                    }
                  ];

                  const data = JSON.parse(localStorage.getItem("LevelData"));
                  if (data != null) {
                    if (data.length >= 0) {
                      data.forEach(function (value: any) {
                        if (value._levelNumber == props.levelNumber+1) {
                          
                            value._levelScore = score + count;
                            value._levelStars = score + count === props.lengthOfCurrentLevel * 100 ? 3 :
                            score + count >= Math.ceil(props.lengthOfCurrentLevel / 2) * 100 ? 2:
                            score + count <= 100 ? 0 : 1;
                            value._levelUnlocked = score + count > 100 ? true: false;
                          
                        }
                        else if (value._levelNumber == props.levelNumber+2) {
                          if (value._levelUnlocked == true) {
                            value._levelScore = value.has('_levelScore')?value._levelScore:0;
                            value._levelStars = value.has('_levelStars')?value._levelStars:0;
                            value._levelUnlocked = value.has('_levelUnlocked')?value._levelUnlocked:false;
                          }
                        }
                        else {
                          playerProfile.push(value);
                        }
                      });
                    }
                  }
                  localStorage.setItem(
                    "LevelData",
                    JSON.stringify(playerProfile)
                  );

                  if (feedbackPhrase == "Fantastic!") {
                    audioFantastic.play();
                  } else if(feedbackPhrase == "Great!"){
                    audioGreat.play();
                  }
                  else {
                    audiogoodJob.play();
                  }
                  setTimeout(function () {
                    setText("");
                  }, 3500);
                }
              }}
              editorData={props.editorData}
            />
          </div>
        </DndProvider>
      )}
    </div>
  );
};


const SlideComponent = (props: any) => {
  const { data, level } = props;
  var audFile: string;
  const levels: Array<any> = level;
  let compared: Array<any> = [];
  const levelData: Array<any> = JSON.parse(localStorage.getItem('LevelData'));
  const len = levelData != null ?levelData.length : 0;
  const [levData, setlevData] = useState(null);
  console.log(props);
  const lengthOfCurrentLevel = props.data.Puzzles.length;
  const { playing, setPlaying, playAudio } = AudioComponent();
  const [start, setStart] = useState(false);
  let promptTextVisibilty = true;
  let stopPlaying;
  if (levData != null) {

    promptTextVisibilty = props.editorData
      ? levData.PromptType == "Visible"
        ? true
        : false
      : levData.LevelMeta.PromptType == "Visible"
      ? true
      : false;

    
    stopPlaying = () => {
      if (playing) {
        setPlaying(false);
      }
    };
  }

  useEffect(() => {
    setStart(false);
    return () => {
      if (playing) {
        if (audio != null) {
          audio.pause();
        }
      }
      audio = null;
      initialTime = 10;
      clearInterval(id);
      setPlaying(false);
    };
  }, [props.started]);

  const onStartClick = () => {
    setTimeout(() => {
      setStart(true);
    }, 0);
    playAudio();
  };

  const monsterRef = useRef();
  compared = [];
  return (
    <Wrapper>
      <img
        src={getImagePath()+'background.png'}
        style={{
          position: "absolute",
          width: "100%",
          height: "600px",
          zIndex: -2,
        }}
      ></img>
      {data.audio && data.audio.length > 0 ? (
        ""
      ) : (
        <audio src={audFile} autoPlay></audio>
      )}
      {start ? (
        <></>
      ) : (
        <div
          style={{
            height: "100%",
            backgroundImage: `url(${map})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              transform: "translateX(0px)",
              flexWrap: "wrap",
              overflowY: "scroll",
            }}
          >
            {
              
            levels.map((data1, index) => 
            {
              
              return(
                <div key={index} >

                 {
                   levelData != null?
                  (

                    levelData.map((value, i) => 
                    {
                            return(
                              compared.includes(data1.LevelMeta.LevelNumber+1)?
                              console.log("compared"):
                              data1.LevelMeta.LevelNumber+1 === value._levelNumber ?
                              compared.push(data1.LevelMeta.LevelNumber+1) &&
                              <div>
                                  
                                  {value.data._levelStars === 3?  
                                  <div className="row">
                                    <div className="pin-star">
                                    <img src={star1} alt="star" />
                                  </div>
                                  <div className="pin-star">
                                    <img src={star2} alt="star" />
                                  </div>
                                  <div className="pin-star">
                                    <img src={star3} alt="star" />
                                  </div>
                                  </div>:value.data._levelStars === 2?  
                                  <div className="row">
                                    <div className="pin-star">
                                    <img src={star1} alt="star" />
                                  </div>
                                  <div className="pin-star">
                                    <img src={star2} alt="star" />
                                  </div>
                                  </div>:value.data._levelStars === 1?  
                                  <div className="row">
                                    <div className="pin-star">
                                    <img src={star1} alt="star" />
                                  </div>
                                  </div>:<div></div>}
                                  
                                
                                <button
                                  style={{
                                    border:'none',
                                    borderRadius: 70,
                                    outlineStyle: 'none',
                                    background: `url(${mapIcon})`,
                                    backgroundPosition: 25,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    width: '10vw',
                                    height: '20vh',
                                    padding: 10,
                                    objectFit: 'contain',
                                  }}
                                
                                  onClick={
                                    (data1.LevelMeta.LevelNumber + 1 === value._levelNumber
                                    && 
                                    value.data._levelUnlocked) || data1.LevelMeta.LevelNumber+1 == 1?
                                    () => {
                                    setlevData(data1);
                                    onStartClick();
                                  }
                                  : ()=>{
                                    console.log('Nothing');
                                  }
                                }
                                >
                                {(data1.LevelMeta.LevelNumber + 1 === value._levelNumber
                                  && 
                                  value.data._levelUnlocked) || data1.LevelMeta.LevelNumber+1 == 1?
                                <h3>{
                                  data1.LevelMeta.LevelNumber+1
                                  }</h3>:
                                <img src = {mapLock}></img>
                                }
                                <br></br><br></br>
                                <h2 style={{ color: "white",textAlign:'center' }}>
                                  {data1.LevelMeta.LevelType}
                                </h2>
                                </button>

                                </div>
                              :
                                (value._levelNumber <= len && data1.LevelMeta.LevelNumber+1 <= len) ?
                                console.log('done')
                                :
                                compared.push(data1.LevelMeta.LevelNumber+1) &&
                                  <button
                                    style={{
                                      border:'none',
                                      borderRadius: 70,
                                      outlineStyle: 'none',
                                      background: `url(${mapIcon})`,
                                      backgroundPosition: 25,
                                      backgroundSize: 'contain',
                                      backgroundRepeat: 'no-repeat',
                                      width: '10vw',
                                      height: '20vh',
                                      padding: 10,
                                      objectFit: 'contain',
                                    }}
                                  >
                                  <img src = {mapLock}
                                  ></img>
                                  <br></br><br></br>
                                  <h2 style={{ color: "white",textAlign:'center' }}>
                                    {data1.LevelMeta.LevelType}
                                  </h2>
                                  </button>
                            )
                      
                    }
                    )
                
              )
              :
                  (
                    data1.LevelMeta.LevelNumber+1 == 1 ?
                    (
                      <div>
                        <br></br>
                        <button
                        style={{
                          border:'none',
                          borderRadius: 70,
                          outlineStyle: 'none',
                          background: `url(${mapIcon})`,
                          backgroundPosition: 25,
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          width: '10vw',
                          height: '20vh',
                          padding: 10,
                          objectFit: 'contain',
                        }}
                        onClick={() => {
                          setlevData(data1);
                          onStartClick();
                        }}
                      >
                       <h3>{data1.LevelMeta.LevelNumber+1}</h3>
                       <br></br><br></br>
                       <h2 style={{ color: "white",textAlign:'center' }}>
                        {data1.LevelMeta.LevelType}
                      </h2>
                      </button>
                      </div>
                    ):
                    

                    <div>
                    <br></br>
                    <button
                        style={{
                          border:'none',
                          borderRadius: 70,
                          outlineStyle: 'none',
                          background: `url(${mapIcon})`,
                          backgroundPosition: 25,
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          width: '10vw',
                          height: '20vh',
                          padding: 10,
                          objectFit: 'contain',
                        }}
                      >
                       <img src = {mapLock}
                       ></img>
                       <br></br><br></br>
                       <h2 style={{ color: "white",textAlign:'center' }}>
                        {data1.LevelMeta.LevelType}
                      </h2>
                      </button>
                      </div>
                  )
            }
            </div>
              )
            })}
          
          

           </div>
          </div>

          
      )}
      {!start ? (
        <div></div>
      ) : (
        <>
          <DragDropComp
            playing={playing}
            start={start}
            levelType={
              // data.LevelMeta.LevelType == "LetterInWord" ? true : false
              props.editorData ? levData.LevelType : levData.LevelMeta.LevelType
            }
            promptVisibility={
              // data.LevelMeta.PromptType == "Visible" ? true : false
              promptTextVisibilty
            }
            puzzles={levData.Puzzles}
            stopPlaying={stopPlaying}
            playAudio={playAudio}
            nextLevel={props.nextLevel}
            monsterRef={monsterRef}
            lengthOfCurrentLevel={lengthOfCurrentLevel}
            editorData={props.editorData}
            feedbackTexts={props.feedbackTexts}
            levelNumber={levData.LevelMeta.LevelNumber}
          />

          <div
            ref={monsterRef}
            style={{
              width: "300px",
              height: "100px",
              top: "50%",
              left: "30%",
              position: "absolute",
            }}
          >
            <AnimationType type="idle" />
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default SlideComponent;
