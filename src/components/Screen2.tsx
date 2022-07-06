import React, { useEffect, useState } from "react";
import useWindowDimensions from "./common/GetWindowDimensions";
import Screen1 from "./screen1";
const Screen2 = () => {
  const { height, width } = useWindowDimensions();
  console.log("****************2");
};
export default Screen2;
