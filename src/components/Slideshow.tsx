import React, { useState } from 'react';
import { MovingBackGroundComponent } from "./MovingBackground";
import SlideComponent from './Slide';
import { getImagePath } from '../app';
import { Provider } from 'react-redux';
import { store } from '../app/store';

const initialTime = 10;

const Slideshow = (props: any) => {
    
    const { data } = props;

    const [strt, setStrt] = useState(true);

    const nextLevel = () => {
        
        setStrt(false);
    }

    return (
        <Provider store={store}>
            <div>
                <MovingBackGroundComponent bgImage={getImagePath()+'cloud_v01.png'} />
                <SlideComponent data={data[0]} level= {data} contentId={props.contentId} time={initialTime} editorData={props.editorData} nextLevel={nextLevel} feedbackTexts={props.feedbackTexts} 
                devMode= {props.devMode}/>
            </div>
        </Provider>
    );
}

export default Slideshow;