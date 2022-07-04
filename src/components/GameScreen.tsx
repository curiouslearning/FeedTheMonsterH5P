import React, { useEffect, useState } from "react";
import { getImagePath } from "../app";
import AnimationType from "./animations/AnimationType";
import useWindowDimensions from "./common/GetWindowDimensions";
import classNames from "classnames";
import PauseMenu from "./pause-menu/PauseMenu";
import { base64Images } from "./profile/SelectProfile";
import Progress from "./progress-bar/progress";
import PromptText from "./prompt-text/PromptText";
import PuzzelBar from "./puzzel-bar/PuzzelBar";
import ScoreBoard from "./score-board/ScoreBoard";
import SuccessText from "./success-text/SuccessText";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
var gameRunningStatus = true;

const GameScreen = (props: any) => {
  const { height, width } = useWindowDimensions();
  const [levelCount, setLevelCount] = useState(0);
  const [progressBarValue, setProgressBarValue] = useState(10);
  const [activeIndicators, setActiveIndicators] = useState(
    props.data.Puzzles.length
  );
  const [animationType, setAnimationType] = useState("idle");

  setTimeout(() => {
    if (gameRunningStatus) {
      setProgressBarValue(progressBarValue - 0.5);
    }
  }, 800);
  const correctAnswer = () => {};
  const wrongAnswer = () => {};
  
  return (
    <div
      style={{
        overflow: "hidden",
        height: height,
        width: width,
        display: "flex",
        zIndex: 3,
        backgroundSize: "100% 100%",
        flexDirection: "column",
        backgroundImage: `url(${
          base64Images.get("background.png")
            ? base64Images.get("background.png")
            : getImagePath() + "background.png"
        })`,
      }}
    >
      <div
        className="pause_menu"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <PuzzelBar
          puzzelCount={props.data.Puzzles.length - 1}
          activeIndicators={activeIndicators}
        />
        {props.devMode ? (
          <>
            <ScoreBoard levelNumber={props.levelNumber} levelCount={2} />
          </>
        ) : (
          <></>
        )}
        <PauseMenu
          onClickPauseMenu={() => {
            // buttonCLick();
            // onClickPauseMenu();
          }}
        />
      </div>
      <Progress done={(progressBarValue * 10).toString()} />
      <div
        style={{
          display: "flex",
          flex: 5,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        className="game_play"
      >
        <div
          style={{
            display: "flex",
            alignItems: "start",
            margin: "0 auto",
            flexDirection: "column",
          }}
        >
          <PromptText
            IsGamePlay={(status: any) => {
              //   !gameStatus ? playAUDIO(getAudioPath() + "StonesAppear.mp3") : null;
              //   gameStatus = status;
            }}
            letter={props.data.Puzzles[levelCount].prompt.PromptText}
            audioUrl={""}
            isAudioPlaying={true}
            textVisbility={true}
            levelType={"word"}
            generalData={props.generalData}
            targetedLetters={"b"}
          />
          <SuccessText word={"Hai"} />
        </div>
        <div
          style={{
            display: "grid",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              gridColumn: 1,
              gridRow: 1,
              zIndex: 2,
              width: "120px",
              height: "150px",
              margin: "auto",
            }}
          >
            <DropTarget
              onHit={(e: any) => {
                gameRunningStatus = false;
                setActiveIndicators(activeIndicators - 1);
                console.log("dropped", e.containerElem.innerText);

                e.containerElem.innerText ==
                props.data.Puzzles[levelCount].prompt.PromptText
                  ? setAnimationType("eat")
                  : setAnimationType("spit");
                setTimeout(() => {
                  setProgressBarValue(0);
                  setLevelCount((preCount) => preCount + 1);
                  setProgressBarValue(10);
                  setAnimationType("idle");
                  gameRunningStatus = true;
                }, 4000);
              }}
              targetKey="box"
              dropData={{ name: props.name }}
            >
              <div
                onClick={() => {}}
                style={{
                  border: "solid",
                  width: "120px",
                  height: "150px",
                  zIndex: 5,
                }}
              ></div>
            </DropTarget>
          </div>
          <div
            style={{
              gridColumn: 1,
              gridRow: 1,
              transform: "scale(0.4)",
              position: "relative",
              bottom: "10%",
            }}
          >
            <AnimationType type={animationType} getPhaseCharNo={3} />
          </div>
        </div>
        {gameOptions(props.data.Puzzles[levelCount])}
      </div>
    </div>
  );
};

const gameOptions = (options: any) => {
  return options.foilstones.map((item: any, index: any) => {
    return (
      <div className={classNames("ball" + index)}>
        <DragDropContainer
          targetKey="box"
          dragData={"ball" + index}
          // customDragElement={customDragElement}
          onDragStart={(e: any) => {
            // playAUDIO(getAudioPath() + "onDrag.mp3");
          }}
          onDrag={() => console.log("dragging")}
          onDragEnd={() => console.log("end")}
          onDrop={(e: any) => console.log(e)}
        >
          <div
            className={classNames("ball" + index)}
            style={{
              backgroundImage: `url(${
                base64Images.get("stone_pink_v02.png")
                  ? base64Images.get("stone_pink_v02.png")
                  : getImagePath() + "stone_pink_v02.png"
              })`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
            key={index}
          >
            <p className="stones-letter">{item.StoneText}</p>
          </div>
        </DragDropContainer>
      </div>
    );
  });
};
export default GameScreen;
