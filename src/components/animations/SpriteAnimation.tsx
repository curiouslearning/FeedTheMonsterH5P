import React from "react";
import Spritesheet from "react-responsive-spritesheet";
import eatingspSheet from "../../assets/images/eating1.png";
import spit from "../../assets/images/eating1.png";

var spritesheetobj: Spritesheet;
const SpriteAnimationComponent = (props: any) => {
  const { spImage, nFrames, height ,width} = props;
  return (
    <Spritesheet
      direction={`forward`}
      image={spImage}
      widthFrame={width?width:768}
      heightFrame={height ? height :662}
      steps={7}
      loop={true}
      fps={5}
      onInit={(spritesheet) => {
        console.log("onInit");
        spritesheetobj = spritesheet;
      }}
    />
  );
};
export { spritesheetobj };
export { SpriteAnimationComponent };
