import React from "react";
import { Kbd } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import darkforest from "../images/darkforest.gif";
import "../CSS/CustomFont.css";

const HomePage = () => {
  console.log(darkforest);
  const navigate = useNavigate();
  return (
    <div
      className="home-page"
      style={{
        backgroundImage: `url(${darkforest})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        filter: "grayscale(50%)",
      }}
    >
      <div className="logo-banner">
        <img src="" alt="game-logo" />
      </div>
      <div className="game-instructions">
        <div className="story-of-game">
          <div
            className="story"
            style={{
              fontFamily: "FVRIOSA",
              fontSize: "2rem",
            }}
          >
            Story:
          </div>
          <div
            style={{
              fontFamily: "FVRIOSA",
              fontSize: "1rem",
              color: "#fffffb",
            }}
          >
            In Pleasantville, a once peaceful town, a catastrophic experiment at
            a local laboratory has unleashed a virus that turned cats into
            flesh-eating zombies. The town is in chaos, and Fred, an animal
            lover with a heart of gold, rises as the towns last hope. Armed with
            enchanted hearts, Fred embarks on a perilous mission to heal the
            infected felines and restore harmony to Pleasantville.
          </div>
        </div>
        <div className="instruction-div">
          <div className="how-to-play">how to play:</div>
          <div className="instructions">
            To move Fred: <Kbd className="kbd">{"⬅"}</Kbd>
            <b>+</b>
            <Kbd className="kbd">{"➡"}</Kbd>
          </div>
          <div className="instructions">
            To send healing hearts:
            <Kbd className="kbd">
              <span className="space">{"⎵"}</span>
            </Kbd>
          </div>
        </div>
      </div>
      <div className="play-button-div">
        <div
          className="play-button"
          style={{
            fontFamily: "FVRIOSA",
            fontSize: "1rem",
            // color: "#fffffb",
          }}
        >
          <button onClick={() => navigate("/game")}>Play!</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
