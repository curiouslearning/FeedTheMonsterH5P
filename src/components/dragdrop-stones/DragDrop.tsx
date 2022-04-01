import React, { useEffect, useRef, useState } from "react";
import "./dragdrop-balls.css";
import classNames from "classnames";
import AnimationType from "../animations/AnimationType";
import { dark } from "@material-ui/core/styles/createPalette";
import stones from "../../../assets/images/stone_pink_v02.png";
import { contains } from "jquery";
import { PromptTextHook } from "../prompt-text/PromptText";
import EndLevelComponent from "../end-level/EndLevelComponent";

let optionDataSet: { id: number; alphabet: string }[] = [];
let i = 0;

const DragDrop = ({
  timeOver,
  answerDrop,
  startDrag,
  props,
  changePuzzel,
  levelCount,
  isMenuOpen,
  levelType,
  setScore,
  editorData,
}: {
  timeOver: boolean;
  answerDrop: Function;
  startDrag: boolean;
  props: any;
  changePuzzel: Function;
  levelCount: number;
  isMenuOpen: boolean;
  levelType: string;
  setScore?: Function;
  editorData: boolean;
}) => {
  console.log(props.targetstones);
  let options = [...props.targetstones, ...props.foilstones];

  const [dataList, setDataList] = useState(options);
  const [dragging, setDragging] = useState(false);
  const [dropped, setDropped] = useState(false);
  const [animationType, setAnimationType] = useState("idle");

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
        changePuzzel();
      }
    } else {
      optionDataSet = [];
      i = 0;
      answerDrop();
      changePuzzel();
    }

    setDropped(true);
    setDropped(false);
    setDragging(false);

    if (targetStone == dropData) {
      disappearPromptText();
      setAnimationType("eat");
      setScore(100);
      setTimeout(() => {
        setAnimationType("idle");
      }, 2000);
    } else {
      setAnimationType("spit");
      i = 0;
      optionDataSet = [];
      answerDrop();
      changePuzzel();
      setTimeout(() => {
        setAnimationType("idle");
      }, 2000);
      setScore(0);
    }
    dragItem.current = null;
  };
  return (
    <>
      <div
        style={{
          width: "300px",
          height: "100px",
          top: "50%",
          left: "30%",
          position: "absolute",
        }}
        onDragOver={(e) => {
          // console.log("onDragOver::");
          e.stopPropagation();
          e.preventDefault();
        }}
        onDrop={(e) => {
          checkResult(e.dataTransfer.getData("item.alphabet"));
          // console.log("::onDrop");
        }}
      >
        <AnimationType type={animationType} />
      </div>
      {optionDataSet.map((item, index) => {
        if (item.alphabet != "") {
          return (
            <div
              className={classNames(
                dragging ? getStyles(item.alphabet, index) : "ball" + index
              )}
              style={{
                backgroundImage: `url(${stones})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
              draggable={!timeOver && !isMenuOpen}
              key={item.id}
              onDragEnd={(e) => {
                handleDragEnd();
              }}
              onDragStart={(e) => {
                handleDragStart(item.alphabet, e, item.id);
                e.dataTransfer.setData("item.alphabet", item.alphabet);
              }}
            >
              <p className="stones-letter">{item.alphabet}</p>
            </div>
          );
        }
      })}
    </>
  );
};

export default DragDrop;
