import React, { useState } from "react";
import "./pause-menu.css";
import pauseBg from "../../../assets/images/pause_v01.png";
import { buttonCLick, getImagePath } from "../../app";
// import { ScaleButton } from '../common/ScaleButton';

const PauseMenu = (props: any) => {
  const [scale, setScale] = useState(1);
  return (
    <div
      className="menu"
      onClick={() => {
        buttonCLick().play()
        props.onClickPauseMenu();
        setScale(0.9);
        setTimeout(() => {
          setScale(1);
        }, 200);
      }}
      style={{
        backgroundImage: `url(${getImagePath()+'pause_v01.png'})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        transform: `scale(${scale})`,
        marginLeft: '9rem',
      }}
    ></div>
  );
};

export default PauseMenu;
