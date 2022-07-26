import React from "react";
import "./score-board.css";
import scoreBoardBg from "../../../assets/images/score_v01.png";
import { getImagePath } from "../../app";
const ScoreBoard = (props: any) => {
  return (
    <div
      className="score-board"
      style={{
        // backgroundImage: `url(${getImagePath() + "score_v01.png"})`,
        // backgroundSize: "contain",
        // backgroundRepeat: "no-repeat",
      }}
    >
       {/* <h3 style={{ textAlign: "center", fontSize: "2.1em" }}>{props.score}</h3> */}
    </div>
  );
};

export default ScoreBoard;
