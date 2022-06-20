import React, { useEffect, useState } from "react";
import { SpriteAnimationContainer } from "../animations/SpriteAnimationContainer";
import mapBg from "../../../assets/images/map_btn.png";
import retryBg from "../../../assets/images/retry_btn.png";
import star from "../../../assets/images/star.png";
import loseBg from "../../../assets/images/Lose_bg.png";
import winBg from "../../../assets/images/WIN_screen_bg.png";
import "./EndLevelComponent.css";
import { buttonCLick } from "../../app";
import { MAP_BTN, NEXT_BTN, RETRY_BTN, STAR, WIN_SCREEN_BG } from "../../data/base64Assets";

const EndLevelComponent = (props: any) => {
  const { score, lengthOfCurrentLevel, levelsCompleted } = props;
  console.log(score);

  console.log(Math.ceil(lengthOfCurrentLevel / 2) * 100);
  return (
    <div
      className="bg-left"
      style={{
        backgroundColor: "black",
        height: "100vh",
        width: "100%",
        position: "absolute",
      }}
    >
      <div
        className="end-level-container"
        style={{
          backgroundImage: `url(${WIN_SCREEN_BG})`,
          backgroundSize: "contains",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="rating">
          {score > 100 ? (
            <div className="star">
              <img src={STAR} alt="star" />
            </div>
          ) : null}
          {score > 200 ? (
            <div className="star">
              <img src={STAR} alt="star" />
            </div>
          ) : null}
          {score > 400 ? (
            <div className="star">
              <img src={STAR} alt="star" />
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", flex: 1 }}>
          <SpriteAnimationContainer
            type={score > 200 ? "happy" : "sad"}
            getPhaseCharNo={levelsCompleted}
          />
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
          buttonCLick();
          props.props.allLevelScreen();
          setScaleNextBtn(0.9);
          setTimeout(() => {
            setScaleNextBtn(1);
          }, 200);
        }}
        style={{
          backgroundImage: `url(${MAP_BTN})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          height: 90,
          width: 80,
          transform: `scale(${scaleNextBtn})`,
        }}
      ></div>

      <div
        onClick={(e) => {
          buttonCLick();
          props.props.onClickRestart();
          setScaleRestartBtn(0.9);
          setTimeout(() => {
            setScaleRestartBtn(1);
          }, 200);
        }}
        style={{
          backgroundImage: `url(${RETRY_BTN})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          height: 90,
          width: 80,
          transform: `scale(${scaleRestartBtn})`,
        }}
      ></div>
      {props.props.score > 200 ? (
        <div
          onClick={(e) => {
            buttonCLick();
            props.props.nextLevel();
            setScaleNextBtn(0.9);
            setTimeout(() => {
              setScaleNextBtn(1);
            }, 200);
          }}
          style={{
            backgroundImage: `url(${NEXT_BTN})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            height: 90,
            width: 80,
            transform: `scale(${scaleNextBtn})`,
          }}
        ></div>
      ) : null}
    </div>
  );
};
