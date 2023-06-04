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
      }}
    >
      <div className="logo-banner">
        <img src="" alt="game-logo" />
      </div>
      <div className="game-instructions">
        <div className="rules-of-game">
          <div
            className="story"
            style={{ fontFamily: "CustomFont", fontSize: "2rem" }}
          >
            Story:
          </div>
          <div>
            In Pleasantville, a once peaceful town, a catastrophic experiment at
            a local laboratory has unleashed a virus that turned cats into
            flesh-eating zombies. The town is in chaos, and Fred, an animal
            lover with a heart of gold, rises as the town's last hope. Armed
            with enchanted hearts, Fred embarks on a perilous mission to heal
            the infected felines and restore harmony to Pleasantville.
          </div>
        </div>
        <div className="instruction-div">
          <div className="how-to-play">how to play:</div>
          <div className="instructions">
            To move Fred use the <Kbd className="kbd">{`<-- Right arrow `}</Kbd>
            <b>+</b>
            <Kbd>{`Left arrow -->`}</Kbd>
          </div>
          <div className="instructions">
            To send healing heart use the <Kbd className="kbd">{`space`}</Kbd>
          </div>
        </div>
      </div>
      <div className="play-button-div">
        <div className="play-button">
          <button onClick={() => navigate("/game")}>Play!</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
