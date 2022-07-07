import React, { useEffect, useState } from "react";
import useWindowDimensions from "./common/GetWindowDimensions";
import LevelFields from "./constants/constants";
import LevelController from "./LevelController";
import Progress from "./progress-bar/progress";
import Screen2 from "./Screen2";
const Screen1 = (props: {
  fields: LevelFields;
  props: any;
  levelIndexIncrement: Function;
  currentLevelIndex: number;
}) => {
  const { height, width } = useWindowDimensions();
  const [screen1, setScreen1] = useState(false);
  console.log("*******", props.fields._puzzle.prompt.PromptText);
  return !screen1 ? (
    <div
      style={{
        height: height,
        width: width,
        backgroundColor: "red",
      }}
    >
      <button
        onClick={() => {
          props.levelIndexIncrement(props.currentLevelIndex + 1);
          setScreen1(true);
        }}
      >
        Hai
      </button>
      <Progress done="1" />
    </div>
  ) : (
    <LevelController data={props.props.data} />
  );
};
export default Screen1;
