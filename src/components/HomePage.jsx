import React from "react";
import { Kbd } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import "../CSS/CustomFont.css";
import logo from "../images/Logo.png";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="background-image">
        <div className="logo-banner">
          <img src={logo} alt="logo" />
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
          <div className="how-to-play">
            <u>How to play</u>
          </div>
          <div className="instructions">
            <div className="instruction-1">
              <div className="move-fred">Move Fred</div>
              <div className="right-left-icons">
                <Kbd className="kbd" mx={2}>
                  {"⬅"}
                </Kbd>
                {/* <b mx={2}>+</b> */}
                <Kbd className="kbd" mx={2}>
                  {"➡"}
                </Kbd>
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
              fontSize: "1rem",
            }}
          >
            <button onClick={() => navigate("/game")}>Play!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
