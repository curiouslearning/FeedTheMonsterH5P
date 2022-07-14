import React from "react";
import AnimationType from "./AnimationType";
export const SpriteAnimationContainer = (props: any) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        transform: "scale(0.5)",
      }}
    >
      <AnimationType type={props.type} getPhaseCharNo={props.getPhaseCharNo} />
    </div>
  );
};
