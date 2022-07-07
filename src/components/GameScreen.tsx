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
import LevelFields from "./constants/constants";
import LevelController from "./LevelController";
var gameRunningStatus = true;

const GameScreen = (props: {
  fields: LevelFields;
  props: any;
  levelIndexIncrement: Function;
  currentLevelIndex: number;
}) => {
  const { height, width } = useWindowDimensions();

  const [gameScreen, setGameScreen] = useState(false);
  const [animationType, setAnimationType] = useState("idle");
  console.log("1111111111111");

  const correctAnswer = () => {};
  const wrongAnswer = () => {};

  return !gameScreen ? (
    <div
      className="GameScreen"
      style={{
        overflow: "hidden",
        height: height,
        width: width,
        display: "flex",
        zIndex: 3,
        backgroundSize: "100% 100%",
        flexDirection: "column",
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
          puzzelCount={props.fields._puzzles.length - 1}
          activeIndicators={
            props.fields._puzzles.length - props.currentLevelIndex
          }
        />
        {true ? (
          <>
            <ScoreBoard
              levelNumber={props.fields._levelNumber}
              levelCount={2}
            />
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
      <Progress done={(1).toString()} />
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
            letter={props.fields._puzzle.prompt.PromptText}
            audioUrl={""}
            isAudioPlaying={true}
            textVisbility={true}
            levelType={"word"}
            generalData={""}
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
                setGameScreen(true);
                gameRunningStatus = false;
                console.log("dropped", e.containerElem.innerText);
                props.levelIndexIncrement(props.currentLevelIndex + 1);
                // e.containerElem.innerText ==
                // props.fields._puzzle.prompt.PromptTextFeedTheMonster
                //   ? setAnimationType("eat")
                //   : setAnimationType("spit");
                // setTimeout(() => {
                //   setProgressBarValue(0);
                //
                //   setProgressBarValue(10);
                //   setAnimationType("idle");
                //   gameRunningStatus = true;
                // }, 4000);
              }}
              targetKey="box"
              dropData={{ name: props.fields._puzzle.prompt.PromptText }}
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
        {gameOptions(props.fields.Puzzle)}
      </div>
    </div>
  ) : (
    <LevelController data={props.props.data} />
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
