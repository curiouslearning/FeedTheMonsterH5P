import React from 'react';
import './progress.css';
import emptyTimer from '../../../assets/images/timer_empty.png';
import fullTimer from '../../../assets/images/timer_full.png';

const Progress = ({done} : {done : string}) => {

  const { style } = ProgressHooks(done);

  return (
    <div className='time-container'>
        <div className="progress" style={{backgroundImage: `url(${emptyTimer})`,transform: "scale(3.4,2.3)",backgroundRepeat: "no-repeat", backgroundSize: "contain"}}>
          {/* <div className="progress-done" style={{...style, ...{background: `url(${fullTimer})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", marginLeft: 39}}}></div> */}
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

