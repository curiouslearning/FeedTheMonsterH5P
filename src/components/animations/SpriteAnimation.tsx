import React from "react";
import Spritesheet from "react-responsive-spritesheet";

var spritesheetobj: Spritesheet;
const SpriteAnimationComponent = (props: any) => {
  const { spImage, nFrames } = props;
  return (
    <Spritesheet
      direction={`forward`}
      style={{width:'100%',height:'100%',display:'inline-block'}}
      image={spImage}
      widthFrame={768}
      heightFrame={632}
      steps={nFrames}
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