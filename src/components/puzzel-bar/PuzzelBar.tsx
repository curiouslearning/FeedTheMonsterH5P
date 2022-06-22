import React, { useState } from "react";
import "./puzzel-bar.css";
import classNames from "classnames";
import indicatorBg from "../../../assets/images/puzzle_indicator.png";
import emptyBarBg from "../../../assets/images/bar_empty_v01.png";
import fullBarBg from "../../../assets/images/bar_full_v01.png";
import { getImagePath } from "../../app";
import { base64Images } from "../profile/SelectProfile";

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
        backgroundImage: `url(${
          base64Images.get('puzzle_indicator.png')
            ? base64Images.get('puzzle_indicator.png')
            : getImagePath() + 'puzzle_indicator.png'
        })`,
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
                ? `url(${
                  base64Images.get('bar_full_v01.png')
                    ? base64Images.get('bar_full_v01.png')
                    : getImagePath() + 'bar_full_v01.png'
                })`
                : `url(${
                  base64Images.get('bar_empty_v01.png')
                    ? base64Images.get('bar_empty_v01.png')
                    : getImagePath() + 'bar_empty_v01.png'
                })`,
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
