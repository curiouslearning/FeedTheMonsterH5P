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
  console.log(props.type);
  switch (props.type) {
    case "eat": {
      return <SpriteAnimationComponent spImage={getImagePath()+'eating12.png'} nFrames={18} />;
    }
    case "spit": {
      return <SpriteAnimationComponent spImage={getImagePath()+'spit.png'} nFrames={18} />;
    }
    case "idle": {
      return <SpriteAnimationComponent spImage={getImagePath()+'idle.png'} nFrames={18} />;
    }
    case "happy": {
      return (
        <SpriteAnimationComponent spImage={getImagePath()+'happy.png'} nFrames={11} height={662} />
      );
    }
    case "sad": {
      return (
        <SpriteAnimationComponent spImage={getImagePath()+'sad.png'} nFrames={11} height={1080} />
      );
    }
    default: {
      return <SpriteAnimationComponent spImage={getImagePath()+'egg.png'} nFrames={18} />;
    }
  }
};

export default AnimationType;
