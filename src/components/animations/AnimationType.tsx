import React from "react";
import Spritesheet from "react-responsive-spritesheet";
import eatingspSheet from "../../../assets/images/eating12.png";
import spit from "../../../assets/images/spit.png";
import egg from "../../../assets/images/eggAnimation.png";
import happy from "../../../assets/images/happy.png";
import sad from "../../../assets/images/sad.png";
import idle from "../../../assets/images/idle.png";
import { SpriteAnimationComponent } from "./SpriteAnimation";
import { getImagePath } from "../../app";

var spritesheetobj: Spritesheet;
const AnimationType = (props: any) => {
  const animationType = props.type;
  const internalPhaseNo=props.getPhaseCharNo+1;
  console.log(props.getPhaseCharNo)
  console.log(internalPhaseNo)
  console.log(props.type);
  console.log(getImagePath()+'idle1'+internalPhaseNo+'.png')
  switch (props.type) {
    case "eat": {
      return <SpriteAnimationComponent spImage={getImagePath()+'eat1'+internalPhaseNo+'.png'} nFrames={18} />;
    }
    case "spit": {
      return <SpriteAnimationComponent spImage={getImagePath()+'spit1'+internalPhaseNo+'.png'}  nFrames={18} />;
    }
    
    case "idle": {
      return <SpriteAnimationComponent spImage={getImagePath()+'idle1'+internalPhaseNo+'.png'} nFrames={18} />;
    }
    case "happy": {
      return (
        <SpriteAnimationComponent spImage={getImagePath()+'happy1'+internalPhaseNo+'.png'} nFrames={11} height={662}/>
      );
    }
    case "sad": {
      return (
        <SpriteAnimationComponent spImage={getImagePath()+'sad1'+internalPhaseNo+'.png'} nFrames={11} height={662} />
      );
    }
    case "profile": {
      return (
        <SpriteAnimationComponent spImage={getImagePath()+'idle14.png'} nFrames={11} height={1080} />
      );
    }
    default: {
      return <SpriteAnimationComponent spImage={getImagePath()+'egg.png'} nFrames={18} />;
    }
  }
};

export default AnimationType;