import './SampleAnimation.css';
import img from '../../../assets/images/eat12.png'
import img1 from '../../../assets/images/eat13.png';
import img2 from '../../../assets/images/eat14.png';
import { useState } from 'react';
import React from 'react';
import { getImagePath } from "../../app";

const SampleAnimation=(props:any) =>{
  console.log(props.imgs)
  console.log(props)
  const [monster, setMonster] = useState(getImagePath()+'eat12'+'.png');
  console.log(monster)
  return (
    // <div style={{overflow:'auto',height:'200px',width:'200px'}}>
    <div>
      {/* <button onClick={() => {
        setMonster(img);
        setTimeout(() => {
          setMonster(img1);
        }, 2000)
      }}>change Img</button> */}
      <div className='monster' style={{background: `transparent url(${props.imgs}) 0 0 no-repeat`}}></div>
    </div>
    // </div>
  );
}
export default SampleAnimation;