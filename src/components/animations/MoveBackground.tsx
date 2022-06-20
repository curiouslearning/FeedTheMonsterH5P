import React from "react";
const MovingBackGroundComponent = (props: any) => {
  const { bgImage } = props;
  return (
    <div
      className="cloud-css"
      style={{
        backgroundImage: `url(${bgImage})`,
        width: "210px",
        height: "110px",
        backgroundSize: "cover",
        position: "absolute",

        
      }}
    ></div>
  );
};
export { MovingBackGroundComponent };