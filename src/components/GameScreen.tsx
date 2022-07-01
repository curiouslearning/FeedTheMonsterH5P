import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { getImagePath } from "../app";
import AnimationType from "./animations/AnimationType";
import useWindowDimensions from "./common/GetWindowDimensions";
import PauseMenu from "./pause-menu/PauseMenu";
import { base64Images } from "./profile/SelectProfile";
import Progress from "./progress-bar/progress";
import PromptText from "./prompt-text/PromptText";
import PuzzelBar from "./puzzel-bar/PuzzelBar";
import ScoreBoard from "./score-board/ScoreBoard";
import SuccessText from "./success-text/SuccessText";
class GameScreen extends React.Component {
  render() {
    return (
      <div
        id="13"
        style={{
          overflow: "hidden",
          height: '600px',
          width: '600px',
          display: "flex",
          zIndex: 3,
          backgroundSize: "100% 100%",
          flexDirection: "column",
          backgroundImage: `url(${
            base64Images.get("background.png")
              ? base64Images.get("background.png")
              : getImagePath() + "background.png"
          })`,
        }}
      >
        <div
          className="pause_menu"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          <PuzzelBar puzzelCount={4} activeIndicators={2} />
          {true ? (
            <>
              <ScoreBoard levelNumber={2} levelCount={2} />
            </>
          ) : (
            <></>
          )}
          <PauseMenu
            onClickPauseMenu={() => {
              // buttonCLick();
              // onClickPauseMenu();
            }}
          />
        </div>
        <Progress done={(10).toString()} />
        <div
          style={{
            display: "flex",
            flex: 5,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          className="game_play"
        >
          <div
            style={{
              display: "flex",
              alignItems: "start",
              margin: "0 auto",
              flexDirection: "column",
            }}
          >
            <PromptText
              IsGamePlay={(status: any) => {
                //   !gameStatus ? playAUDIO(getAudioPath() + "StonesAppear.mp3") : null;
                //   gameStatus = status;
              }}
              letter={"a"}
              audioUrl={""}
              isAudioPlaying={true}
              textVisbility={true}
              levelType={"word"}
              generalData={""}
              targetedLetters={"b"}
            />
            <SuccessText word={"Hai"} />
          </div>
          <div
            style={{
              width: "22em",
              display: "flex",
              alignItems: "end",
              position: "relative",
              bottom: "20%",
              zIndex: 5,
              flex: 1,
              margin: "0 auto",
            }}
          >
            <AnimationType type="idle" getPhaseCharNo={3} />
          </div>
        </div>
        {/* <div
          style={{
            display: "flex",
            flex: 2,
            zIndex: 4,
            backgroundImage: `url(${getImagePath() + "hill.png"})`,
            backgroundSize: "100% 110%",
            backgroundRepeat: "no-repeat",
            position: "relative",
            width: "110%",
            left: "-5%",
          }}
        ></div> */}
      </div>
    );
  }
}
export default GameScreen;
