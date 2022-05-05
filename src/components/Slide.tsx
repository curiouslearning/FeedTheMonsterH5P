import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "./app.css";
import DragDrop from "./dragdrop-stones/DragDrop";
import Progress from "./progress-bar/progress";
import PuzzelBar from "./puzzel-bar/PuzzelBar";
import ScoreBoard from "./score-board/ScoreBoard";
import PromptText from "./prompt-text/PromptText";
import PopupMenu from "./popup-menu/PopupMenu";
import AnimationType from "./animations/AnimationType";
import AudioComponent from "./common/AudioComponent";
import SuccessText from "./success-text/SuccessText";
import fantastic from "../../assets/audio/fantastic.WAV";
import great from "../../assets/audio/great.wav";
import goodJob from "../../assets/audio/good job.WAV";
import EndLevelComponent from "./end-level/EndLevelComponent";
import mapIcon from "../../assets/images/mapIcon.png";
import map from "../../assets/images/map.jpg";
import { buttonCLick, getAudioPath, getImagePath } from "../app";
import { useAppDispatch, useAppSelector } from "../app/hooks/commonHook";
import { RootState } from "../app/store";
import PauseButton from "./pause-button/PauseButton";
import { onClickRestart, startTheTimer, stopTheTimer } from "../app/redux/features/GameLevel1";

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
  // const [timeOver, setTimeOver] = useState(false);
  // const [correctDrop, setCorrectDrop] = useState(false);
  // const [levelCount, setLevelCount] = useState(0);
  // const [currentProgressCount, setProgressCount] = useState(initialTime);
  // const [prompted, setPromted] = useState(props.promptVisibility);
  // const [activeIndicators, setActiveIndicator] = useState(0);
  // const [isMenuPopup, setPauseMenu] = useState(false);
  // const [isLevelEnded, setIsLevelEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [text, setText] = useState("");

  //redux
  const currentStates = useAppSelector((state : RootState) => state.gameLevel.level);
  const { 
    isLevelEnded, 
    currentPuzzelNumber, 
    currentScore,  
    pauseButtonClicked, 
    timeEnded, 
    stoneDropped, 
    timerProgress, 
    stopTimer,
    feedBackText
  } = currentStates;
  const dispatch = useAppDispatch();

  const totalPuzzleInCurrentLevel = props.currentLevelPuzzles.length;
  const answerText = props.currentLevelPuzzles[currentPuzzelNumber].prompt.PromptText;
  
  const feedbackArray: any[] = props.feedbackTexts;
  const timeOut = new Audio(getAudioPath() + "timeout.mp3");
  const levelLost = new Audio(getAudioPath() + "LevelLoseFanfare.mp3");
  const levelWin = new Audio(getAudioPath() + "LevelWinFanfare.mp3");
  const scoreCount = new Audio(getAudioPath() + "ScoreCountingDown.ogg");
  const answerAudio = getAudioPath() + "b.WAV";

  // const resetState = () => {
  //   buttonCLick().play();
  //   setTimeOver(false);
  //   setCorrectDrop(false);
  //   setLevelCount(0);
  //   setProgressCount(initialTime);
  //   setPromted(props.promptVisibility);
  //   setActiveIndicator(0);
  //   setPauseMenu(false);
  //   // setIsLevelEnded(false);
  //   setScore(0);
  //   setText("");
  // };

  // const onClickRestart = () => {
  //   buttonCLick().play();
  //   setTimeout(() => {
  //     setLevelCount(0);
  //     setPauseMenu(false);
  //     setProgressCount(initialTime);
  //     setActiveIndicator(0);
  //   }, 1000);
  // };

  // const onClickPauseMenu = () => {
  //   buttonCLick().play();
  //   if (!isMenuPopup) {
  //     setPauseMenu(true);
  //     // if (props.playing) {
  //     //   audio.pause();
  //     // }
  //   }

  //   if (isMenuPopup) {
  //     setPauseMenu(false);
  //   }
  // };

  const answerDrop = () => {
    // setCorrectDrop(true);
  };

  const levelUp = () => {
    // TODo here
    // if (props.lengthOfCurrentLevel - 1 == levelCount) {
    //   setTimeout(() => {
    //     setIsLevelEnded(true);
    //     score > 100 ? levelWin.play() : levelLost.play();
    //   }, 2000);
    // } else {
    //   setTimeout(() => {
    //     setLevelCount((preCount) => preCount + 1);
    //     setCorrectDrop(false);
    //     setProgressCount(initialTime);
    //     setActiveIndicator((pre) => pre + 1);
    //     setPromted(true);
    //     setIsLevelEnded(false);
    //     props.stopPlaying();
    //     props.playAudio();
    //   }, 4000);
    // }
  };

  const startTimer = () => {
    console.log('jajahahah')
    if (!pauseButtonClicked && !stoneDropped) {
      dispatch(startTheTimer());
    }

    if (timerProgress <= 0.5) {
      dispatch(stopTheTimer())
      clearTime()
    }
  }

  const clearTime = () => {
    return clearInterval(id);
  };

  useEffect(()=> {

    props.monsterRef.current.style.display = "none";
    if (!stopTimer) {
      id = setInterval(startTimer, 500);
    }

    return () => {
      clearInterval(id);
    }

  },[pauseButtonClicked, stoneDropped, timerProgress, props.playing])


  return isLevelEnded ? (
    <EndLevelComponent
      score={score}
      totalPuzzleInCurrentLevel={totalPuzzleInCurrentLevel}
      allLevelScreen={props.allLevelScreen}
      nextLevel={props.nextLevel}
    />
  ) : (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <audio src={answerAudio} autoPlay></audio>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginInline: "50px",
          marginTop: "10px",
        }}
      >
        <PuzzelBar puzzelCount={totalPuzzleInCurrentLevel} activeIndicators={currentPuzzelNumber} />
        <ScoreBoard score={score} />
        <PauseButton />
      </div>
      {pauseButtonClicked ? (
        <PopupMenu
          allLevelScreen={props.allLevelScreen}
        />
      ) : (
        <></>
      )}

      <Progress done={(timerProgress * 10).toString()} />
      <PromptText
        letter={
          answerText
        }
        isAudioPlaying={props.playing}
        textVisbility={props.promptVisibility}
        levelType={props.levelType}
        targetedLetters={props.currentLevelPuzzles[currentPuzzelNumber].targetstones}
      />
      <SuccessText word={text} />
      <div className="dragAndDrop" style={{ height: "200px" }}>
        <DragDrop
          answerDrop={answerDrop}
          props={props.currentLevelPuzzles[currentPuzzelNumber]}
          changePuzzel={levelUp}
          levelCount={currentPuzzelNumber}
          levelType={props.levelType}
          setScore={(count: number) => {
            scoreCount.play();
            setScore(score + count);
            if (count == 100) {
              const feedbackPhrase =
                feedbackArray[
                  Math.floor(Math.random() * feedbackArray.length)
                ];
              setText(feedbackPhrase);

              const playerProfile = [
                {
                  _levelNumber: props.levelNumber + 1,
                  data: {
                    _levelName: props.levelType.toString(),
                    _levelScore: score + count,
                    _levelStars:
                      score + count === props.totalPuzzleInCurrentLevel * 100
                        ? 3
                        : score + count >=
                          Math.ceil(props.totalPuzzleInCurrentLevel / 2) * 100
                        ? 2
                        : score + count <= 100
                        ? 0
                        : 1,
                    _levelUnlocked: true,
                  },
                },
                score + count > 100
                  ? {
                      _levelNumber: props.levelNumber + 1 + 1,
                      data: {
                        _levelUnlocked: true,
                      },
                    }
                  : {
                      _levelNumber: props.levelNumber + 1 + 1,
                      data: {
                        _levelUnlocked: false,
                      },
                    },
              ];

              const data = JSON.parse(localStorage.getItem("LevelData"));
              if (data != null) {
                if (data.length >= 0) {
                  data.forEach(function (value: any) {
                    if (value._levelNumber == props.levelNumber + 1) {
                      value._levelScore = score + count;
                      value._levelStars =
                        score + count === props.totalPuzzleInCurrentLevel * 100
                          ? 3
                          : score + count >=
                            Math.ceil(props.totalPuzzleInCurrentLevel / 2) * 100
                          ? 2
                          : score + count <= 100
                          ? 0
                          : 1;
                      value._levelUnlocked =
                        score + count > 100 ? true : false;
                    } else if (
                      value._levelNumber ==
                      props.levelNumber + 2
                    ) {
                      if (value._levelUnlocked == true) {
                        value._levelScore = value.has("_levelScore")
                          ? value._levelScore
                          : 0;
                        value._levelStars = value.has("_levelStars")
                          ? value._levelStars
                          : 0;
                        value._levelUnlocked = value.has("_levelUnlocked")
                          ? value._levelUnlocked
                          : false;
                      }
                    } else {
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
              } else if (feedbackPhrase == "Great!") {
                audioGreat.play();
              } else {
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
      )
    </div>
  );
};

const SlideComponent = (props: any) => {
  const { data, level } = props;
  var audFile: string;
  const levels: Array<any> = level;
  let compared: Array<any> = [];
  const levelData: Array<any> = JSON.parse(localStorage.getItem("LevelData"));
  const len = levelData != null ? levelData.length : 0;
  const [levData, setlevData] = useState(null);
  console.log(props);
  // const lengthOfCurrentLevel = props.data.Puzzles.length;
  const { playing, setPlaying, playAudio } = AudioComponent('assd');
  const [start, setStart] = useState(false);

  const dispatch = useAppDispatch();

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
    // playAudio();
  };

  const nextLevel = () => {
    if (levData.LevelMeta.LevelNumber == level.length) {
      let temp = level[0];
      setlevData(temp);
      onStartClick();
    } else {
      let temp = level[levData.LevelMeta.LevelNumber + 1];
      setlevData(temp);
      onStartClick();
    }
  }

  const allLevelScreen = () => {
    setStart(false);
    dispatch(onClickRestart())
  }

  const monsterRef = useRef();
  compared = [];

  return (
    <Wrapper>
      <img
        src={getImagePath() + "background.png"}
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
            {levels.map((data1, index) => {
              return (
                <div key={index}>
                  {levelData != null ? (
                    levelData.map((value, i) => {
                      return compared.includes(data1.LevelMeta.LevelNumber + 1)
                        ? console.log("compared")
                        : data1.LevelMeta.LevelNumber + 1 === value._levelNumber
                        ? compared.push(data1.LevelMeta.LevelNumber + 1) && (
                            <div key={i}>
                              <div className="topSpace"></div>

                              <button
                                style={{
                                  border: "none",
                                  borderRadius: 70,
                                  outlineStyle: "none",
                                  background: `url(${
                                    getImagePath() + "mapIcon.png"
                                  })`,
                                  backgroundPosition: 25,
                                  backgroundSize: "contain",
                                  backgroundRepeat: "no-repeat",
                                  width: "10vw",
                                  height: "20vh",
                                  padding: 10,
                                  objectFit: "contain",
                                  flexDirection: "column",
                                }}
                                onClick={
                                  (data1.LevelMeta.LevelNumber + 1 ===
                                    value._levelNumber &&
                                    value.data._levelUnlocked) ||
                                  data1.LevelMeta.LevelNumber + 1 == 1 ||
                                  props.devMode
                                    ? () => {
                                        buttonCLick().play();
                                        setlevData(data1);
                                        onStartClick();
                                      }
                                    : () => {
                                        console.log("Nothing");
                                      }
                                }
                              >
                                {value.data._levelStars === 3 ? (
                                  <div className="row">
                                    <div className="pin-star">
                                      <img
                                        src={getImagePath() + "pinStar1.png"}
                                        alt="star"
                                      />
                                    </div>
                                    <div className="pin-star2">
                                      <img
                                        src={getImagePath() + "pinStar2.png"}
                                        alt="star"
                                      />
                                    </div>
                                    <div className="pin-star">
                                      <img
                                        src={getImagePath() + "pinStar3.png"}
                                        alt="star"
                                      />
                                    </div>
                                  </div>
                                ) : value.data._levelStars === 2 ? (
                                  <div className="row">
                                    <div className="pin-star">
                                      <img
                                        src={getImagePath() + "pinStar1.png"}
                                        alt="star"
                                      />
                                    </div>
                                    <div className="pin-star2">
                                      <img
                                        src={getImagePath() + "pinStar2.png"}
                                        alt="star"
                                      />
                                    </div>
                                  </div>
                                ) : value.data._levelStars === 1 ? (
                                  <div className="row">
                                    <div className="pin-star">
                                      <img
                                        src={getImagePath() + "pinStar1.png"}
                                        alt="star"
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <div className="row">
                                      <div className="pin-star"></div>
                                    </div>
                                  </div>
                                )}

                                {(data1.LevelMeta.LevelNumber + 1 ===
                                  value._levelNumber &&
                                  value.data._levelUnlocked) ||
                                data1.LevelMeta.LevelNumber + 1 == 1 ||
                                props.devMode ? (
                                  <h3>
                                    <br></br>
                                    {data1.LevelMeta.LevelNumber + 1}
                                  </h3>
                                ) : (
                                  <div>
                                    <br></br>
                                    <img
                                      src={getImagePath() + "mapLock.png"}
                                    ></img>
                                  </div>
                                )}
                                <br></br>
                                <h2
                                  style={{
                                    color: "white",
                                    textAlign: "center",
                                  }}
                                >
                                  {data1.LevelMeta.LevelType}
                                </h2>
                              </button>
                            </div>
                          )
                        : value._levelNumber <= len &&
                          data1.LevelMeta.LevelNumber + 1 <= len
                        ? console.log("done")
                        : compared.push(data1.LevelMeta.LevelNumber + 1) && (
                            <div>
                              <div className="topSpace"></div>
                              <button
                                style={{
                                  border: "none",
                                  borderRadius: 70,
                                  outlineStyle: "none",
                                  background: `url(${
                                    getImagePath() + "mapIcon.png"
                                  })`,
                                  backgroundPosition: 25,
                                  backgroundSize: "contain",
                                  backgroundRepeat: "no-repeat",
                                  width: "10vw",
                                  height: "20vh",
                                  padding: 10,
                                  objectFit: "contain",
                                }}
                                onClick={
                                  props.devMode
                                    ? () => {
                                        buttonCLick().play();
                                        setlevData(data1);
                                        onStartClick();
                                      }
                                    : () => {
                                        console.log("Nothing");
                                      }
                                }
                              >
                                {props.devMode ? (
                                  <h3>
                                    <br></br>
                                    {data1.LevelMeta.LevelNumber + 1}
                                  </h3>
                                ) : (
                                  <div>
                                    <br></br>
                                    <img
                                      src={getImagePath() + "mapLock.png"}
                                    ></img>
                                  </div>
                                )}

                                <br></br>
                                <br></br>
                                <h2
                                  style={{
                                    color: "white",
                                    textAlign: "center",
                                  }}
                                >
                                  {data1.LevelMeta.LevelType}
                                </h2>
                              </button>
                            </div>
                          );
                    })
                  ) : data1.LevelMeta.LevelNumber + 1 == 1 ? (
                    <div>
                      <br></br>
                      <button
                        style={{
                          border: "none",
                          borderRadius: 70,
                          outlineStyle: "none",
                          background: `url(${getImagePath() + "mapIcon.png"})`,
                          backgroundPosition: 25,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          width: "10vw",
                          height: "20vh",
                          padding: 10,
                          objectFit: "contain",
                        }}
                        onClick={() => {
                          buttonCLick().play();
                          setlevData(data1);
                          onStartClick();
                        }}
                      >
                        <h3>{data1.LevelMeta.LevelNumber + 1}</h3>
                        <br></br>
                        <br></br>
                        <h2 style={{ color: "white", textAlign: "center" }}>
                          {data1.LevelMeta.LevelType}
                        </h2>
                      </button>
                    </div>
                  ) : (
                    <div>
                      <br></br>
                      <button
                        style={{
                          border: "none",
                          borderRadius: 70,
                          outlineStyle: "none",
                          background: `url(${mapIcon})`,
                          backgroundPosition: 25,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          width: "10vw",
                          height: "20vh",
                          padding: 10,
                          objectFit: "contain",
                        }}
                        onClick={
                          props.devMode
                            ? () => {
                                buttonCLick().play();
                                setlevData(data1);
                                onStartClick();
                              }
                            : () => {
                                console.log("Nothing");
                              }
                        }
                      >
                        {props.devMode ? (
                          <h3>
                            <br></br>
                            {data1.LevelMeta.LevelNumber + 1}
                          </h3>
                        ) : (
                          <div>
                            <br></br>
                            <img src={getImagePath() + "mapLock.png"}></img>
                          </div>
                        )}
                        <br></br>
                        <br></br>
                        <h2 style={{ color: "white", textAlign: "center" }}>
                          {data1.LevelMeta.LevelType}
                        </h2>
                      </button>
                    </div>
                  )}
                </div>
              );
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
              props.editorData ? levData.LevelType : levData.LevelMeta.LevelType
            }
            promptVisibility={
              promptTextVisibilty
            }
            allLevelScreen={allLevelScreen}
            nextLevel={nextLevel}
            monsterRef={monsterRef}
            editorData={props.editorData}
            feedbackTexts={props.feedbackTexts}
            levelNumber={levData.LevelMeta.LevelNumber}
            currentLevelPuzzles={levData.Puzzles}
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





