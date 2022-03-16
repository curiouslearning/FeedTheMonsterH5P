import { useState } from 'react'
let audio: HTMLAudioElement = null;
let isPlaying = false;
const AudioComponent = () => {

    const [playing, setPlaying] = useState(false);

    const playAudio = () => {
        if (!isPlaying) {
          audio = new Audio("https://www.kozco.com/tech/piano2.wav");
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
