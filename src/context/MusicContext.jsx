import React, { useEffect, useState } from "react";
import { createContext } from "react";

import BackgroundMusic from "../Assets/Audio/Background.mp3";
import Heartbeat from "../Assets/Audio/Heartbeat.mp3";
import GameMusic from "../Assets/Audio/GameMusic.mp3"
import Dead from "../Assets/Audio/Dead.mp3"
import HeartSound from "../Assets/Audio/HeartSound.mp3"
import MinusFred from "../Assets/Audio/MinusFred.wav"
import MinusCat from "../Assets/Audio/MinusCat.wav"
import Meow from "../Assets/Audio/Meow.mp3"

const MusicContextInstance = createContext([]);

const MusicContext = ({ children }) => {
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.keyCode === 38)
        setMuted(false)
      if (event.keyCode === 40)
        setMuted(true)
    };
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [muted]);


  return (

    <MusicContextInstance.Provider value={{ BackgroundMusic, Meow,setMuted, muted, Heartbeat,MinusFred,MinusCat, GameMusic,Dead ,HeartSound}}>
      {children}
    </MusicContextInstance.Provider>

  );
};

export { MusicContextInstance };
export default MusicContext;
