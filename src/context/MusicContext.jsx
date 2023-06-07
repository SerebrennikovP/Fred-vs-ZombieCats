import React, { useEffect, useState } from "react";
import { createContext } from "react";
import BackgroundMusic from "../Assets/Audio/Background.mp3";


const MusicContextInstance = createContext([]);

const MusicContext = ({ children }) => {

  useEffect(() => {
    let background = new Audio(BackgroundMusic);

    const handleKeyUp = (event) => {
      if (event.keyCode === 81) {
        background.play()
        background.loop = true
      }
    };

    document.addEventListener('keyup', handleKeyUp);

  }, [])





  return (

      <MusicContextInstance.Provider value={{ BackgroundMusic }}>
        {children}
      </MusicContextInstance.Provider>

  );
};

export { MusicContextInstance };
export default MusicContext;
