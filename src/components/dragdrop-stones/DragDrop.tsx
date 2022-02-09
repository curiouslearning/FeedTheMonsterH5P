import React, { useEffect, useRef, useState } from "react";
import { SpriteAnimationComponent } from '../animations/SpriteAnimation';
import eatingspSheet from "../../../assets/images/eating1.png";
import './dragdrop-balls.css';
import classNames from "classnames";

let optionDataSet: { id: number; alphabet: string; }[] = []

const DragDrop = ({timeOver, answerDrop, startDrag, props, changePuzzel, levelCount} : {timeOver : boolean, answerDrop : Function, startDrag: boolean, props: any, changePuzzel: Function, levelCount: number}) => {

    let options = [props.targetstones[0], ...props.foilstones]

    const [dataList, setDataList] = useState(options);
    const [dragging, setDragging] = useState(false);
    const [dropped, setDropped] = useState(false);

    const dragItem = useRef();
    const dragId = useRef();

    const optionCollectData = (options: string | any[]) => {
        for (let i = 0; i< options.length; i++) {
            let incomingData = {
                id: 100,
                alphabet: ""
            }

            incomingData.id = i;
            incomingData.alphabet = options[i].StoneText;
            optionDataSet.push(incomingData);

        }
        setDataList(optionDataSet)
    }

    useEffect(() => {
        optionCollectData(options)
        return () => {
            options=[]
            optionDataSet=[]
        }
    }, [levelCount])

    const handleDragStart = (data: any, e: any, id: any ) => {
        dragItem.current = data;
        dragId.current = id;
        setTimeout(() => {
            setDragging(true);
        }, 0)
    }

    const handleDragEnd = () => {
        setDragging(false)
        dragItem.current = null;
    }

    const getStyles = (params: any, index: any) => {
        console.log(index)
        console.log(params)
        const currentItem = dragItem.current;
        if (currentItem == params) {
            let str = "no-ball"
            return str.concat(index.toString());
        }
        let str = "ball";
        return str.concat(index.toString());
    }

    const checkResult = (dropData: any) => {
        // console.log("hihihih")
        console.log(props.targetstones[0].StoneText, "resultin progress", dropData);
        let targetStone = props.targetstones[0].StoneText;
        if (targetStone === dropData) {
            optionDataSet.filter((item) => item.id != dragId.current)
            optionDataSet = [];
            setDropped(true);
            answerDrop();
            changePuzzel();
            setDropped(false);
        } else {
            // console.log("answer Incorrect");
            setDragging(false)
            dragItem.current = null;
        }
    }

    return (
        <>
            <div  style={{
                    width: '300px',
                    height: '100px',
                    top:'50%',
                    left:'30%',
                    position:'absolute'   
                }} onDragOver={(e) => {
                    console.log("onDragOver::")
                    e.stopPropagation();
                    e.preventDefault();
                }} onDrop={(e) => {
                    checkResult(e.dataTransfer.getData("item.alphabet"));
                    console.log("::onDrop")
                }}>
                
                <SpriteAnimationComponent spImage={eatingspSheet} nFrames={18} />
            </div>
            {/* <div className="ball ball1"></div>
            <div className="ball ball2"></div>
            <div className="ball ball3"></div>
            <div className="ball ball4"></div> */}
            {optionDataSet.map((item, index) => {
                return <div 
                    className={classNames(dragging ? getStyles(item.alphabet, index) :  "ball"+index)} 
                    draggable = {!timeOver} 
                    key={item.id} 
                    onDragEnd={(e) => {
                        handleDragEnd();
                    }} onDragStart = {(e) => {
                        handleDragStart(item.alphabet, e, item.id)
                        e.dataTransfer.setData("item.alphabet", item.alphabet)
                    }}>
                    <p style={{fontSize: "1.4em", color: "white"}}>{item.alphabet}</p>
                </div>
            })}
        </>
    );
}

export default DragDrop;