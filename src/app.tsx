import { config } from "process";
import React from "react";
import ReactDOM, { render } from "react-dom";
import SelectProfile from "./components/profile/SelectProfile";

import Slideshow from "./components/Slideshow";
import gameData from "./data/example-return";

declare var H5P: any;
declare var H5PIntegration: any;

export default class ReactDemoApp extends (H5P.EventDispatcher as {
  new (): any;
}) {
  constructor(config: any, contentId: string, contentData: any = {}) {
    super();
    // console.log(config)
    console.log(config);
    console.log(gameData.Levels);
    console.log(config.createContent);
    // this.config = gameData.Levels;
    this.editorData = config.createContent;
    this.config = this.editorData == true ? config.levels : gameData.Levels;
    this.contentId = contentId;
    this.$element = document.createElement("div");
  }

  attach = function ($wrapper: JQuery) {
    console.log("called attach");
    $wrapper.get(0).appendChild(this.$element);
    console.log(H5P)
    render(
      <SelectProfile
        basePath={H5P.getLibraryPath("H5P.ReactSlideshowDemo-0.1")+"/assets/images/"}
        config={this.config}
        contentId={this.contentId}
        editorData={this.editorData}
        wrapper={$wrapper}
        element={this.$element}
      />,
      this.$element
    );
    //render(<Slideshow data={this.config} contentId={this.contentId} editorData={this.editorData}/>, this.$element);
  };
}

const getLibraryPath=function()
{
  return H5P.getLibraryPath("H5P.ReactSlideshowDemo-0.1")+"/assets/images/"
}
export {getLibraryPath}

