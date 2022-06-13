import React, { useRef, useState } from "react";
import { render } from "react-dom";
import styled from "styled-components";
import Slideshow from "../Slideshow";
import AnimationType from "../animations/AnimationType";
import { getAudioPath, getImagePath, buttonCLick } from "../../app";
import ScreenOrientation from '../../components/ScreenOrietation';
let screenOrientation=window.screen.orientation.type;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const Popup = styled.div`
  height: 50%;
  width: 50%;
  z-index: 9;
  display: flex;
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
  height: 60px;
  width: 60px;
  background-image: url(${(props) => props.title});
  background-size: contain;
  background-repeat: no-repeat;
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
  const [changeOrient, setChangeOrient] = useState(false);
window.addEventListener('orientationchange', function(event) {
    let id;
    if(this.window.screen.orientation.type !== screenOrientation) {
        id = document.getElementById("turn");
        console.log("change1")
        id.style.display="none";
        // changeOrient = false;
        setChangeOrient(true); 
        } else {
            id = document.getElementById("notTurn");
            setChangeOrient(false);
            console.log("change2")
            id.style.display="block";
            // changeOrient = true;
        }
    }
);
  return (
    <Wrapper>
      <div id = {!changeOrient ? "turn" : "notTurn"}>
        <audio id="soundtrack" src={introMusic}></audio>
        <div 
          style={{
            backgroundImage: `url(${getImagePath() + 'bg.jpg'})`, 
            height: "100vh", 
            backgroundSize: "100% 100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start"
          }}>
          <img
            src={getImagePath() + "title.png"}
            style={{
              width: "100%",
              height: "100px",
              objectFit: "contain"
            }}
          /> 
          <div
            ref={monsterRef}
            style={{
              width: "300px",
              height: "100px"
            }}
            >
            <AnimationType type="profile" />
          </div>
          {popUpStatus ? (
            <Popup>
              <div
                style={{
                  backgroundImage: `url(${getImagePath() + "popup_bg_v01.png"})`,
                  width: "100%",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  <ClosePopup
                    title={getImagePath() + "close_btn.png"}
                    onClick={(e) => {
                      buttonCLick();
                      setPopUpStatus(false);
                    }}
                  />
                  <h1
                style={{
                  
                }}
                >
                Select your Player
              </h1>
              <div>
                <button
                  style={{
                   
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
              <img
                src={getImagePath() + "Avatar_04.png"}
                style={{
                  width: "40%",
                  height: "40%",
                  objectFit: "contain"
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
              ></img>
              </div>
                
              

              {/* <ClosePopup
                title={getImagePath() + "close_btn.png"}
                onClick={(e) => {
                  buttonCLick();
                  setPopUpStatus(false);
                }}
              />
              <h1
                style={{
                  
                }}
                >
                Select your Player
              </h1>
              <div>
                <button
                  style={{
                   
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
              ></div>  */}
            </Popup>
          ) : (
            <img
              src={getImagePath() + "Play_button.png"}
              onClick={() => {
                buttonCLick();
                selectPLayer.play();
                setPopUpStatus(true);
              }}
              style={{
                height: "200px",
                marginTop: "300px"
              }}
            ></img>
          )}
        </div>
      {/* <div
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
        <AnimationType type="profile" />
      </div>

      {popUpStatus ? (
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
      ) : (
        <img
          src={getImagePath() + "Play_button.png"}
          onClick={() => {
            buttonCLick();
            selectPLayer.play();
            setPopUpStatus(true);
          }}
          style={{
            width: 250,
            height: 250,
            position: "relative",
            top: "130px",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            margin: "auto",
            display: "block",
          }}
        ></img>
      )} */}
       </div>
       { changeOrient ? <div>
            <ScreenOrientation/>
            </div> : <></> }
    </Wrapper>
  );
};

export default SelectProfile;
