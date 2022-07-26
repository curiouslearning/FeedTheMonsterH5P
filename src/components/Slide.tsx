import React, { forwardRef, useImperativeHandle, useRef,useEffect, useState } from "react";
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
import { PromptTextHook } from "../components/prompt-text/PromptText";
import PopupMenu from "./popup-menu/PopupMenu";
import bg from "../../assets/images/background.png";
import { url } from "inspector";
import AnimationType from "./animations/AnimationType";
import { Container, Grid } from "@material-ui/core";
import AudioComponent from "./common/AudioComponent";
import { SpriteAnimationContainer } from "./animations/SpriteAnimationContainer";
import SuccessText from "./success-text/SuccessText";
import fantastic from "../../assets/audio/fantastic.WAV";
import great from "../../assets/audio/great.wav";
import goodJob from "../../assets/audio/good job.WAV";
import EndLevelComponent from "./end-level/EndLevelComponent";
import star1 from "../../assets/images/pinStar1.png";
import star2 from "../../assets/images/pinStar2.png";
import star3 from "../../assets/images/pinStar3.png";
import mapIcon from "../../assets/images/mapIcon.png";
import map from "../../assets/images/map.jpg";
import mapLock from "../../assets/images/mapLock.png";
import { render } from "react-dom";
import { buttonCLick, getAudioPath, getImagePath } from "../app";
import { Howl } from "howler";
import { DropTarget } from "react-drag-drop-container";

// let audio: HTMLAudioElement = null;
let initialTime = 10;
let id: NodeJS.Timeout;
let timeoutId: NodeJS.Timeout;
let afterDropPause: boolean = false;
let dropPause: boolean = false;
// create HTMLAudioElement
let isReplayed = false;
let _levelNumber: number;
let gameStatus: boolean = false;
let screenRotation = window.screen.orientation.type;
// const reference = useRef(null);


const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
`;
const DragDropComp = (props: any) => {
  console.log("DRAGDROPCOMP PROPS ==> ", props);
  const [timeOver, setTimeOver] = useState(false);
  const [game, setGame] = useState(false);
  const [correctDrop, setCorrectDrop] = useState(false);
  const [levelCount, setLevelCount] = useState(0);
  const [currentProgressCount, setProgressCount] = useState(initialTime);
  const [prompted, setPromted] = useState(props.promptVisibility);
  const [activeIndicators, setActiveIndicator] = useState(0);
  const [isMenuPopup, setPauseMenu] = useState(false);
  const [isLevelEnded, setIsLevelEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [text, setText] = useState("");
  // const [gameStatus, setGameStatus] = useState(false);
  const feedbackArray: any[] = props.feedbackTexts;
  const feedbackAudiosArray: any[] = props.feedbackAudios;
  const childRef = useRef(null);
  const [animationType, setAnimationType] = useState("idle");
  const onem=()=>{}
  const mtwo=()=>{}
  let checkResult: Function;
  let setAnimation:Function;
  let sample;
  childRef.current=DragDrop;

  
  // const timeOut = new Audio(getAudioPath() + "timeout.mp3");
  // const levelLost = new Audio(getAudioPath() + "LevelLoseFanfare.mp3");
  // const levelWin = new Audio(getAudioPath() + "LevelWinFanfare.mp3");
  // const scoreCount = new Audio(getAudioPath() + "ScoreCountingDown.ogg");
  document.addEventListener(
    "visibilitychange",
    function () {
      if (document.hidden) {
        if (!isMenuPopup) {
          onClickPauseMenu();
        }
      } else {
      }
    },
    false
  );
  window.addEventListener("orientationchange", function () {
    if (window.screen.orientation.type !== screenRotation) {
      if (!isMenuPopup) {
        onClickPauseMenu();
      } else {
      }
    }
  });
  const playAUDIO = (src: any) => {
    const sound = new Howl({
      src,
      html5: true,
    });
    sound.play();
  };

  const resetState = () => {
    dropPause = false;
    buttonCLick();
    setTimeOver(false);
    setCorrectDrop(false);
    setIsLevelEnded(false);
    setText("");
    setLevelCount(0);
    setPauseMenu(false);
    setProgressCount(initialTime);
    setPromted(props.promptVisibility);
    setActiveIndicator(0);
    setScore(0);
    props.playAudio(props.puzzles[0].prompt.PromptAudio);
  };

  const onClickRestart = () => {
    gameStatus = false;
    isReplayed = true;
    dropPause = false;
    buttonCLick();
    setTimeOver(false);
    setCorrectDrop(false);
    setIsLevelEnded(false);
    setText("");
    setLevelCount(0);
    setPauseMenu(false);
    setProgressCount(initialTime);
    setPromted(props.promptVisibility);
    setActiveIndicator(0);
    setScore(0);
    props.playAudio(props.puzzles[0].prompt.PromptAudio);
  };
  const onClickPauseMenu = () => {
    if (!isMenuPopup) {
      setPauseMenu(true);
      dropPause = true;
      // if (props.playing) {
      //   audio.pause();
      // }
    }

    if (isMenuPopup) {
      setPauseMenu(false);
      if (afterDropPause) {
        levelUp(true);
        afterDropPause = false;
      }
      dropPause = false;
    }
  };

  const answerDrop = () => {
    setCorrectDrop(true);
  };
  const afterDrop = (k: number, i: number) => {
    if (k == 1 && i == 0) {
      afterDropPause = true;
      if (isReplayed) {
        dropPause = false;

        isReplayed = false;
      }
    }
  };
  const { disappearPromptText } = PromptTextHook(props.levelType);

  const levelUp = (noDrag: boolean) => {
    // TODo here
    gameStatus = false;
    if (props.lengthOfCurrentLevel - 1 == levelCount) {
      setActiveIndicator(props.lengthOfCurrentLevel);
      setTimeout(
        () => {
          if (!dropPause) {
            afterDropPause = false;

            setIsLevelEnded(true);
            score > 100
              ? playAUDIO(getAudioPath() + "LevelWinFanfare.mp3")
              : playAUDIO(getAudioPath() + "LevelLoseFanfare.mp3");
          }
        },
        currentProgressCount == 0 ? 0 : 3000
      );
    } else {
      //disappearPromptText()
      setTimeout(
        () => {
          if (!dropPause) {
            afterDropPause = false;
            // dropPause=false;
            setLevelCount((preCount) => preCount + 1);
            setCorrectDrop(false);
            setProgressCount(initialTime);
            setActiveIndicator((pre) => pre + 1);
            setPromted(true);
            setIsLevelEnded(false);
            if (currentProgressCount != 0) {
              props.stopPlaying();
            }
            props.playAudio(
              props.puzzles[activeIndicators + 1].prompt.PromptAudio
            );
          }
        },
        noDrag ? 0 : 4000
      );
    }
  };
  if (!props.playing) {
    setTimeout(() => {
      props.startPlaying();
    }, 4000);
  }

  const timer = () => {
    if (props.playing && !isMenuPopup && gameStatus) {
      setProgressCount((preValue) => preValue - 0.5);
      {
        currentProgressCount == 1.5
          ? playAUDIO(getAudioPath() + "timeout.mp3")
          : null;
      }
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

    if (currentProgressCount <= 0 || timeOver) {
      timeoutId = setTimeout(() => {
        // setProgressCount(10);
        // props.stopPlaying()
        levelUp(true);

        return;
      }, 1000);
    }
    if (currentProgressCount <= 0) {
      setTimeout(() => {
        setGame(true);
        setGame(false);
      }, 2000);
      setTimeout(() => {
        gameStatus = true;
      }, 7000);
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
    game,
  ]);

  console.log(props);
  var levelsCompleted = JSON.parse(localStorage.getItem("LevelData"));
  console.log(levelCount);
  console.log(
    levelsCompleted != undefined
      ? levelsCompleted[levelsCompleted.length - 1].data._levelScore
      : "Sample  "
  );
  console.log(levelsCompleted);
  const getPhaseCharacter = (levelsCompleted: number) => {
    let phaseCharacterNumber = Math.floor(levelsCompleted / 4);
    console.log(phaseCharacterNumber);
    if (phaseCharacterNumber < 4) {
      return phaseCharacterNumber;
    } else {
      return 3;
    }
  };


  return isLevelEnded ? (
    document.getElementById("exitButton").style.color="white",
    <EndLevelComponent
      score={score}
      lengthOfCurrentLevel={props.lengthOfCurrentLevel}
      levelsCompleted={getPhaseCharacter(
        levelsCompleted == null
          ? 0
          : levelsCompleted[levelsCompleted.length - 1].data._levelScore ==
              undefined || levelCount != 0
          ? levelsCompleted.length - 1
          : levelsCompleted.length
      )}
      allLevelScreen={() => {
        props.allLevelScreen();
        setPauseMenu(false);
        setTimeout(() => {
          setLevelCount(0);
          setProgressCount(initialTime);
          setActiveIndicator(0);
          setScore(0);
        }, 1000);
      }}
      onClickRestart={() => {
        resetState();
      }}
      nextLevel={() => {
        props.nextLevel();
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
      }}
    />
  ) : (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "10px",
        }}
      >
        <PuzzelBar puzzelCount={4} activeIndicators={activeIndicators} />
        {props.devMode ? (
          <>
            <ScoreBoard
              levelNumber={props.levelNumber}
              levelCount={levelCount}
            />
          </>
        ) : (
          <></>
        )}
        <PauseMenu
          onClickPauseMenu={() => {
            buttonCLick();
            onClickPauseMenu();
          }}
        />
      </div>
      {isMenuPopup ? (
        <PopupMenu
          onClickPauseMenu={() => {
            buttonCLick();
            onClickPauseMenu();
          }}
          onClickRestart={onClickRestart}
          allLevelScreen={() => {
            gameStatus = false;
            isReplayed  = true;
            props.allLevelScreen();
            setPauseMenu(false);
            setTimeout(() => {
              setLevelCount(0);
              setProgressCount(initialTime);
              setActiveIndicator(0);
              setScore(0);
            }, 1000);
          }}
        />
      ) : (
        <></>
      )}

      <Progress done={(currentProgressCount * 10).toString()} />
      <PromptText
        IsGamePlay={(status: any) => {
          !gameStatus ? playAUDIO(getAudioPath() + "StonesAppear.mp3") : null;
          gameStatus = status;
        }}
        letter={
          props.puzzles[levelCount]
            ? props.editorData
              ? props.puzzles[levelCount].PromptText
              : props.puzzles[levelCount].prompt.PromptText
            : ""
        }
        audioUrl={
          props.puzzles[levelCount]
            ? props.editorData
              ? props.puzzles[levelCount].PromptAudio
              : props.puzzles[levelCount].prompt.PromptAudio
            : ""
        }
        isAudioPlaying={props.playing}
        textVisbility={props.promptVisibility}
        levelType={props.levelType}
        generalData={props.generalData}
        targetedLetters={props.puzzles[levelCount].targetstones}
      />
      <SuccessText word={text} />
      {prompted ? (
        <></>
      ) : (
        <div>
         <div style={{ display: "grid",alignSelf:'baseline' }}>
        <DropTarget
          onHit={(e: any) => {
            console.log(e);
            console.log("dropped");
            console.log(e.containerElem.innerText);
            checkResult(e.containerElem.innerText);
            // console.log(childRef.current.checkResult)
            // childRef.current.checkResult(e.containerElem.innerText)
            if (currentProgressCount != 0) {
              // checkResult(e.containerElem.innerText);
            }

            e.containerElem.style.visibility = "hidden";
          }}
          targetKey="box"
          dropData={{ name: props.name }}
        >
          <div
            onClick={() => {
              // IsGamePlay(true);
              // setGameStatus(true);
            }}
            style={{
              border: "solid",
              width: "100px",
              height: "150px",
              gridColumn: 1,
              position: "relative",
              top: "50px",
              gridRow: 1,
              zIndex: 2,
            }}
          ></div>
        </DropTarget>
        <div
          style={{
            width: "300px",
            height: "0px",
            gridColumn: 1,
            gridRow: 1,
            zIndex: 0,
            position:'relative',
            bottom:'50px',
            display:'flex',
            justifyContent:'center',
            transform:'scale(0.5)'
          }}
        >
          <AnimationType
            type={animationType}
            getPhaseCharNo={1}
          />
        </div>
        </div> 
        <DndProvider backend={HTML5Backend}>
          <div
            className="dragAndDrop"
            style={{
              height: "50%",
              display: "flex",
              margin: "auto",
              alignItems: "flex-start",
            }}
          >
            <DragDrop
              ref={childRef}
              isReplayed={isReplayed}
              IsGamePlayStatus={gameStatus}
              IsGamePlay={(status: any) => {
                !gameStatus
                  ? playAUDIO(getAudioPath() + "StonesAppear.mp3")
                  : null;
                gameStatus = status;
              }}
              currentProgressCount={currentProgressCount}
              timeOver={timeOver}
              answerDrop={answerDrop}
              startDrag={false}
              props={props.puzzles[levelCount]}
              changePuzzel={levelUp}
              levelCount={levelCount}
              levelsCompleted={getPhaseCharacter(
                levelsCompleted == null
                  ? 0
                  : levelsCompleted[levelsCompleted.length - 1].data
                      ._levelScore == undefined || levelCount != 0
                  ? levelsCompleted.length - 1
                  : levelsCompleted.length
              )}
              isMenuOpen={isMenuPopup}
              levelType={props.levelType}
              afterDropPause={afterDrop}
              setFunction={(func:Function)=>{
                checkResult=func
                // func();
                // sampleFunction();
              }}
              setAnimationType={setAnimationType}
              setScore={(count: number) => {
                //scoreCount.play();
                playAUDIO(getAudioPath() + "ScoreCountingDown.ogg");
                setScore(score + count);
                if (count == 100) {
                  const feedbackPhrase =
                    feedbackArray[
                      Math.floor(Math.random() * feedbackArray.length)
                    ];
                  setText(feedbackPhrase);
                  const audioIndex =
                    props.feedbackTexts.indexOf(feedbackPhrase);
                  playAUDIO(feedbackAudiosArray[audioIndex]);

                  let playerProfile = [
                    {
                      _levelNumber: props.levelNumber + 1,
                      data: {
                        _levelName: props.levelType.toString(),
                        _levelScore: score + count,
                        _levelStars:
                          score + count === props.lengthOfCurrentLevel * 100
                            ? 3
                            : score + count >=
                              Math.ceil(props.lengthOfCurrentLevel / 2) * 100
                            ? 2
                            : score + count <= 100
                            ? 0
                            : 1,
                        _levelUnlocked: false,
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
                          value.data._levelName = props.levelType.toString();
                          value.data._levelScore =
                            value.data._levelScore > score + count
                              ? value.data._levelScore
                              : score + count;
                          value.data._levelStars =
                            value.data._levelScore > score + count
                              ? value.data._levelScore ===
                                props.lengthOfCurrentLevel * 100
                                ? 3
                                : value.data._levelScore >=
                                  Math.ceil(props.lengthOfCurrentLevel / 2) *
                                    100
                                ? 2
                                : value.data._levelScore <= 100
                                ? 0
                                : 1
                              : score + count ===
                                props.lengthOfCurrentLevel * 100
                              ? 3
                              : score + count >=
                                Math.ceil(props.lengthOfCurrentLevel / 2) * 100
                              ? 2
                              : score + count <= 100
                              ? 0
                              : 1;
                          value.data._levelUnlocked = value.data._levelUnlocked
                            ? value.data._levelUnlocked
                            : value.data._levelScore > score + count
                            ? value.data._levelScore > 100
                              ? true
                              : false
                            : score + count > 100
                            ? true
                            : false;

                          value.data._levelScore == 200
                            ? data.push({
                                _levelNumber: props.levelNumber + 2,
                                data: {
                                  _levelUnlocked: true,
                                },
                              })
                            : value.data._levelScore <= 100
                            ? data.push({
                                _levelNumber: props.levelNumber + 2,
                                data: {
                                  _levelUnlocked: false,
                                },
                              })
                            : console.log("nothing");
                        } else if (
                          value._levelNumber ==
                          props.levelNumber + 2
                        ) {
                          if (value.data._levelUnlocked == false) {
                            value.data._levelUnlocked =
                              score + count > 100 ? true : false;
                          } else if (value.data._levelUnlocked == true) {
                            value.data._levelScore = value.data._levelScore
                              ? value.data._levelScore
                              : 0;
                            value.data._levelStars = value.data._levelStars
                              ? value.data._levelStars
                              : 0;
                            value.data._levelUnlocked = value.data
                              ._levelUnlocked
                              ? value.data._levelUnlocked
                              : false;
                          }
                        } else {
                          console.log("NOT FOUND");
                        }
                      });

                      playerProfile = [];
                      const obj = [
                        ...new Map(
                          data.map((item: any) => [JSON.stringify(item), item])
                        ).values(),
                      ];

                      obj.forEach(function (value: any) {
                        playerProfile.push(value);
                      });
                    }
                  }
                  localStorage.setItem(
                    "LevelData",
                    JSON.stringify(playerProfile)
                  );
                  setTimeout(function () {
                    setText("");
                  }, 3500);
                }
              }}
              editorData={props.editorData}
            
            />
          </div>
        </DndProvider>
        </div>
      )}
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
  const lengthOfCurrentLevel = props.data.Puzzles.length;
  const { playing, setPlaying, playAudio } = AudioComponent(props);
  const [start, setStart] = useState(false);
  let promptTextVisibilty = true;
  let stopPlaying;
  let startPlaying;
 
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
  startPlaying = () => {
    if (!playing) {
      setPlaying(true);
    }
  };
  useEffect(() => {
    setStart(false);
    return () => {
      // if (playing) {
      //   if (audio != null) {
      //     audio.pause();
      //   }
      // }
      // audio = null;
      initialTime = 10;
      clearInterval(id);
      setPlaying(false);
    };
  }, [props.started]);

  const onStartClick = (url: any) => {
    let id = document.getElementById("exitButton");
    id.style.left = "52%";
    id.style.color = "black";
    if (
      window.innerWidth == screen.width &&
      window.innerHeight == screen.height
    ) {
      id.style.display = "block";
    } else {
      id.style.display = "none";
    }
    setTimeout(() => {
      setStart(true);
      dropPause = false;
    }, 0);
    playAudio(url);
  };

  const nextLevel = () => {
    dropPause = false;
    if (levData.LevelMeta.LevelNumber == level.length) {
      let temp = level[0];
      setlevData(temp);
      onStartClick(temp[0].Puzzles[0].prompt.PromptAudio);
    } else {
      let temp = level[levData.LevelMeta.LevelNumber + 1];
      setlevData(temp);
      onStartClick(temp.Puzzles[0].prompt.PromptAudio);
    }
  };

  const allLevelScreen = () => {
    setStart(false);
    let id = document.getElementById("exitButton");
    id.style.left = "2.6%";
    id.style.color = "white";
  };

  const monsterRef = useRef();
  compared = [];
  return (
    <Wrapper>
      <div
        style={{
          backgroundImage: `url(${getImagePath() + "bg.jpg"})`,
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundSize: "100% 100%",
          zIndex: -2,
          overflow: "hidden",
        }}
      >
        <div
          id="hill"
          style={{
            backgroundImage: `url(${getImagePath() + "hill.png"})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            height: "50%",
            width: "110%",
            position: "absolute",
            left: "-5%",
            bottom: 0,
          }}
        >
          <div
            id="totem"
            style={{
              backgroundImage: `url(${getImagePath() + "Totem1.png"})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              height: "100%",
              width: "80%",
              position: "relative",
              backgroundPosition: "right",
              right: "-20%",
              top: "-55%",
              zIndex: -3,
            }}
          ></div>
          <div
            style={{
              backgroundImage: `url(${getImagePath() + "fence.png"})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              height: "100%",
              width: "100%",
              position: "absolute",
              left: "-36%",
              top: "-43%",
              transform: "scale(.7) rotate(-37deg)",
              zIndex: -3,
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>

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
            backgroundImage: `url(${getImagePath() + "map.jpg"})`,
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
                                  width: "8em",
                                  height: "9em",
                                  // padding: 10,
                                  // objectFit: "contain",
                                  // flexDirection: "column",
                                }}
                                onClick={
                                  (data1.LevelMeta.LevelNumber + 1 ===
                                    value._levelNumber &&
                                    value.data._levelUnlocked) ||
                                  data1.LevelMeta.LevelNumber + 1 == 1 ||
                                  props.devMode
                                    ? () => {
                                        buttonCLick();
                                        setlevData(data1);
                                        onStartClick(
                                          data1.Puzzles[0].prompt.PromptAudio
                                        );
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
                                  width: "8em",
                                  height: "9em",
                                  // padding: 10,
                                  // objectFit: "contain",
                                }}
                                onClick={
                                  props.devMode
                                    ? () => {
                                        buttonCLick();
                                        setlevData(data1);
                                        onStartClick(
                                          data1.Puzzles[0].prompt.PromptAudio
                                        );
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
                          width: "8em",
                          height: "9em",
                          // padding: 10,
                          // objectFit: "contain",
                        }}
                        onClick={() => {
                          buttonCLick();
                          setlevData(data1);
                          onStartClick(data1.Puzzles[0].prompt.PromptAudio);
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
                          background: `url(${getImagePath() + "mapIcon.png"})`,
                          backgroundPosition: 25,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          width: "8em",
                          height: "9em",
                          // padding: 10,
                          // objectFit: "contain",
                        }}
                        onClick={
                          props.devMode
                            ? () => {
                                buttonCLick();
                                setlevData(data1);
                                onStartClick(
                                  data1.Puzzles[0].prompt.PromptAudio
                                );
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
              // data.LevelMeta.LevelType == "LetterInWord" ? true : false
              props.editorData ? levData.LevelType : levData.LevelMeta.LevelType
            }
            promptVisibility={
              // data.LevelMeta.PromptType == "Visible" ? true : false
              promptTextVisibilty
            }
            puzzles={levData.Puzzles}
            startPlaying={startPlaying}
            stopPlaying={stopPlaying}
            playAudio={playAudio}
            nextLevel={nextLevel}
            monsterRef={monsterRef}
            lengthOfCurrentLevel={lengthOfCurrentLevel}
            editorData={props.editorData}
            feedbackTexts={props.feedbackTexts}
            feedbackAudios={props.feedbackAudios}
            generalData={props.generalData}
            levelNumber={levData.LevelMeta.LevelNumber}
            allLevelScreen={allLevelScreen}
            devMode={props.devMode}
          />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              ref={monsterRef}
              style={{
                width: "300px",
                height: "100px",
                bottom: "35%",
                position: "absolute",
              }}
            >
              <AnimationType type="idle" />
            </div>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default SlideComponent;
