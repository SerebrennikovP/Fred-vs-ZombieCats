import React, { useEffect, useContext, useState } from "react";
import { Kbd } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import "../CSS/CustomFont.css";
import "../CSS/HomePage.css";
import logo from "../images/Logo.png";
import { MusicContextInstance } from "../context/MusicContext";
import ReactAudioPlayer from 'react-audio-player';
import MuteImg from '../images/mute.png'

const HomePage = () => {
  const navigate = useNavigate();
  const [muteVisible, setMuteVisible] = useState(true)
  const { BackgroundMusic, muted } = useContext(MusicContextInstance);


  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.keyCode === 13)
        navigate("/game")
    };
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMuteVisible(false)
    }, 5000);
  }, [])

  return (<>
    {muteVisible && <div className="mute-rules"><img src={MuteImg}></img></div>}
    <div className="home-page" >
      {!muted && <ReactAudioPlayer
        src={BackgroundMusic}
        autoPlay={true}
        loop={true}
        muted={muted}
      />}
      <div className="background-image">
        <div className="logo-banner" >
          <img
            style={{ width: "80vw" }}
            src={logo}
            alt="logo"
          />
        </div>

        <div className="story-of-game">
          <div
            className="story"
            style={{
              fontFamily: "FVRIOSA",
            }}
          >
            Story
          </div>
          <div
            className="story-text"
            style={{
              fontFamily: "MarcellusSC",
            }}
          >
            In Pleasantville, a catastrophic experiment at a local lab unleashed
            a virus, turning cats into flesh-eating zombies. Fred, an animal
            lover, becomes the town's last hope armed with enchanted hearts. He
            captures infected cats, using the hearts to heal them.
          </div>
        </div>

        <div
          className="instruction-div"
          style={{
            fontFamily: "FVRIOSA",
            fontSize: "1.2em",
            fontWeight: "bold",
            color: "black",
          }}
        >
          <div className="how-to-play">How to play</div>
          <div className="instructions">
            <div className="instruction-1">
              <div className="move-fred">Move Fred</div>
              <div className="right-left-icons">
                <Kbd className="kbd">{"⇦"}</Kbd>
                {/* <b mx={2}>+</b> */}
                <Kbd className="kbd">{"⇨"}</Kbd>
              </div>
            </div>

            <div className="instruction-2">
              <div className="send-healing-hearts">Send healing heart</div>
              <div className="space-icon">
                <Kbd className="kbd">
                  <span className="space ">{"space"}</span>
                </Kbd>
              </div>
            </div>
          </div>
        </div>
        <div className="play-button-div">
          <div
            className="play-button"
            style={{
              fontFamily: "FVRIOSA",
              fontSize: "1vw",
            }}
          >
            <button onClick={() => navigate("/game")}>Play!</button>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default HomePage;
