import React, { Component } from 'react';
import { getAudioPath, getImagePath, buttonCLick } from "../../app";
const ScreenOrientation=()=>{
return(
    <div
    style={{
      height:"600px",
    }}>
       
          {/* <img
        src={getImagePath() + "background.png"}
        style={{
          position: "absolute",
          width: "100%",
          height: "600px",
          zIndex: -2,
         color:"white",
         fontWeight: "bold",
         fontFamily: "Oxygen",
         margin: "auto",
         display: "block",
         
        }}
      ></img>  */}
       {/* <h1
       style={{
           position:"relative",
        fontSize: 50,
        justifyContent: "center",
        textAlign: "center",
        fontWeight: "bold",
              fontFamily: "Oxygen",
              color: "white",
              height:"100px",
              textSizeAdjust:"large",
        
       }}
       >Please Rotate Your Device</h1>
         <div
        style={{
          width: "300px",
          height: "400px",
          zIndex: -1,
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
      </div>  */}
      <img
      src={getImagePath() + "onRotation.png"}
      style={{
        backgroundColor:"white",
        position: "absolute",
        width: "80%",
        height: "400px",
        zIndex: -2,
        top:"20%",
        left:"10%",
      //  color:"white",
      //  fontWeight: "bold",
      //  fontFamily: "Oxygen",
       margin: "auto",
       display: "block",
      }}></img>
    </div>
)
}
export default ScreenOrientation;