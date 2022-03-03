import React from 'react';
import ReactDOM, { render } from 'react-dom';

import Slideshow from './components/Slideshow';
import gameData from './data/example-return';

declare var H5P: any;
declare var H5PIntegration: any;


export default class ReactDemoApp extends (H5P.EventDispatcher as { new(): any }) {
    constructor(config: any, contentId: string, contentData: any = {}) {
        super();
        // console.log(config)
        this.config = gameData.Levels;
        this.contentId = contentId;
        this.$element = document.createElement('div');
    }

    attach = function($wrapper: JQuery) {
        $wrapper.get(0).appendChild(this.$element);
        render(<Slideshow data={this.config} contentId={this.contentId} />, this.$element);
    }
}