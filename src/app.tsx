import { config } from "process";
import React from "react";
import ReactDOM, { render } from "react-dom";
import SelectProfile from "./components/profile/SelectProfile";

import Slideshow from "./components/Slideshow";
import gameData from "./data/example-return";
import {Howl} from "howler";

declare var H5P: any;
declare var H5PIntegration: any;


export default class ReactDemoApp extends (H5P.EventDispatcher as {
  new (): any;
}) {
  constructor(config: any,feedbackPhrases: any = [],feedbackAudios: any=[],generalData: any = {},devMode: boolean, contentId: string, contentData: any = {}) {
    super();
    // console.log(config)
    console.log(config);
    console.log(gameData.Levels);
    console.log(config.createContent);
    // this.config = gameData.Levels;
    this.editorData = config.createContent;
    this.config = this.editorData == true ? config.levels : gameData.Levels;
    this.feedbackPhrases = gameData.FeedbackTexts;
    this.feedbackAudios = gameData.FeedbackAudios;
    this.generalData = gameData.GeneralData;
    this.devMode = false;
    this.contentId = contentId;
    this.$element = document.createElement("div");
  }

  attach = function ($wrapper: JQuery) {
    console.log("called attach");
    console.log(this.editorData);
    $wrapper.get(0).appendChild(this.$element);
    render(
      <SelectProfile
        config={this.config}
        contentId={this.contentId}
        editorData={this.editorData}
        wrapper={$wrapper}
        element={this.$element}
        feedbackPhrases={this.feedbackPhrases}
        feedbackAudios={this.feedbackAudios}
        generalData={this.generalData}
        devMode={this.devMode}
      />,
      this.$element
    );
    //render(<Slideshow data={this.config} contentId={this.contentId} editorData={this.editorData}/>, this.$element);
  };
}

const playAUDIO = (src: any) => {
  const sound = new Howl({
    src,
    html5: true,
  })
  sound.play();
}

const getImagePath=function()
{
  return H5P.getLibraryPath("H5P.FeedTheMonster-0.1")+"/assets/images/"
}
const buttonCLick=function(){
 return playAUDIO(getAudioPath()+'ButtonClick.wav');

}

const getAudioPath=function()
{
  return H5P.getLibraryPath("H5P.FeedTheMonster-0.1")+"/assets/audios/"
}


export {getAudioPath,buttonCLick}