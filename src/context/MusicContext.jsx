import React, { useEffect } from "react";
import { createContext } from "react";
import BackgroundMusic from "../Assets/Audio/Background.mp3";

const MusicContextInstance = createContext([]);
const MusicContext = ({ children }) => {
  // useEffect(() => {
  //   let background = new Audio(BackgroundMusic);

  //     background.play()
  //   return () => {
  //     background.pause();
  //   };
  // }, [])
  return (
    <MusicContextInstance.Provider value={{ BackgroundMusic }}>
      {children}
    </MusicContextInstance.Provider>
  );
};

export { MusicContextInstance };
export default MusicContext;
