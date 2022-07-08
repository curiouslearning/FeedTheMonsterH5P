import { Route, Link, BrowserRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import GameScreen from "./GameScreen";
import useWindowDimensions from "./common/GetWindowDimensions";
import Screen1 from "./screen1";
import Screen2 from "./Screen2";
import LevelFields from "./constants/constants";
import { base64Images } from "./profile/SelectProfile";
import { getImagePath } from "../app";
import PuzzelBar from "./puzzel-bar/PuzzelBar";
import ScoreBoard from "./score-board/ScoreBoard";
import PauseMenu from "./pause-menu/PauseMenu";
import Progress from "./progress-bar/progress";
var gameStatus = true;
var timerInterval: any;
const LevelController = (props: any) => {
  const timerComponent: any = document.getElementsByClassName("progress-done");
  const [levelIndex, setLevelIndex] = useState(0);
  const timer = () => {
    var initialTimer = 100;
    if (timerInterval == undefined) {
      timerInterval = setInterval(() => {
        if (gameStatus) {
          if (initialTimer > 0) {
            timerComponent[0].style.width =
              (initialTimer -= 0.2).toString() + "%";
          } else {
            clearInterval(timerInterval);
          }
        }
      }, 15);
    }
  };
  timer();
  const { height, width } = useWindowDimensions();
  var levelFields = new LevelFields(
    props.data.LevelMeta.LevelNumber,
    props.data.LevelMeta.LevelType,
    props.data.LevelMeta.PromptType,
    props.data.LevelMeta.LevelGroup,
    props.data.LevelMeta.PromptFadeout,
    props.data.Puzzles[levelIndex],
    props.data.Puzzles
  );
  return (
    <div
      className="LevelController"
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
          activeIndicators={levelIndex}
        />
        {true ? (
          <>
            <ScoreBoard levelNumber={props.data.LevelNumber} levelCount={2} />
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
      <GameScreen
        fields={levelFields}
        props={props}
        currentLevelIndex={levelIndex}
        onDrag={(value: any) => {
          if (value == true) {
            clearInterval(timerInterval);
            timerInterval = undefined;
            gameStatus = false;
          }
        }}
        onComplete={(value: any) => {
          if (value == true) {
            timer();
            setLevelIndex(levelIndex + 1);
            gameStatus = true;
          }
        }}
      />
    </div>
  );
};

export default LevelController;
