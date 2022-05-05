import React, { useState } from "react";
import { SpriteAnimationContainer } from "../animations/SpriteAnimationContainer";
import "./EndLevelComponent.css";
import { buttonCLick, getImagePath } from "../../app";
import { useAppDispatch } from "../../app/hooks/commonHook";
import { onClickRestart } from "../../app/redux/features/GameLevel1";

const EndLevelComponent = (props: any) => {
  
  const { score, totalPuzzleInCurrentLevel } = props;
 
  return (
    <>
      {score === totalPuzzleInCurrentLevel * 100 ? (
        <div
          className="end-level-container"
          style={{
            backgroundImage: `url(${getImagePath()+'WIN_screen_bg.png'})`,
            backgroundSize: "contains",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="bg-left"
            style={{
              backgroundColor: "black",
              height: "100%",
              width: "25%",
              position: "absolute",
              left: "-25%",
            }}
          ></div>
          <div
            className="bg-right"
            style={{
              backgroundColor: "black",
              height: "100%",
              width: "26%",
              position: "absolute",
              right: "25%",
            }}
          ></div>
          <div className="rating">
            <div className="star">
              <img src={getImagePath()+'star.png'} alt="star" />
            </div>
            <div className="star">
              <img src={getImagePath()+'star.png'} alt="star" />
            </div>
            <div className="star">
              <img src={getImagePath()+'star.png'} alt="star" />
            </div>
          </div>
          <SpriteAnimationContainer type="happy" top={27} left={2} />
          <HomeAndRestartComponent props={props} />
        </div>
      ) : score >= Math.ceil(totalPuzzleInCurrentLevel / 2) * 100 ? (
        /*2 start */

        <div
          className="end-level-container"
          style={{
            backgroundImage: `url(${getImagePath()+'WIN_screen_bg.png'})`,
            backgroundSize: "contains",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="bg-left"
            style={{
              backgroundColor: "black",
              height: "100%",
              width: "25%",
              position: "absolute",
              left: "-25%",
            }}
          ></div>
          <div
            className="bg-right"
            style={{
              backgroundColor: "black",
              height: "100%",
              width: "26%",
              position: "absolute",
              right: "25%",
            }}
          ></div>
          <div className="rating">
            <div className="star">
              <img src={getImagePath()+'star.png'} alt="star" />
            </div>
            <div className="star">
              <img src={getImagePath()+'star.png'} alt="star" />
            </div>
          </div>
          <SpriteAnimationContainer type="happy" top={27} left={2} />
          <HomeAndRestartComponent props={props} />
        </div>
      ) : score <= 100 ? (
        <div
          className="end-level-container"
          style={{
            backgroundImage: `url(${getImagePath()+'WIN_screen_bg.png'})`,
            backgroundSize: "contains",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="bg-left"
            style={{
              backgroundColor: "black",
              height: "100%",
              width: "25%",
              position: "absolute",
              left: "-25%",
            }}
          ></div>
          <div
            className="bg-right"
            style={{
              backgroundColor: "black",
              height: "100%",
              width: "26%",
              position: "absolute",
              right: "25%",
            }}
          ></div>
          <SpriteAnimationContainer type="sad" top={2} left={2} />
          <HomeAndRestartComponent props={props} />
        </div>
      ) : (
        <div
          className="end-level-container"
          style={{
            backgroundImage: `url(${getImagePath()+'WIN_screen_bg.png'})`,
            backgroundSize: "contains",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="bg-left"
            style={{
              backgroundColor: "black",
              height: "100%",
              width: "25%",
              position: "absolute",
              left: "-25%",
            }}
          ></div>
          <div
            className="bg-right"
            style={{
              backgroundColor: "black",
              height: "100%",
              width: "26%",
              position: "absolute",
              right: "25%",
            }}
          ></div>
          <div className="rating">
            <div className="star">
              <img src={getImagePath()+'star.png'} alt="star" />
            </div>
          </div>
          <SpriteAnimationContainer type="sad" top={2} left={2} />
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

  const dispatch = useAppDispatch();

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
        left: "10%",
        top: "20%",
      }}
    >
      <div
        onClick={(e) => {
          buttonCLick().play()
          props.props.nextLevel();
          setScaleNextBtn(0.9);
          setTimeout(() => {
            setScaleNextBtn(1);
          }, 200);
        }}
        style={{
          backgroundImage: `url(${getImagePath()+'map_btn.png'})`,
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
          buttonCLick().play()
          dispatch(onClickRestart());
          setScaleRestartBtn(0.9);
          setTimeout(() => {
            setScaleRestartBtn(1);
          }, 200);
        }}
        style={{
          backgroundImage: `url(${getImagePath()+'retry_btn.png'})`,
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
