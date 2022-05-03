import React, { useState } from "react";
import "./pause-button.css";
import pauseBg from "../../../assets/images/pause_v01.png";
import { buttonCLick, getImagePath } from "../../app";
import { useAppDispatch } from "../../app/hooks/commonHook";
import { onClickPauseButton } from "../../app/redux/features/GameLevel1";
// import { ScaleButton } from '../common/ScaleButton';

const PauseButton = (props: any) => {
  const [scale, setScale] = useState(1);

  const dispatch = useAppDispatch();
  
  return (
    <div
      className="menu"
      onClick={() => {
        buttonCLick().play()
        dispatch(onClickPauseButton())
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
      }}
    ></div>
  );
};

export default PauseButton;
