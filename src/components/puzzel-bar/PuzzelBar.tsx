import React, { useState } from "react";
import "./puzzel-bar.css";
import classNames from "classnames";
import indicatorBg from "../../../assets/images/puzzle_indicator.png";
import emptyBarBg from "../../../assets/images/bar_empty_v01.png";
import fullBarBg from "../../../assets/images/bar_full_v01.png";
import { BAR_EMPTY, BAR_FULL, PUZZLE_INDICATOR } from "../../data/base64Assets";

const PuzzelBar = (props: any) => {
  const { puzzelsIndicators } = PuzzelBarHook(
    props.puzzelCount,
    props.activeIndicators
  );
  const puzzels = puzzelsIndicators();
  return (
    <div
      className="puzzel-indicator-container"
      style={{
        backgroundImage: `url(${PUZZLE_INDICATOR})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: '100% 100%',
      }}
    >
      {puzzels.map((element: any, index: any) => {
        return element;
      })}
    </div>
  );
};

export const PuzzelBarHook = (puzzelCount: any, activeIndicators: any) => {
  const puzzels: any = [];
  const puzzelsIndicators = () => {
    for (let i = 0; i <= puzzelCount; i++) {
      puzzels.push(
        <div
          className={classNames("completed-puzzel", {
            "active-indicator": i < activeIndicators,
          })}
          key={i}
          style={{
            backgroundImage:
              i < activeIndicators
                ? `url(${BAR_FULL})`
                : `url(${BAR_EMPTY})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></div>
      );
    }

    return puzzels;
  };
  return { puzzelsIndicators };
};

export default PuzzelBar;
