import React, { useEffect, useRef, useState } from "react";
import { useDrag  } from "react-dnd";

// let optionDataSet = [
//     {
//         id: 1,
//         alphabet: 'a'
//     },
//     {
//         id: 2,
//         alphabet: 'b'
//     },
//     {
//         id: 3,
//         alphabet: 'c'
//     }
// ]
let dropText: any[] = [
    {
        id: 1,
        alphabet: 'a'
    }
]

let answerText: { id: number; alphabet: string; }[] = []

let optionDataSet: { id: number; alphabet: string; }[] = []


const DragDrop = ({timeOver, answerDrop, startDrag, props} : {timeOver : boolean, answerDrop : Function, startDrag: boolean, props: any}) => {

    const collectData = (options: string | any[]) => {
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
    let options = [props.targetstones[0], ...props.foilstones]
    useEffect(() => {
        collectData(options)
        return () => {
            options=[]
            optionDataSet=[]
        }
    }, [])

    const [dataList, setDataList] = useState(options);
    const [dragging, setDragging] = useState(false);
    const [dropped, setDropped] = useState(false);

    const [drop, setDropping] = useState(dropText);
    const dragItem = useRef();
    const dragNode = useRef();
    const dragId = useRef();
    const dropNode = useRef();

    const handleDragStart = (data: any, e: any, id: any ) => {
        dragItem.current = data;
        dragId.current = id;
        dragNode.current = e.target;
        e.target.addEventListener('dragend', handleDragEnd)
        e.target.addEventListener('drag', ()=> {
             
        })
        setTimeout(() => {
            setDragging(true);
        }, 0)
    }

    const handleDragEnd = (e: any) => {

        if (dropText[0].alphabet == dragItem.current) {
            const newDropText = {
                id : dragId.current,
                alphabet : dragItem.current
            }
            dropText = [];
            dropText.push(newDropText)
            const cList = optionDataSet.filter((item) => item.id != dragId.current)
            optionDataSet = [];
            setDropped(true);
            answerDrop();
        }

        setDragging(false)
        e.target.removeEventListener('dragend', handleDragEnd)
        // setDropping(dragItem.current);
        dragItem.current = null;
        dragNode.current = null;
    }

    const getStyles = (params: any) => {
        const currentItem = dragItem.current;
        if (currentItem == params) {
            return "no-balls";
        }
        return "balls";
    }

    return (
        <>
            {optionDataSet.map((item, index) => {
                return <div className={dragging ? getStyles(item.alphabet) :  "balls"} draggable = {timeOver} key={item.id} onDragStart = {(e) => {handleDragStart(item.alphabet, e, item.id)}}>
                    <p style={{fontSize: "1.4em", color: "white"}}>{item.alphabet}</p>
                        </div>
            })}
            <div className="drop" id="droop" ref={dropNode}>
                {dropText.map((item) => {
                    return <div 
                            className={dropped ? "balls" : 'bol' }
                            key={item.id}
                            ><p style={{fontSize: "1.4em", color: "white"}}>{item.alphabet}</p>
                        </div>
                })}
            </div>
            <div className="right-answer">{dropped ? "Correct" : ""}</div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>{!timeOver && !dropped ? "Try Again time excedded" : ""}</div>
        </>
    );
}

export default DragDrop;