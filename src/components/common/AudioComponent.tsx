import { useState } from 'react'
import {Howl} from "howler";
//let audio: HTMLAudioElement = null;
let isPlaying = false;
const AudioComponent = (props:any) => {

    const [playing, setPlaying] = useState(false);
    // const playAudio = (url:any) => {
    //     if (!isPlaying) {
    //       audio = new Audio(url == null ? props: url);
    //         var playPromise = audio.play();
    //         isPlaying = true;
    //         if (playPromise !== undefined) {
    //           playPromise
    //             .then(() => {
    //             })
    //             .catch((err: any) => {
    //               console.log(err);
    //             });
    //         }
    //         audio.addEventListener("ended", () => {
    //           setPlaying(true);
    //           isPlaying = false;
    //         });
    //       };
    //     }
        const playAudio = (url : any) => {
          const src = url == null ? props : url;
          const sound = new Howl({
            src,
            html5: true,
          })
          if (!isPlaying) {
              sound.play();
              isPlaying = true;
              sound.on('end', () => {
                setPlaying(true);
                isPlaying = false;
              })    
            }
        }
    return { playing, setPlaying, playAudio };
}

export default AudioComponent;
