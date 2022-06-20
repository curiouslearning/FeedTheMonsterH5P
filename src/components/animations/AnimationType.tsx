import React from "react";
import Spritesheet from "react-responsive-spritesheet";
import eatingspSheet from "../../../assets/images/eating12.png";
import spit from "../../../assets/images/spit.png";
import egg from "../../../assets/images/eggAnimation.png";
import happy from "../../../assets/images/happy.png";
import sad from "../../../assets/images/sad.png";
import idle from "../../../assets/images/idle.png";
import { SpriteAnimationComponent } from "./SpriteAnimation";
// import { getImagePath } from "../../app";
import {
  EAT11,
  EAT12,
  EAT13,
  EAT14,
  HAPPY11,
  HAPPY12,
  HAPPY13,
  HAPPY14,
  IDLE11,
  IDLE12,
  IDLE13,
  IDLE14,
  SAD11,
  SAD12,
  SAD13,
  SAD14,
  SPIT11,
  SPIT12,
  SPIT14,
} from "../../data/base64Assets";

var spritesheetobj: Spritesheet;
const AnimationType = (props: any) => {
  const animationType = props.type;
  const internalPhaseNo = props.getPhaseCharNo + 1;
  console.log(props.getPhaseCharNo);
  console.log(internalPhaseNo);
  console.log(props.type);
  console.log('@@@@@@@@@',internalPhaseNo);
  // console.log(getImagePath()+'idle1'+internalPhaseNo+'.png')
  switch (props.type) {
    case "eat": {
      return (
        <SpriteAnimationComponent
          spImage={
            internalPhaseNo == 1
              ? EAT11
              : internalPhaseNo == 2
              ? EAT12
              : internalPhaseNo == 3
              ? EAT13
              : EAT14
          }
          nFrames={18}
        />
      );
    }
    case "spit": {
      return (
        <SpriteAnimationComponent
          spImage={
            internalPhaseNo == 1
              ? SPIT11
              : internalPhaseNo == 2
              ? SPIT12
              : internalPhaseNo == 3
              ? SPIT12
              : SPIT14
          }
          nFrames={18}
        />
      );
    }

    case "idle": {
      return (
        <SpriteAnimationComponent
          spImage={
            internalPhaseNo == 1
              ? IDLE11
              : internalPhaseNo == 2
              ? IDLE12
              : internalPhaseNo == 3
              ? IDLE13
              : IDLE14
          }
          nFrames={18}
        />
      );
    }
    case "happy": {
      return (
        <SpriteAnimationComponent
          spImage={
            internalPhaseNo == 1
              ? HAPPY11
              : internalPhaseNo == 2
              ? HAPPY12
              : internalPhaseNo == 3
              ? HAPPY13
              : HAPPY14
          }
          nFrames={11}
          height={662}
        />
      );
    }
    case "sad": {
      return (
        <SpriteAnimationComponent
          spImage={
            internalPhaseNo == 1
              ? SAD11
              : internalPhaseNo == 2
              ? SAD12
              : internalPhaseNo == 3
              ? SAD13
              : SAD14
          }
          nFrames={11}
          height={662}
        />
      );
    }
    case "profile": {
      return (
        <SpriteAnimationComponent spImage={IDLE14} nFrames={11} height={1080} />
      );
    }
    default: {
      return <SpriteAnimationComponent spImage={"egg.png"} nFrames={18} />;
    }
  }
};

export default AnimationType;
