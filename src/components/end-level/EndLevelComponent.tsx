import React, { useEffect, useState } from "react";
import { SpriteAnimationContainer } from "../animations/SpriteAnimationContainer";
import mapBg from "../../../assets/images/map_btn.png";
import retryBg from "../../../assets/images/retry_btn.png";
import star from "../../../assets/images/star.png";
import loseBg from "../../../assets/images/Lose_bg.png";
import winBg from "../../../assets/images/WIN_screen_bg.png";
import "./EndLevelComponent.css";
import { buttonCLick, getImagePath } from "../../app";

const EndLevelComponent = (props: any) => {
  const { score, lengthOfCurrentLevel,levelsCompleted } = props;
  console.log(score);

  console.log(Math.ceil(lengthOfCurrentLevel / 2) * 100);
  return (
    <div
      className="bg-left"
      style={{
        backgroundColor: "black",
        height: "100%",
        width: "100%",
        position: "absolute",
      }}
    >
      <div
        className="end-level-container"
        style={{
          backgroundImage: `url(${getImagePath() + "WIN_screen_bg.png"})`,
          backgroundSize: "contains",
          width: "24em",
          height: "100%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="rating">
          {score > 100 ? (
            <div className="star">
              <img src={getImagePath() + "star.png"} alt="star" />
            </div>
          ) : null}
          {score > 200 ? (
            <div className="star">
              <img src={getImagePath() + "star.png"} alt="star" />
            </div>
          ) : null}
          {score > 400 ? (
            <div className="star">
              <img src={getImagePath() + "star.png"} alt="star" />
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", flex: 1 }}>
          <SpriteAnimationContainer type={score > 200 ? "happy" : "sad"} getPhaseCharNo={levelsCompleted} />
        </div>
        <HomeAndRestartComponent props={props} />
      </div>
    </div>
  );
};

export default EndLevelComponent;

export const HomeAndRestartComponent = (props: any) => {
  const [scaleCloseBtn, setScaleCloseBtn] = useState(1);
  const [scaleNextBtn, setScaleNextBtn] = useState(1);
  const [scaleRestartBtn, setScaleRestartBtn] = useState(1);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        alignItems: "center",
        transform: `scale(${scaleCloseBtn})`,
        position: "relative",
        width: "100%",
        justifyContent: "space-around",
        flex: 1,
      }}
    >
      <div
        onClick={(e) => {
          buttonCLick().play();
          props.props.allLevelScreen();
          setScaleNextBtn(0.9);
          setTimeout(() => {
            setScaleNextBtn(1);
          }, 200);
        }}
        style={{
          backgroundImage: `url(${getImagePath() + "map_btn.png"})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          height: 90,
          width: 80,
          transform: `scale(${scaleNextBtn})`,
        }}
      ></div>
      {props.props.score > 100 ? (
        <div
          onClick={(e) => {
            buttonCLick().play();
            props.props.nextLevel();
            setScaleNextBtn(0.9);
            setTimeout(() => {
              setScaleNextBtn(1);
            }, 200);
          }}
          style={{
            backgroundImage: `url(${getImagePath() + "next_btn.png"})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            height: 90,
            width: 80,
            transform: `scale(${scaleNextBtn})`,
          }}
        ></div>
      ) : null}
      <div
        onClick={(e) => {
          buttonCLick().play();
          props.props.onClickRestart();
          setScaleRestartBtn(0.9);
          setTimeout(() => {
            setScaleRestartBtn(1);
          }, 200);
        }}
        style={{
          backgroundImage: `url(${getImagePath() + "retry_btn.png"})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          height: 90,
          width: 80,
          transform: `scale(${scaleRestartBtn})`,
        }}
      ></div>
    </div>
  );
};