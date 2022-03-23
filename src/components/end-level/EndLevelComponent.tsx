import React, { useEffect, useState } from "react";
import { SpriteAnimationContainer } from "../animations/SpriteAnimationContainer";
import mapBg from "../../../assets/images/map_btn.png";
import retryBg from "../../../assets/images/retry_btn.png";
import star from "../../../assets/images/star.png";
import "./EndLevelComponent.css";

const EndLevelComponent = (props: any) => {
  const { score, lengthOfCurrentLevel } = props;
  return (
    <>
      {score === lengthOfCurrentLevel * 100 ? (
        <div className="end-level-container">
          <div className="rating">
            <div className="star">
              <img src={star} alt="star" />
            </div>
            <div className="star">
              <img src={star} alt="star" />
            </div>
            <div className="star">
              <img src={star} alt="star" />
            </div>
          </div>
          <SpriteAnimationContainer type="happy" />
          <HomeAndRestartComponent props={props} />
        </div>
      ) : score >= Math.ceil(lengthOfCurrentLevel / 2) * 100 ? (
        /*2 start */

        <div className="end-level-container">
          <div className="rating">
            <div className="star">
              <img src={star} alt="star" />
            </div>
            <div className="star">
              <img src={star} alt="star" />
            </div>
          </div>
          <SpriteAnimationContainer type="happy" />
          <HomeAndRestartComponent props={props} />
        </div>
      ) : score <= 100 ? (
        <div className="end-level-container">
          <SpriteAnimationContainer type="sad" top={20} />
          <HomeAndRestartComponent props={props} />
        </div>
      ) : (
        <div className="end-level-container">
          <div className="rating">
            <div className="star">
              <img src={star} alt="star" />
            </div>
          </div>
          <SpriteAnimationContainer type="sad" top={20} />
          <HomeAndRestartComponent props={props} />
        </div>
      )}
    </>
  );
};

export default EndLevelComponent;

export const HomeAndRestartComponent = (props: any) => {
  const [scaleCloseBtn, setScaleCloseBtn] = useState(1);
  const [scaleNextBtn, setScaleNextBtn] = useState(1);
  const [scaleRestartBtn, setScaleRestartBtn] = useState(1);
  console.log("restarrt......");
  console.log(props);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        alignItems: "flex-end",
        // width: "100%",
        transform: `scale(${scaleCloseBtn})`,
      }}
    >
      <div
        onClick={(e) => {
          props.props.nextLevel();
          setScaleNextBtn(0.9);
          setTimeout(() => {
            setScaleNextBtn(1);
          }, 200);
        }}
        style={{
          backgroundImage: `url(${mapBg})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          height: 90,
          width: 80,
          marginLeft: 10,
          transform: `scale(${scaleNextBtn})`,
        }}
      ></div>
      <div
        onClick={(e) => {
          props.props.onClickRestart();
          setScaleRestartBtn(0.9);
          setTimeout(() => {
            setScaleRestartBtn(1);
          }, 200);
        }}
        style={{
          backgroundImage: `url(${retryBg})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          height: 90,
          width: 80,
          marginLeft: 35,
          transform: `scale(${scaleRestartBtn})`,
        }}
      ></div>
    </div>
  );
};
