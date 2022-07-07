import { Route, Link, BrowserRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import GameScreen from "./GameScreen";
import useWindowDimensions from "./common/GetWindowDimensions";
import Screen1 from "./screen1";
import Screen2 from "./Screen2";
import LevelFields from "./constants/constants";
import { base64Images } from "./profile/SelectProfile";
import { getImagePath } from "../app";
var levelIndex = 0;

const LevelController = (props: any) => {
  var element = document.getElementsByClassName("LevelController");
  console.log("******", element[1]);
  if (!!element[1]) {
    element[1].parentNode.removeChild(element[1]);
  }
  const { height, width } = useWindowDimensions();
  console.log("!!!!!Level");
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
      <GameScreen
        fields={levelFields}
        props={props}
        levelIndexIncrement={(value: number) => {
          levelIndex = value;
        }}
        currentLevelIndex={levelIndex}
      />
    </div>
  );
};

export default LevelController;
