import React, { useEffect, useRef, useState } from "react";
import "./dragdrop-balls.css";
import classNames from "classnames";
import AnimationType from "../animations/AnimationType";
import { PromptTextHook } from "../prompt-text/PromptText";
import { getAudioPath, getImagePath } from "../../app";
import Draggable from "react-draggable";
import { DragDropContainer, DropTarget} from "react-drag-drop-container";
import { useAppDispatch, useAppSelector } from "../../app/hooks/commonHook";
import { RootState } from "../../app/store";
import { stoneDraggingCurrently } from "../../app/redux/features/DragAndDropStones";
import { changeMonsterAnimation } from "../../app/redux/features/CurrentMonsterAnimation";

let optionDataSet: { id: number; alphabet: string }[] = [];
let i = 0;
let alphabhet="";
let count=0;

const DragDrop = ({
  answerDrop,
  props,
  changePuzzel,
  levelCount,
  levelType,
  setScore,
  editorData,
}: {
  answerDrop: Function;
  props: any;
  changePuzzel: Function;
  levelCount: number;
  levelType: string;
  setScore?: Function;
  editorData: boolean;
}) => {
  console.log(props.targetstones);
  let options = [...props.targetstones, ...props.foilstones];
  
  const isStoneDragging = useAppSelector((state : RootState) => state.dragDropStones.value)
  const currentMonsterAnimation = useAppSelector((state : RootState) => state.currentMonsterAnimation.value);
  const dispatch = useAppDispatch();

  const [dataList, setDataList] = useState(options);


  const onDrag = new Audio(getAudioPath()+'onDrag.mp3');
  const monsterSplit = new Audio(getAudioPath()+'Monster Spits wrong stones-01.mp3');
  const monsterHappy = new Audio(getAudioPath()+'Cheering-02.mp3');
  const monsterDisapointment = new Audio(getAudioPath()+'Disapointed-05.mp3');

  const checkOptions=(options: any[])=>{
      if(options.length>8){
        var duplicateCount=Math.abs(8-options.length);
        var finalOptions = options.filter(function(elem, index, self) {
         
          if(index !== self.findIndex((t)=>(t.StoneText===elem.StoneText)) && duplicateCount!=0)
          {
            duplicateCount--
            return false;            
          }
          else{
            return true;
          }        
            
        })
        return finalOptions;
      }
      else{
        return options
      }
  }
  options = checkOptions(options)
  const { disappearPromptText } = PromptTextHook();

  const dragItem = useRef();
  const dragId = useRef();
  

  const optionCollectData = (options: string | any[]) => {
    for (let i = 0; i < options.length; i++) {
      let incomingData = {
        id: 100,
        alphabet: "",
      };

      incomingData.id = i;
      incomingData.alphabet = editorData ? options[i] : options[i].StoneText;
      optionDataSet.push(incomingData);
      console.log(optionDataSet);
    }
    setDataList(optionDataSet);
  };

  useEffect(() => {
    optionCollectData(options);
    return () => {
      options = [];
      optionDataSet = [];
    };
  }, [levelCount]);

  
  const getStyles = (params: any, index: any) => {
    const currentItem = dragItem.current;
    if (currentItem == params) {
      let str = "no-ball";
      return str.concat(index.toString());
    }
    let str = "ball";
    return str.concat(index.toString());
  };

  const checkResult = (dropData: any) => {
    console.log('----------------------->>>>>>>>>>>>>>>>>')
    // console.log(props.targetstones[0].StoneText, "resultin progress", dropData);
    let targetStone = "";
   
    for (; i < props.targetstones.length; i++) {
      targetStone = props.targetstones[i].StoneText;
      break;
    }

    if (levelType == "Word") {
      optionDataSet.filter((item) => {       
        if (dragId.current == item.id) {
          alphabhet = alphabhet + item.alphabet;
          count = count +targetStone.length;
          item.alphabet = "";
        }
  });
     
      i++;
      if (i == props.targetstones.length) {      
        i = 0;
        optionDataSet = [];
        answerDrop(); 
        changePuzzel();      
    } 
    } else {
      optionDataSet = [];
      i = 0;
      answerDrop();
      changePuzzel();
    }

    dispatch(stoneDraggingCurrently(false));
    
    if (targetStone == dropData) {
      disappearPromptText();
      monsterHappy.play()
      dispatch(changeMonsterAnimation("eat"));
      if(levelType !="Word"){
        setScore(100);
      }
      else{
        if(count == alphabhet.length && count >2){
          setScore(200);
          count =0;
          alphabhet="";
        }
      }
      setTimeout(() => {
        dispatch(changeMonsterAnimation("idle"));
      }, 2000);
    } else {
      count =0; 
      alphabhet=""
      dispatch(changeMonsterAnimation("spit"));
      monsterDisapointment.play()
      setTimeout(() => {
        monsterSplit.play()
      }, 1000);
  
      i = 0;
      optionDataSet = [];
      answerDrop();
      changePuzzel();
      setTimeout(() => {
        dispatch(changeMonsterAnimation("idle"));
      }, 2000);
      setScore(0);
    }
    dragItem.current = null;
  };

  console.log(props);

  
  return (
    <>
    <DropTarget
      onHit={(e:any)=>{console.log(e)
      console.log('dropped')
      console.log(e.containerElem.innerText)
      checkResult(e.containerElem.innerText);
      e.containerElem.style.visibility = "hidden";
      }}
      targetKey='box'
      dropData={{ name: props.name }}
    >
      <div
        style={{
          width: "300px",
          height: "100px",
          top: "50%",
          left: "30%",
          position: "absolute",
        }}
        // onDragOver={(e) => {
        //   console.log("onDragOver::");
        //   e.stopPropagation();
        //   e.preventDefault();
        // }}
        // onTouchEnd={(e)=>{console.log(e+'ggggggggggg')}}
        // onDrop={(e) => {
        //   console.log('drop')
        //   console.log(e)
        //   checkResult(e.dataTransfer.getData("item.alphabet"));
        //   // console.log("::onDrop");
        // }}
      >
        <AnimationType type={'idle'} />
      </div>
    </DropTarget>
      {/* </Draggable> */}
      {optionDataSet.map((item, index) => {
        if (item.alphabet != "") {
          return (
            // <Draggable
            //  disabled={true}
            //  onStop={(e)=>{
            //    console.log('Sample')
            //    console.log(e)
            //  }}
            // >
            // <Draggable>
          <div className={classNames(
            isStoneDragging ? getStyles(item.alphabet, index) : "ball" + index
          )}>
            <DragDropContainer
                targetKey='box'
                dragData={'ball'+index}
                // customDragElement={customDragElement}
                onDragStart={() => console.log("start")}
                onDrag={() => console.log("dragging")}
                onDragEnd={() => console.log("end")}
                onDrop={(e:any) => console.log(e)}>
            <div
              className={classNames(
                isStoneDragging ? getStyles(item.alphabet, index) : "ball" + index
              )}
              style={{
                backgroundImage: `url(${getImagePath()+'stone_pink_v02.png'})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
              // draggable={!timeOver && !isMenuOpen}
              key={item.id}
              // onDragEnd={(e) => {
              //   handleDragEnd();
              // }}
              // onTouchStart={(e=>{console.log(e+';;;;;;;;;;;')})}
              // onDragStart={(e) => {
              //   console.log('started dragging')
              //   onDrag.play()
              //   handleDragStart(item.alphabet, e, item.id);
              //   e.dataTransfer.setData("item.alphabet", item.alphabet);
              // }}
            >
              <p className="stones-letter">{item.alphabet}</p>
            </div>
            </DragDropContainer>
            </div>
          );
        }
      })}
    </>
  );
};

export default DragDrop;

