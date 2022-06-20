import React from "react";
import fantastic from "../../../assets/images/Fantastic_01.png";
import great from "../../../assets/images/Great_01.png";
import { opacity } from "../prompt-text/PromptText";

const SuccessText = (props: any) => {
  // return opacity == 0 ? <div className='ans-pop-up' style={{height: "70px", backgroundImage: props.word ==  'Fantastic!' ?`url(${fantastic})`:`url(${great})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", marginLeft: "30%"}}>
  // </div>: <div></div>;
  return (
    <div
      className="ans-pop-up"
      style={{
        margin: "auto",
        display: "flex",
        width: "300px",
        height: "10px",
        justifyContent: "center",
        marginTop: "4px",
        background: "",
      }}
    >
      <p
        className="ans-pop-up-text"
        style={{ fontSize: "3.0em", textAlign: "center" }}
      >
        {props.word}
      </p>
    </div>
  );
};

export default SuccessText;
