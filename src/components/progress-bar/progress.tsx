import React, { useState } from "react";
import "./progress.css";
import emptyTimer from "../../../assets/images/timer_empty.png";
import timer from "../../../assets/images/timer.png";
import { getImagePath } from "../../app";
import { base64Images } from "../profile/SelectProfile";

const Progress = ({ done }: { done: string }) => {
  const [progressBarValue, setProgressBarValue] = useState(10);
  console.log()
  setTimeout(() => {
    if (progressBarValue >= 0) {
      setProgressBarValue(progressBarValue - 0.5);
    }
  }, 800);
  const { style } = ProgressHooks((progressBarValue * 10).toString());

  return (
    <div className="time-container">
      {/* <div className='timer' style={{backgroundImage: `url(${timer})`, backgroundRepeat: "no-repeat", backgroundSize: "contain"}}></div> */}
      <div
        className="progress"
        style={{
          backgroundImage: `url(${
            base64Images.get("timer_empty.png")
              ? base64Images.get("timer_empty.png")
              : getImagePath() + "timer_empty.png"
          })`,
          width: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "relative",
            width: "100%",
          }}
        >
          <div
            style={{
              backgroundImage: `url(${
                base64Images.get("timer.png")
                  ? base64Images.get("timer.png")
                  : getImagePath() + "timer.png"
              })`,
              width: "2.5em",
              height: "3.0em",
              display: "flex",
              flex: 1,
              position: "relative",
              top: "-1em",
              left: "1em",
              padding: "10px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          ></div>
          <div style={{ display: "flex", flex: 8 }}>
            <div className="progress-done" style={style}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgressHooks = (done: string) => {
  const [style, setStyle] = React.useState({});

  const decrementBar = () => {
    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        height: 25,
        width: `${done}%`,
      };

      setStyle(newStyle);
    }, 200);
  };

  decrementBar();

  return { style };
};

export default Progress;
