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
let screenOrientation = window.screen.orientation.type;
export const data: Map<any, any> = new Map<any, any>();
export const base64Images = data;
import ReactLoading from "react-loading";
import { useMediaQuery } from "react-responsive";
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
  const [loading, setLoading] = useState(false);
  const monsterRef = useRef();
  const introSound = new Audio(getAudioPath() + "intro.wav");
  const selectPLayer = new Audio(getAudioPath() + "select_player.WAV");
  const introMusic = getAudioPath() + "intro.wav";
  // document.body.addEventListener("mousemove", function () {
  //   introSound.play()
  // })
  const [changeOrient, setChangeOrient] = useState(false);
  function ImageToBase64(url: any, callback: any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }
  function importAll(r: any) {
    console.log("**********");
    let images = {};
    r.keys().map((item: any, index: any) => {
      if (!data.has(item.replace("./", ""))) {
        ImageToBase64(getImagePath() + item, function (dataUrl: any) {
          data.set(item.replace("./", ""), dataUrl);
          if (r.keys().length == data.size) {
            setLoading(true);
          }
        });
      }
    });
  }
  importAll(
    require.context("../../../assets/images/", false, /\.(png|jpe?g|svg)$/)
  );
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
  if (isBigScreen) {
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
  }
  const onCLickExit = () => {
    let exitBtnId = document.getElementById("exitButton");
    document.exitFullscreen();
    exitBtnId.style.display = "none";
  };

  return (
    <Wrapper>
      <ExitScreenButton />
      <div id={!changeOrient ? "turn" : "notTurn"}>
        <audio id="soundtrack" src={introMusic}></audio>
        <img
          src={
            base64Images.get("background.png")
              ? base64Images.get("background.png")
              : getImagePath() + "background.png"
          }
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: -2,
            backgroundSize: "100% 100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        ></img>
        {!loading ? (
          <ReactLoading
            type="spokes"
            color="#34eb37"
            height={300}
            width={300}
          />
        ) : (
          <div>
            <img
              src={
                base64Images.get("title.png")
                  ? base64Images.get("title.png")
                  : getImagePath() + "title.png"
              }
              style={{
                position: "relative",
                width: "80%",
                height: 100,
                top: "5%",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
                margin: "auto",
                display: "block",
                zIndex: -2,
              }}
            ></img>
            {isBigScreen ? (
              <div
                ref={monsterRef}
                style={{
                  width: "300px",
                  height: "100px",
                  zIndex: -2,
                  top: "57vh",
                  position: "relative",
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                  margin: "auto",
                  display: "block",
                }}
              >
                <AnimationType type="profile" />
              </div>
            ) : (
              <div
                ref={monsterRef}
                style={{
                  width: "300px",
                  height: "100px",
                  zIndex: -2,
                  top: "36vh",
                  position: "relative",
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                  margin: "auto",
                  display: "block",
                }}
              >
                <AnimationType type="profile" />
              </div>
            )}
            {popUpStatus ? (
              <Popup
                title={
                  base64Images.get("popup_bg_v01.png")
                    ? base64Images.get("popup_bg_v01.png")
                    : getImagePath() + "popup_bg_v01.png"
                }
              >
                <ClosePopup
                  title={
                    base64Images.get("close_btn.png")
                      ? base64Images.get("close_btn.png")
                      : getImagePath() + "close_btn.png"
                  }
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
                    backgroundImage: `url(${
                      base64Images.get("Avatar_04.png")
                        ? base64Images.get("Avatar_04.png")
                        : getImagePath() + "Avatar_04.png"
                    })`,
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
            ) : (
              <img
                src={
                  base64Images.get("Play_button.png")
                    ? base64Images.get("Play_button.png")
                    : getImagePath() + "Play_button.png"
                }
                onClick={() => {
                  buttonCLick();
                  selectPLayer.play();
                  setPopUpStatus(true);
                }}
                style={{
                  width: 250,
                  height: 250,
                  position: "relative",
                  top: "-150px",
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                  margin: "auto",
                  display: "block",
                }}
              ></img>
            )}
          </div>
        )}
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
