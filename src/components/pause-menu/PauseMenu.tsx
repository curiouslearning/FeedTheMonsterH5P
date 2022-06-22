import React, { useState } from "react";
import "./pause-menu.css";
import pauseBg from "../../../assets/images/pause_v01.png";
import { buttonCLick, getImagePath } from "../../app";
import { base64Images } from "../profile/SelectProfile";
// import { ScaleButton } from '../common/ScaleButton';

const PauseMenu = (props: any) => {
  const [scale, setScale] = useState(1);
  return (
    <div
      className="menu"
      onClick={() => {
        buttonCLick()
        props.onClickPauseMenu();
        setScale(0.9);
        setTimeout(() => {
          setScale(1);
        }, 200);
      }}
      style={{
        backgroundImage: `url(${
          base64Images.get('pause_v01.png')
            ? base64Images.get('pause_v01.png')
            : getImagePath() + 'pause_v01.png'
        })`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        transform: `scale(${scale})`,
      }}
    ></div>
  );
};

export default PauseMenu;
