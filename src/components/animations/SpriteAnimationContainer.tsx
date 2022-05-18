import React from "react";
import AnimationType from "./AnimationType";
export const SpriteAnimationContainer = (props: any) => {
  return (
    <div
      style={{
        width: "22em",
        display:"flex",
        alignItems:'center'
      }}
    >
      <AnimationType type={props.type} />
    </div>
  );
};
