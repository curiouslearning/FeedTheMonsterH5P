import React, { useState } from 'react';
import './puzzel-bar.css';
import classNames from 'classnames';

const PuzzelBar = (props: any) => {

  const { activeIndicators,  setActiveIndicator } = PuzzelBarHook();
  const puzzels = [];

  for(let i = 0; i < props.puzzelCount; i++) {
    puzzels.push(<div className={classNames('completed-puzzel', {'active-indicator' : i < activeIndicators})} key={i}></div>)
  }

  return <div className='puzzel-indicator-container'>
    {
      puzzels.map((element, index) => {
        return element;
      })
    }
  </div>;
}

export const PuzzelBarHook = () => {
  
  const [activeIndicators, setActiveIndicator] = useState(2);
  return { activeIndicators, setActiveIndicator }
}

export default PuzzelBar;


