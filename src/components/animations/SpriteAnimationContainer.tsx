import React from "react";
import AnimationType from "./AnimationType";
export const SpriteAnimationContainer = (props: any) => {
  return (
    <div
      style={{
        width: "300px",
        height: "100px",
        top: "50%",
        left: "30%",
        position: "absolute",
      }}
    >
      <AnimationType type={props.type} />
    </div>
  );
};
