import React, { useEffect, useRef, useState } from "react";
import "./dragdrop-balls.css";
import classNames from "classnames";
import AnimationType from "../animations/AnimationType";
import { dark } from "@material-ui/core/styles/createPalette";
import stones from "../../../assets/images/stone_pink_v02.png";
import { contains } from "jquery";
import { PromptTextHook } from "../prompt-text/PromptText";
import EndLevelComponent from "../end-level/EndLevelComponent";
import { getAudioPath, getImagePath } from "../../app";
// import Draggable from "react-draggable";
import Draggable from "react-draggable";
import { DragDropContainer,DropTarget} from "react-drag-drop-container";

let optionDataSet: { id: number; alphabet: string }[] = [];
let i = 0;
let inputAlphabhet="";
let count=0;
let j=0;



const DragDrop = ({
  currentProgressCount,
  timeOver,
  answerDrop,
  startDrag,
  props,
  changePuzzel,
  levelCount,
  levelsCompleted,
  isMenuOpen,
  levelType,
  setScore,
  editorData,
}: {
  currentProgressCount:number;
  timeOver: boolean;
  answerDrop: Function;
  startDrag: boolean;
  props: any;
  changePuzzel: Function;
  levelCount: number;
  levelsCompleted:number;
  isMenuOpen: boolean;
  levelType: string;
  setScore?: Function;
  editorData: boolean;
}) => {
  console.log(props.targetstones);
  console.log(props.foilstones)
  let options = [...props.foilstones];
  
  const [dataList, setDataList] = useState(options);
  const [dragging, setDragging] = useState(false);
  const [dropped, setDropped] = useState(false);
  const [animationType, setAnimationType] = useState("idle");
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
  options=checkOptions(options)
  const { disappearPromptText } = PromptTextHook(levelType);

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
    console.log(dataList);
  };

  useEffect(() => {
    optionCollectData(options);
    return () => {
      options = [];
      optionDataSet = [];
    };
  }, [levelCount]);

  const handleDragStart = (data: any, e: any, id: any) => {
    dragItem.current = data;
    dragId.current = id;
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnd = () => {
    setDragging(false);
    dragItem.current = null;
  };

  const getStyles = (params: any, index: any) => {
    const currentItem = dragItem.current;
    if (currentItem == params) {
      let str = "no-ball";
      return str.concat(index.toString());
    }
    let str = "ball";
    return str.concat(index.toString());
  };
  
  useEffect(() => {
    if(j==1){
      i=0;
      j=0;
      count =0;
      inputAlphabhet="";
      // console.log("-------------->>>>>>>>>>>>");
    }
  }, [levelCount])
  const checkResult = (dropData: any) => {
    // console.log(props.targetstones[0].StoneText, "resultin progress", dropData);
    let targetStone = "";
   
    for (; i < props.targetstones.length; i++) {
      targetStone = props.targetstones[i].StoneText;
      break;
    }

    if (levelType == "Word") {
      optionDataSet.filter((item) => {       
        if (dragId.current == item.id) {
          item.alphabet = "";
        }
  });
     
      i++;
      if (i == props.targetstones.length) {      
        i = 0;
        optionDataSet = [];
        answerDrop(); 
        // changePuzzel();      
    } 
    } else {
      optionDataSet = [];
      i = 0;
      answerDrop();
      // changePuzzel();
    }

    setDropped(true);
    setDropped(false);
    setDragging(false);
    
    if (targetStone == dropData) {
     
      monsterHappy.play()
      setAnimationType("eat");
      inputAlphabhet =inputAlphabhet +dropData;
      count = count +targetStone.length;
      
      if(levelType !="Word"){
        // disappearPromptText();
        setScore(100);
        changePuzzel();
        i=0;
        count =0;
        inputAlphabhet="";
      }
      else{
        j=1;
        console.log("------------>>>>>>>>>>");
          console.log(i);
        if(count === inputAlphabhet.length && count >= 3 &&i==0){
          
          // disappearPromptText();
          setScore(100); 
          count =0;
          inputAlphabhet="";
          changePuzzel();
        }
        
        
      }
      setTimeout(() => {
        setAnimationType("idle");
      }, 2000);
    } else {
      
      count =0;  
      inputAlphabhet=""
      setAnimationType("spit");
      monsterDisapointment.play()
      setTimeout(() => {
        monsterSplit.play()
      }, 1000);
  
      i = 0;
      optionDataSet = [];
      answerDrop();
      changePuzzel();
      // if(levelType=="Word"){
      //   changePuzzel();
      // }
      setTimeout(() => {
        setAnimationType("idle");
      }, 2000);
      setScore(0);
    }
    dragItem.current = null;
  };
  return (
    <>
    {/* <Draggable */}
    {/* // disabled={true} */}

    {/* onStop={(e)=>{
      console.log(e)
      console.log("The element was dropped here")
    }}
    onMouseDown={(e)=>{
      console.log(e)
      console.log("The element was dropped here")
    }}
    
    > */}
    <DropTarget
      
      onHit={(e:any)=>{console.log(e)
      console.log('dropped')
      console.log(e.containerElem.innerText)
      if(currentProgressCount!=0){
        checkResult(e.containerElem.innerText);
      }
      
      e.containerElem.style.visibility = "hidden";
      }}
      targetKey='box'
      dropData={{ name: props.name }}
    >
      <div
        style={{
          width: "300px",
          height: "100px",
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
        <AnimationType type={animationType} getPhaseCharNo={levelsCompleted}/>
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
            dragging ? getStyles(item.alphabet, index) : "ball" + index
          )}>
            <DragDropContainer
                targetKey='box'
                dragData={'ball'+index}
                // customDragElement={customDragElement}
                onDragStart={(e:any) => {
                  onDrag.play()
                }}
                onDrag={() => console.log("dragging")}
                onDragEnd={() => console.log("end")}
                onDrop={(e:any) => console.log(e)}>
            <div
              className={classNames(
                dragging ? getStyles(item.alphabet, index) : "ball" + index
              )}
              style={{
                backgroundImage: `url(${getImagePath()+'stone_pink_v02.png'})`,
                backgroundSize: "100% 100%",
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
