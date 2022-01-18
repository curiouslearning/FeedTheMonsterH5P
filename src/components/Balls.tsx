import React, {useState, useRef} from 'react';
import { render } from 'react-dom';
import './app.css';

const Balls = (data: any) => {
    const [dataList, setDataList] = useState(data);
    const [dragging, setDragging] = useState(false);
    const dragItem = useRef();
    const dragNode = useRef();

    const handleDragStart = (data: any, e: any ) => {
        dragItem.current = data;
        dragNode.current = e.target;
        e.target.addEventListener('dragend', handleDragEnd)
        setTimeout(() => {
            setDragging(true);
        }, 0)
    }

    const handleDragEnd = (e: any) => {
        setDragging(false)
        e.target.removeEventListener('dragend', handleDragEnd)
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
        <div>
            {data.data.map((item: any, index: any) => (
                <div 
                    key={index} 
                    draggable 
                    onDragStart = {(e) => {handleDragStart(item.alphabet, e)}}
                    className= {dragging ? getStyles(item.alphabet) :  "balls"}
                >
                    {item.alphabet}
                </div>
            ))}
        </div>
    );
}

export default Balls;