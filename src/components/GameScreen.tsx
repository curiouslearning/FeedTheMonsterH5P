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
  currentLevelIndex: number;
  onDrag: Function;
  onComplete: Function;
}) => {
  const { height, width } = useWindowDimensions();
  const [animationType, setAnimationType] = useState("idle");

  const correctAnswer = () => {};
  const wrongAnswer = () => {};

  return (
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
                props.onDrag(true);
                gameRunningStatus = false;
                e.containerElem.innerText ==
                props.fields._puzzle.prompt.PromptText
                  ? setAnimationType("eat")
                  : setAnimationType("spit");
                e.containerElem.style.visibility = "hidden";
                setTimeout(() => {
                  e.containerElem.style.visibility = "visible";
                  setAnimationType("idle");
                  gameRunningStatus = true;
                  props.onComplete(true);
                }, 4000);
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
  );
};

const gameOptions = (options: any) => {
  console.log("&&&&&&&&&&&&&");
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
