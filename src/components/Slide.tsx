import React, { useEffect, useRef, useState} from "react";
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
import { Grid } from "@material-ui/core";
import AudioComponent from "./common/AudioComponent";
import { SpriteAnimationContainer } from "./animations/SpriteAnimationContainer";
import SuccessText from './success-text/SuccessText';
import fantastic from '../../assets/audio/fantastic.WAV';
import great from '../../assets/audio/great.wav';

let audio: HTMLAudioElement = null;
let initialTime = 10;
let id: NodeJS.Timeout;
let timeoutId: NodeJS.Timeout;
const feedbackArray: any[] = ['Fantastic!', 'Great!']
// create HTMLAudioElement
const audioFantastic = new Audio(fantastic);
const audioGreat = new Audio(great);

const Wrapper = styled.div`
  height: 600px;
  width: 100%;
  position: relative;
`;

const DragDropComp = (props: any) => {
  console.log("!11111", props.promptVisibility);
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
      if (props.playing) {
        audio.pause();
      }
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
    if (isLevelEnded) return;
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
    score > 50 ? (
      <SpriteAnimationContainer type="happy" />
    ) : (
      <SpriteAnimationContainer type="sad" top={20} />
    )
  ) : (
    <div style={{display: "flex", flexDirection: "column"}}>
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
      <SuccessText word ={text}/>
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
                if(count == 100) {
                  const feedbackPhrase = feedbackArray[Math.floor(Math.random() * feedbackArray.length)];
                  setText(feedbackPhrase);
                  if(feedbackPhrase == 'Fantastic!')
                  {
                    audioFantastic.play();
                  }
                  else {
                    audioGreat.play();
                  }
                  setTimeout(function () {
                    setText('')
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

    console.log(data);
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
  return (
    <Wrapper>
      <img
        src={bg}
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
            backgroundImage: `url(${props.images})`,
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
                <div key={index} style={{ margin: 10 }}>
                  <button
                    style={{
                      width: 100,
                      height: 100,
                      backgroundColor: "wheat",
                      borderRadius: 100,
                    }}
                    onClick={() => {
                      setlevData(data1);

                      onStartClick();
                    }}
                  >
                    <div>
                      <h2>{index+1}</h2>
                    </div>
                  </button>
                  <h2 style={{ color: "white",textAlign:'center' }}>
                    {data1.LevelMeta.LevelType}
                  </h2>
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
            stopPlaying={stopPlaying}
            playAudio={playAudio}
            nextLevel={props.nextLevel}
            monsterRef={monsterRef}
            lengthOfCurrentLevel={lengthOfCurrentLevel}
            editorData={props.editorData}
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
