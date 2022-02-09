import React from "react";
import Spritesheet from "react-responsive-spritesheet";
import eatingspSheet from "../../../assets/images/eating1.png";
import spit from  "../../../assets/images/spit.png";
import egg from "../../../assets/images/eggAnimation.png"
import idle from "../../../assets/images/idle.png"
import { SpriteAnimationComponent } from "./SpriteAnimation";

var spritesheetobj: Spritesheet;
const AnimationType = (props: any) => {
  const animationType = props.type;
  console.log(props.type)
  switch(props.type){
      case 'eat':{
        return( <SpriteAnimationComponent spImage={eatingspSheet} nFrames={18} />)
      }
      case 'spit':{
        return <SpriteAnimationComponent spImage={spit} nFrames={18} />
      }
      case 'idle':{
        return <SpriteAnimationComponent spImage={idle} nFrames={18} />
      }
      default:{
          return <SpriteAnimationComponent spImage={egg} nFrames={18} />
      }
  }
};

export default AnimationType;
