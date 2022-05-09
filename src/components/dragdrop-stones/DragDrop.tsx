import React, { useEffect, useRef, useState } from "react";
import "./dragdrop-balls.css";
import classNames from "classnames";
import AnimationType from "../animations/AnimationType";
import { PromptTextHook } from "../prompt-text/PromptText";
import { getAudioPath, getImagePath } from "../../app";
import { DragDropContainer,DropTarget} from "react-drag-drop-container";
import { useAppSelector } from "../../app/hooks/commonHook";
import { RootState } from "../../app/store";
import { useDispatch } from "react-redux";
import { stoneDraggingCurrently } from "../../app/redux/features/DragAndDropStones";
import { changeMonsterAnimation } from "../../app/redux/features/CurrentMonsterAnimation";

let optionDataSet: { id: number; alphabet: string }[] = [];
let i = 0;
let inputAlphabhet="";
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
  
  let options = [...props.targetstones, ...props.foilstones];

  //redux
  const isStoneDragging = useAppSelector((state: RootState) => state.dragDropStones.value);
  const currentMonsterAnimation = useAppSelector((state: RootState) => state.currentMonsterAnimation.value);
  const dispatch = useDispatch();

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
  };

  useEffect(() => {
    optionCollectData(options);
    return () => {
      options = [];
      optionDataSet = [];
    };
  }, [levelCount]);

  // const getStyles = (params: any, index: any) => {
  //   const currentItem = dragItem.current;
  //   if (currentItem == params) {
  //     let str = "no-ball";
  //     return str.concat(index.toString());
  //   }
  //   let str = "ball";
  //   return str.concat(index.toString());
  // };

  const checkResult = (dropData: any) => {
    dispatch(stoneDraggingCurrently(true))
    let targetStone = "";
   
    for (; i < props.targetstones.length; i++) {
      targetStone = props.targetstones[i].StoneText;
      break;
    }

    if (levelType == "Word") {
      optionDataSet.filter((item) => {       
        if (dragId.current == item.id) {
          inputAlphabhet = inputAlphabhet + item.alphabet;
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

    if (targetStone == dropData) {
      disappearPromptText();
      monsterHappy.play()
      dispatch(changeMonsterAnimation('eat'));
      inputAlphabhet =inputAlphabhet +dropData;
      count = count +targetStone.length;
      
      if(levelType !="Word"){
        setScore(100);
      }
      else{
        if(count == inputAlphabhet.length && count >2){
          setScore(200);
          count =0;
          inputAlphabhet="";
        }
      }
      setTimeout(() => {
        dispatch(changeMonsterAnimation('idle'));
        dispatch(stoneDraggingCurrently(true))
      }, 2000);
    } else {
      
      count =0;  
      inputAlphabhet=""
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
        dispatch(stoneDraggingCurrently(true))
      }, 2000);
      setScore(0);
    }
    dragItem.current = null;
  };

  console.log(props);

  
  return (
    <>
      <DropTarget
        onHit={(e:any)=>{
          checkResult(e.containerElem.innerText);
          e.containerElem.style.visibility = "hidden";
        }}
        targetKey='box'
        dropData={{ name: props.name }}>
        <div
          style={{
            width: "300px",
            height: "100px",
            position: "absolute",
          }}>
          <AnimationType type={currentMonsterAnimation} />
        </div>
      </DropTarget>
      {optionDataSet.map((item, index) => {
        if (item.alphabet != "") {
          return (
            <div className={classNames("ball" + index)}>
              <DragDropContainer targetKey='box' dragData={'ball'+index} noDragging={isStoneDragging}>
                <div
                  className={classNames("ball" + index)}
                  style={{
                    backgroundImage: `url(${getImagePath()+'stone_pink_v02.png'})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  }}
                  key={item.id}>
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

