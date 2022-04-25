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
const Wrapper = styled.div`
  height: 600px;
  width: 100%;
  position: relative;
  color: "black";
`;
const Popup = styled.div`
  width: 50%;
  
  height: 60%;+0.
  position: relative;
  background-image: url(${(props) => props.title});
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  display: block;
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

  // document.body.addEventListener("mousemove", function () {
  //   introSound.play()
  // })
  return (
    <Wrapper>
      <audio id="soundtrack" src={introMusic}></audio>
      <img
        src={getImagePath() + "background.png"}
        style={{
          position: "absolute",
          width: "100%",
          height: "600px",
          zIndex: -2,
        }}
      ></img>
      <img
        src={getImagePath() + "title.png"}
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
      <div
        ref={monsterRef}
        style={{
          width: "300px",
          height: "100px",
          zIndex: -2,
          top: 20,
          position: "relative",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
          margin: "auto",
          display: "block",
        }}
      >
        <AnimationType type="idle" />
      </div>

      {popUpStatus ? (
        <Popup title={getImagePath() + "popup_bg_v01.png"}>
          <ClosePopup
            title={getImagePath() + "close_btn.png"}
            onClick={(e) => {
              buttonCLick().play();
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
          <div
            style={{
              position: "relative",
              height: 250,
              width: 250,
              backgroundImage: `url(${getImagePath() + "Avatar_04.png"})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
              display: "block",
            }}
            onClick={() => {
              buttonCLick().play();
              selectPLayer.pause();
              props.wrapper.get(0).appendChild(props.element);
              render(
                <Slideshow
                  data={props.config}
                  contentId={props.contentId}
                  editorData={props.editorData}
                  feedbackTexts={props.feedbackPhrases}
                />,
                props.element
              );
            }}
          ></div>
        </Popup>
      ) : (
        <img
          src={getImagePath() + "Play_button.png"}
          onClick={() => {
            buttonCLick().play();
            selectPLayer.play();
            setPopUpStatus(true);
          }}
          style={{
            width: 250,
            height: 250,
            position: "relative",
            top: "150px",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            margin: "auto",
            display: "block",
          }}
        ></img>
      )}
    </Wrapper>
  );
};

export default SelectProfile;
