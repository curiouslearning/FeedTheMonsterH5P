import React from "react";
import Spritesheet from "react-responsive-spritesheet";

var spritesheetobj: Spritesheet;
const SpriteAnimationComponent = (props: any) => {
  const { spImage, nFrames } = props;
  return (
    <Spritesheet
      direction={`forward`}
      image={spImage}
      widthFrame={768}
      heightFrame={1366}
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