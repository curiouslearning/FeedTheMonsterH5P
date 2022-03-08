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
import bg from "../../assets/images/bg.jpg";
import { url } from "inspector";
import AnimationType from "./animations/AnimationType";
import { Grid } from "@material-ui/core";

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
  const [isMenuPopup, setPauseMenu] = useState(false);
  const [score, setScore] = useState(0);

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
    setTimeout(() => {
      setLevelCount((preCount) => preCount + 1);
      setCorrectDrop(false);
      setProgressCount(initialTime);
      setActiveIndicator((pre) => pre + 1);
      setPromted(true);
      props.stopPlaying();
      props.playAudio();
    }, 4000);
  };

  const timer = () => {
    if (props.playing && !isMenuPopup) {
      setProgressCount((preValue) => preValue - 0.5);
    }
  };

  useEffect(() => {
    if (props.playing) {
      console.log("times");
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
      setTimeout(() => {
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

    return () => clearInterval(id);
  }, [
    currentProgressCount,
    props.start,
    props.playing,
    timeOver,
    correctDrop,
    isMenuPopup,
  ]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginInline: "50px",
          marginTop: "20px",
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
      <PromptText letter={props.puzzles[levelCount].prompt.PromptText} />
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
              setScore={(count: number) => {
                setScore(score + count);
              }}
            />
          </div>
        </DndProvider>
      )}
    </div>
  );
};

const SlideComponent = (props: any) => {
  const { data } = props;
  var audFile: string;
  const levels: Array<any> = data;
  const [playing, setPlaying] = useState(false);
  const [levData, setlevData] = useState(data);
  const [start, setStart] = useState(false);

  const stopPlaying = () => {
    if (playing) {
      setPlaying(false);
    }
  };

  useEffect(() => {
    setStart(false);
    return () => {
      if (playing || audio != null) {
        audio.pause();
      }
      audio = null;
      initialTime = 10;
      clearInterval(id);
      setPlaying(false);
    };
  }, [props.started]);

  const playAudio = () => {
    audio = new Audio("https://www.kozco.com/tech/piano2.wav");
    var playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // setPlaying(true);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
    audio.addEventListener("ended", () => {
      setPlaying(true);
    });
  };

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
      {levData.audio && levData.audio.length > 0 ? (
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
                      console.log('@',data1)
                      onStartClick();
                    }}
                  >
                    <div>
                      <h2>Click</h2>
                    </div>
                  </button>
                  <h2 style={{ color: "white" }}>
                    {data1.LevelMeta.LevelType}
                  </h2>
                </div>
              );
            })}
          </div>

          {/* <div
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              transform: "translateX(0px)",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                fontSize: "2.857em",
                color: "white",
              }}
            >
              {"Level - " + data.LevelNumber}
            </h1>
            <button
              onClick={() => onStartClick()}
              style={{ marginInline: "auto" }}
            >
              Start
            </button>
          </div> */}
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
              levData.LevelMeta.LevelType == "LetterInWord" ? true : false
            }
            promptVisibility={
              levData.LevelMeta.PromptType == "Visible" ? true : false
            }
            puzzles={levData.Puzzles}
            stopPlaying={stopPlaying}
            playAudio={playAudio}
            nextLevel={props.nextLevel}
            monsterRef={monsterRef}
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
