import React, { useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import styled from "styled-components";
import bg from "../../../assets/images/background.png";
import popupBg from "../../../assets/images/popup_bg_v01.png";
import avatarIcon from "../../../assets/images/Avatar_04.png";
import introMusic from "../../../assets/audio/intro.wav";
import selectPlayer from "../../../assets/audio/select_player.WAV";
import Slideshow from "../Slideshow";
import closeBtnBg from "../../../assets/images/close_btn.png";
import title from "../../../assets/images/title.png";
import playButton from "../../../assets/images/Play_button.png";
import AnimationType from "../animations/AnimationType";
import { getAudioPath, getImagePath, buttonCLick } from "../../app";
import ScreenOrientation from "../OnScreenRotation/ScreenOrietation";
import ExitScreenButton from "../ExitScreenButtton/ExitScreenButton";
import { useMediaQuery } from "react-responsive";
let screenOrientation = window.screen.orientation.type;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`;
const Popup = styled.div`
  margin: auto;
  height: 300px;
  width: 300px;
  background-image: url(${(props) => props.title});
  background-size: contain;
  z-index: 9;
`;
const Avatar = styled.div`
  position: relative;

  height: 250px;
  width: 250px;
  background-image: url(${(props) => props.title});
  background-size: contain;
  background-repeat: no-repeat;
  justify-content: center;
  align-item: center;
  margin: auto;
  display: block;
`;
const ClosePopup = styled.div`
  position: relative;

  left: 5%;

  height: 60px;
  width: 60px;
  background-image: url(${(props) => props.title});
  background-size: contain;
  background-repeat: no-repeat;
  justify-content: center;
  align-item: center;
`;

const SelectProfile = (props: any) => {
  const [popUpStatus, setPopUpStatus] = useState(false);
  const monsterRef = useRef();
  const introSound = new Audio(getAudioPath() + "intro.wav");
  const selectPLayer = new Audio(getAudioPath() + "select_player.WAV");
  const introMusic = getAudioPath() + "intro.wav";
  const [changeOrient, setChangeOrient] = useState(false);
  window.addEventListener("orientationchange", function (event) {
    let id;
    if (this.window.screen.orientation.type !== screenOrientation) {
      id = document.getElementById("turn");
      console.log("change1");
      id.style.display = "none";
      // changeOrient = false;
      setChangeOrient(true);
    } else {
      id = document.getElementById("notTurn");
      setChangeOrient(false);
      console.log("change2");
      id.style.display = "block";
      // changeOrient = true;
    }
  });

  const isBigScreen = useMediaQuery({
    query: "(min-width: 650px) and (min-height: 900px)",
  });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 525px)" });
  const onCLickExit = () => {
    let exitBtnId = document.getElementById("exitButton");
    document.exitFullscreen();
    exitBtnId.style.display = "none";
  };
  return (
    <Wrapper>
      <ExitScreenButton />
      <div id={!changeOrient ? "turn" : "notTurn"}>
        <div
          style={{
            backgroundImage: `url(${getImagePath() + "bg.jpg"})`,
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundSize: "100% 100%",
            zIndex: 1,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {popUpStatus ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                zIndex: 10,
                top: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                background: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <Popup title={getImagePath() + "popup_bg_v01.png"}>
                <ClosePopup
                  title={getImagePath() + "close_btn.png"}
                  onClick={(e) => {
                    buttonCLick();
                    setPopUpStatus(false);
                  }}
                ></ClosePopup>
                <h1
                  style={{
                    position: "relative",
                    fontSize: 22,
                    fontWeight: "bold",
                    fontFamily: "Oxygen",
                    color: "white",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                    margin: "auto",
                    display: "block",
                  }}
                >
                  Select your Player
                </h1>
                <div>
                  <button
                    style={{
                      position: "relative",
                      top: "20",
                      justifyContent: "center",
                      textAlign: "center",
                      alignItems: "center",
                      margin: "auto",
                      display: "block",
                      border: "solid",
                      width: 150,
                      height: 25,
                    }}
                    onClick={() => {
                      selectPLayer.pause();
                      props.wrapper.get(0).appendChild(props.element);
                      render(
                        <Slideshow
                          data={props.config}
                          contentId={props.contentId}
                          editorData={props.editorData}
                          feedbackTexts={props.feedbackPhrases}
                          feedbackAudios={props.feedbackAudios}
                          generalData={props.generalData}
                          devMode={true}
                        />,
                        props.element
                      );
                    }}
                  >
                    {" "}
                    Developer Mode
                  </button>
                </div>
                <div
                  style={{
                    position: "relative",
                    height: 150,
                    width: 150,
                    backgroundImage: `url(${getImagePath() + "Avatar_04.png"})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                    display: "block",
                  }}
                  onClick={() => {
                    buttonCLick();
                    selectPLayer.pause();
                    props.wrapper.get(0).appendChild(props.element);
                    render(
                      <Slideshow
                        data={props.config}
                        contentId={props.contentId}
                        editorData={props.editorData}
                        feedbackTexts={props.feedbackPhrases}
                        feedbackAudios={props.feedbackAudios}
                        generalData={props.generalData}
                        devMode={props.devMode}
                      />,
                      props.element
                    );
                  }}
                ></div>
              </Popup>
            </div>
          ) : null}
          <img
            src={getImagePath() + "title.png"}
            style={{
              zIndex: 1,
              position: "relative",
              width: "80%",
              height: 100,
              display: "flex",
              top: "5%",
              flex: 1,
              margin: "auto",
            }}
          ></img>
          <img
            src={getImagePath() + "Play_button.png"}
            onClick={() => {
              buttonCLick();
              selectPLayer.play();
              setPopUpStatus(true);
            }}
            style={{
              zIndex: 1,
              width: 250,
              height: 250,
              display: "flex",
              margin: "auto",
              left: 0,
              right: 0,
              flex: 2,
            }}
          ></img>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              transform: "scale(0.5)",
              zIndex: "inherit",
              position: "relative",
              flex: 1,
              transformOrigin: "top",
            }}
          >
            <AnimationType type="profile" />
          </div>
          <div
            id="hill"
            style={{
              backgroundImage: `url(${getImagePath() + "hill.png"})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              height: "50%",
              width: "110%",
              position: "absolute",
              left: "-5%",
              bottom: 0,
            }}
          >
            <div
              id="totem"
              style={{
                backgroundImage: `url(${getImagePath() + "Totem1.png"})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                height: "100%",
                width: "80%",
                position: "relative",
                backgroundPosition: "right",
                right: "-20%",
                top: "-55%",
                zIndex: -3,
              }}
            ></div>

            <div
              style={{
                backgroundImage: `url(${getImagePath() + "fence.png"})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                height: "100%",
                width: "100%",
                position: "absolute",
                left: "-36%",
                top: "-43%",
                transform: "scale(.7) rotate(-37deg)",
                zIndex: -3,
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>
      </div>
      {changeOrient ? (
        <div>
          <ScreenOrientation />
        </div>
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

export default SelectProfile;
