import React from "react";
import "./app.css";
import Spritesheet from "react-responsive-spritesheet";
import spsheet from "../../assets/images/spritesheet.png";

var spritesheetobj: Spritesheet;
const SpriteAnimationComponent = () => {
  return (
    <Spritesheet
      direction={`forward`}
      image={spsheet}
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
