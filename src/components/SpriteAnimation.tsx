import React from "react";
import "./app.css";
import Spritesheet from "react-responsive-spritesheet";

var spritesheetobj: Spritesheet;
const SpriteAnimationComponent = (props: any) => {
  const { spImage } = props;
  return (
    <Spritesheet
      direction={`forward`}
      image={spImage}
      widthFrame={1024}
      heightFrame={1024}
      steps={21}
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
