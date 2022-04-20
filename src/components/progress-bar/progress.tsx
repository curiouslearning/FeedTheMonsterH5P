import React from 'react';
import './progress.css';
import emptyTimer from '../../../assets/images/timer_empty.png';
import timer from '../../../assets/images/timer.png';
import { getImagePath } from '../../app';

const Progress = ({done} : {done : string}) => {

  const { style } = ProgressHooks(done);

  return (
    <div className='time-container'>
        {/* <div className='timer' style={{backgroundImage: `url(${timer})`, backgroundRepeat: "no-repeat", backgroundSize: "contain"}}></div> */}
        <div className="progress" style={{backgroundImage: `url(${getImagePath()+'timer_empty.png'})`, transform: "scale(3.4,2.3)", backgroundRepeat: "no-repeat", backgroundSize: "contain"}}>
          <div className="progress-done" style={style}></div>
        </div>
    </div>
  );
}

const ProgressHooks = (done: string) => {
  const [style, setStyle] = React.useState({});  

  const decrementBar = () => {
      setTimeout(() => {
      const newStyle = {
          opacity: 1,
          height: 15,
          width: `${done}%`
      }
      
      setStyle(newStyle);
      }, 200);
  }

  decrementBar();

  return { style }; 
}

export default Progress;

