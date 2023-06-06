import React from "react";
import { Kbd } from "@chakra-ui/layout";

import { useNavigate } from "react-router-dom";
import darkforest from "../images/darkforest.gif";
import "../CSS/CustomFont.css";
import "../CSS/HomePage.css";
import logo from "../images/Logo.png";

const HomePage = () => {
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
        <img src={logo} alt="logo" />
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
            Story
          </div>
          <div
            style={{
              fontFamily: "MarcellusSC",
              fontSize: "1rem",
              color: "#fffffb",
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
            fontFamily: "Eater",
            fontSize: "1.1rem",
            fontWeight: "bold",
            color: "black",
          }}
        >
          <div className="how-to-play">how to play:</div>
          <div className="instructions">
            <div>To move Fred:</div>
            <div>
              <Kbd className="kbd">{"⬅"}</Kbd>
            </div>
            <div>
              <b>+</b>
            </div>
            <div>
              <Kbd className="kbd">{"➡"}</Kbd>
            </div>
          </div>
          <div className="instructions">
            <div>To send healing hearts:</div>
            <div>
              <Kbd className="kbd">
                <span className="space">{"space"}</span>
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
