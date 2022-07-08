import React, { useState } from "react";
import "./progress.css";
import emptyTimer from "../../../assets/images/timer_empty.png";
import timer from "../../../assets/images/timer.png";
import { getImagePath } from "../../app";
const Progress = ({ done }: { done: string }) => {
  return (
    <div className="time-container">
      <div
        className="progress"
        style={{
          backgroundImage: `url(${getImagePath() + "timer_empty.png"})`,
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
              backgroundImage: `url(${getImagePath() + "timer.png"})`,
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
            <div className="progress-done"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
