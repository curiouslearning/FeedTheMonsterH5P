import React, { useState } from "react";
import "./pause-button.css";
import { buttonCLick, getImagePath } from "../../app";
import { useAppDispatch } from "../../app/hooks/commonHook";
import { onClickPauseButton } from "../../app/redux/features/GameLevel1";
import { stoneDraggingCurrently } from "../../app/redux/features/DragAndDropStones";

const PauseButton = (props: any) => {
  const [scale, setScale] = useState(1);

  const dispatch = useAppDispatch();
  
  return (
    <div
      className="menu"
      onClick={() => {
        buttonCLick().play()
        dispatch(onClickPauseButton())
        dispatch(stoneDraggingCurrently(false))
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
