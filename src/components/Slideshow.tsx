import { removeData } from 'jquery';
import React, { useState } from 'react';
import styled from 'styled-components';
import { MovingBackGroundComponent } from "./MovingBackground";
import cloud from "../../assets/images/cloud_v01.png";

import SlideComponent from './Slide';
import { getImagePath } from '../app';

let img = [
    "https://i.pinimg.com/originals/02/f3/49/02f34932a4f0ea1e70ad703e769bf41e.jpg",
    "https://www.triedandtrueblog.com/wp-content/uploads/2015/10/Feed-The-Monster-Halloween-Game-7.jpg",
    "https://mykidcraft.com/images/monster-game-colour-lego-preschool281566712.jpg",
    "https://i.pinimg.com/originals/02/f3/49/02f34932a4f0ea1e70ad703e769bf41e.jpg",
    "https://i.pinimg.com/originals/02/f3/49/02f34932a4f0ea1e70ad703e769bf41e.jpg",
    "https://i.pinimg.com/originals/02/f3/49/02f34932a4f0ea1e70ad703e769bf41e.jpg"
]

const NavWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 16px;
`

const NavButton = styled.button`
    border-radius: 2em;
    background: ${props => props.disabled ? "#d7d7d7" : "#1a73d9"};
    color: ${props => props.disabled ? "#7a7a7a" : "#FFF"};
    border: none;
    padding: 8px 16px;

    &:hover {
        cursor: ${props => props.disabled ? 'cancel' : 'pointer'};
        box-shadow: ${props => props.disabled ? '' : ''};
    }
`
let nextToggle = true
const initialTime = 10;

const Slideshow = (props: any) => {
    const { data } = props;
    const [activeSlide, setActiveSlide] = useState(0);
    const [strt, setStrt] = useState(true);
    const handleNav = (direction: number) => {
        const newSlide = activeSlide + direction;
        nextToggle = !nextToggle
        if (newSlide >= 0 && newSlide < data.length) {
            setActiveSlide(newSlide);
            setStrt(nextToggle);
        } else if (newSlide < 0) {
            setActiveSlide(data.length - 1);
            setStrt(nextToggle)
        } else {
            setActiveSlide(0);
            setStrt(nextToggle)
        }
    }
    console.log(data)
    console.log(props)
    console.log(activeSlide)
    console.log(data[activeSlide])
    return (
        <div>
            <MovingBackGroundComponent bgImage={getImagePath()+'cloud_v01.png'} />
            <SlideComponent data={data[activeSlide]} level= {data} images={img[activeSlide]} contentId={props.contentId} started={strt} time={initialTime} nextLevel={handleNav} editorData={props.editorData} feedbackTexts={props.feedbackTexts} generalData={props.generalData} 
            devMode= {props.devMode}/>
            <NavWrapper>
                <NavButton onClick={() => handleNav(-1)} disabled={data.length < 2}>
                    Back
                </NavButton>
                <NavButton onClick={() => handleNav(1)} disabled={data.length < 2}>
                    Next
                </NavButton>
            </NavWrapper>
        </div>
    );
}

export default Slideshow;