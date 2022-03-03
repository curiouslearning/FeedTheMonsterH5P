import React from 'react';
import './score-board.css'

const ScoreBoard = (props: any) => {

  return <div className='score-board'>
      <h3>{props.score}</h3>
  </div>;
}

export default ScoreBoard;
