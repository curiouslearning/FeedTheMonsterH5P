import { useState } from 'react'
import { getAudioPath } from '../../app';
let audio: HTMLAudioElement = null;
let isPlaying = false;
const AudioComponent = (props: any) => {

    const [playing, setPlaying] = useState(false);
    audio = new Audio(getAudioPath() + props.FileName);

    const playAudio = () => {
      if (!isPlaying) {
          var playPromise = audio.play();
          isPlaying = true;
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
              })
              .catch((err: any) => {
                console.log(err);
              });
          }
          audio.addEventListener("ended", () => {
            setPlaying(true);
            isPlaying = false;
          });
        };
      }
    return { playing, setPlaying, playAudio };
}

export default AudioComponent;
