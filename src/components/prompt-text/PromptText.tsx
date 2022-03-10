import React from "react";
import AudioComponent from "../common/AudioComponent";

const PromptText = (props: any) => {
  const { playing, setPlaying, playAudio } = AudioComponent();

  const textVisbility = props.textVisbility;
  console.log("Prompt", textVisbility);
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
        margin: "auto",
        display: "flex",
        width: "100px",
        height: "60px",
        justifyContent: "center",
        marginTop: "20px",
        background: "grey",
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
