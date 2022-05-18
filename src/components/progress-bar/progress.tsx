import React from "react";
import "./progress.css";
import emptyTimer from "../../../assets/images/timer_empty.png";
import timer from "../../../assets/images/timer.png";
import { getImagePath } from "../../app";

const Progress = ({ done }: { done: string }) => {
  const { style } = ProgressHooks(done);

  return (
    <div className="time-container">
      {/* <div className='timer' style={{backgroundImage: `url(${timer})`, backgroundRepeat: "no-repeat", backgroundSize: "contain"}}></div> */}
      <div
        className="progress"
        style={{
          backgroundImage: `url(${getImagePath() + "timer_empty.png"})`,
          width:'100%',
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <div 
          style={{
            backgroundImage: `url(${getImagePath() + "timer.png"})`,
            width:'2.5em',
            height: '3.0em',
            position: 'relative',
            top: '-1em',
            left: '1.2em',
            padding: '10px',
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}>
            {/* <div 
              className="timer-watch"
                style={{
                  backgroundImage: `url(${getImagePath() + "hr.png"})`,
                  width:'2.5em',
                  height: '3.0em',
                  position: 'relative',
                  top: '-1em',
                  left: '1.2em',
                  padding: '10px',
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                }}>
            </div> */}
        </div>
        <div className="progress-done" style={style}></div>
      </div>
    </div>
  );
};

const ProgressHooks = (done: string) => {
  const [style, setStyle] = React.useState({});

  const decrementBar = () => {
    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        height: 25,
        width: `${done}%`,
      };

      setStyle(newStyle);
    }, 200);
  };

  decrementBar();

  return { style };
};

export default Progress;
