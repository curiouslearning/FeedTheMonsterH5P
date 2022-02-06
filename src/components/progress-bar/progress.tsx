import React from 'react';
import './progress.css';

const Progress = ({done} : {done : string}) => {

  const { style } = ProgressHooks(done);

  return (
    <div className='time-container'>
        <div className="progress">
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
          width: `${done}%`
      }
      
      setStyle(newStyle);
      }, 200);
  }

  decrementBar();

  return { style }; 
}

export default Progress;

