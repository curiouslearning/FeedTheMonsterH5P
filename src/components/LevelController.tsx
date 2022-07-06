import { Route, Link, BrowserRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import GameScreen from "./GameScreen";
import useWindowDimensions from "./common/GetWindowDimensions";
import Screen1 from "./screen1";
import Screen2 from "./Screen2";
import LevelFields from "./constants/constants";
var levelIndex = 0;

const LevelController = (props: any) => {
  console.log("!!!!!", props);
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
    <Screen1
      fields={levelFields}
      props={props}
      levelIndexIncrement={(value: number) => {
        levelIndex = value;
      }}
      currentLevelIndex={levelIndex}
    />
  );
};

export default LevelController;
