import React, { useState } from 'react';
import './puzzel-bar.css';
import classNames from 'classnames';

const PuzzelBar = (props: any) => {

  const { puzzelsIndicators } = PuzzelBarHook(props.puzzelCount, props.activeIndicators);
  const puzzels = puzzelsIndicators();
  return <div className='puzzel-indicator-container'>
    {
      puzzels.map((element: any, index: any) => {
        return element;
      })
    }
  </div>;
}

export const PuzzelBarHook = (puzzelCount: any, activeIndicators: any) => {
  
  const puzzels: any = [];
  const puzzelsIndicators = () => {
    for(let i = 0; i < puzzelCount; i++) {
      puzzels.push(<div className={classNames('completed-puzzel', {'active-indicator' : i < activeIndicators})} key={i}></div>)
    }

    return puzzels;
  }
  return { puzzelsIndicators }
}

export default PuzzelBar;


