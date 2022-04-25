import { url } from "inspector";
import React, { useState } from "react";
import AudioComponent from "../common/AudioComponent";
import textBg from "../../../assets/images/promptTextBg.png";
import { css, keyframes } from "styled-components";
import { getImagePath } from "../../app";

export let opacity = 1;

const PromptText = (props: any) => {
  const { playing, setPlaying, playAudio } = AudioComponent();

  const textVisbility = props.textVisbility;
  const levelType = props.levelType;
  const letter = props.letter;
  let highlightText = "";
  let nonHighlightText = "";
  if (levelType == "LetterInWord") {
    highlightText = letter.slice(0, 1);
    nonHighlightText = letter.slice(1, letter.length);
  }

  return (
    <div
      onClick={playAudio}
      className="ans-pop-up"
      style={{
        ...{
          margin: "auto",
          marginTop: "-20px",
          display: "flex",
          backgroundImage: `url(${getImagePath() + "promptTextBg.png"})`,
          width: "163px",
          height: "152px",
          backgroundSize: "contain",
          justifyContent: "center",
          alignItems: "center",
        },
        ...{ opacity: opacity },
      }}
    >
      {textVisbility ? (
        <p
          className="ans-pop-up-text"
          style={{ fontSize: "1.857em", textAlign: "center" }}
        >
          {levelType == "LetterInWord" ? (
            <>
              <span style={{ color: "red" }}>{highlightText}</span>
              <span>{nonHighlightText}</span>
            </>
          ) : (
            props.letter
          )}
        </p>
      ) : (
        <p style={{ fontSize: "1.857em", textAlign: "center" }}>▶️</p>
      )}
    </div>
  );
};

export default PromptText;

export const PromptTextHook = () => {
  const disappearPromptText = () => {
    opacity = 0;

    setTimeout(() => {
      opacity = 1;
    }, 3000);
  };

  return { disappearPromptText };
};
