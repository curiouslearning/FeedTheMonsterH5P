import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import SelectProfile from "./components/profile/SelectProfile";
import gameData from "./data/example-return";

declare var H5P: any;
declare var H5PIntegration: any;


export default class ReactDemoApp extends (H5P.EventDispatcher as {
  new (): any;
}) {
  constructor(config: any,  contentId: string) {
    super();
    this.editorData = config.createContent;
    this.config = this.editorData == true ? config.levels : gameData.Levels;
    this.feedbackPhrases = gameData.FeedbackTexts;
    this.devMode = false;
    this.contentId = contentId;
    this.$element = document.createElement("div");
  }

  attach = function ($wrapper: JQuery) {
    $wrapper.get(0).appendChild(this.$element);
    render(

      <Provider store={store}>
        <SelectProfile
          config={this.config}
          contentId={this.contentId}
          editorData={this.editorData}
          wrapper={$wrapper}
          element={this.$element}
          feedbackPhrases={this.feedbackPhrases}
          devMode={this.devMode}
        />
      </Provider>,
      this.$element
    );
  };
}
const getImagePath = function() {
  return H5P.getLibraryPath("H5P.ReactSlideshowDemo-0.1")+"/assets/images/"
}

const buttonCLick = function() {
 return new Audio(getAudioPath()+'ButtonClick.wav');
}

const getAudioPath = function() {
  return H5P.getLibraryPath("H5P.ReactSlideshowDemo-0.1")+"/assets/audios/"
}

export {getImagePath,getAudioPath,buttonCLick}