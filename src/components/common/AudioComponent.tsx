import { useState } from 'react'
let audio: HTMLAudioElement = null;
let isPlaying = false;
const AudioComponent = (props:any) => {

    const [playing, setPlaying] = useState(false);
    const playAudio = (url:any) => {
        if (!isPlaying) {
          audio = new Audio(url == null ? props: url);
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
