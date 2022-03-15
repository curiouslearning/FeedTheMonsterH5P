import React from 'react';
import './score-board.css'
import scoreBoardBg from '../../../assets/images/score_v01.png';
const ScoreBoard = (props: any) => {

  return <div className='score-board' style={{backgroundImage: `url(${scoreBoardBg})`, backgroundSize: "contain", backgroundRepeat: "no-repeat"}}>
      <h3>{props.score}</h3>
  </div>;
}

export default ScoreBoard;
