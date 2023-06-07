import React from "react";
import { createContext } from "react";
import AudioPlayer from "react-audio-player";
import BackgroundMusic from "../Assets/Audio/Background-Music.mp3";
console.log("file: MusicContext.jsx:4 ~ BackgroundMusic:", BackgroundMusic);

const MusicContextInstance = createContext([]);
const MusicContext = ({ children }) => {
  return (
    <MusicContextInstance.Provider value={{}}>
      {children}
    </MusicContextInstance.Provider>
  );
};

export { MusicContextInstance };
export default MusicContext;
