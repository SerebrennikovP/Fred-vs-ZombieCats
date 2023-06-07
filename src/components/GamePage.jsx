import React, { useState, useRef, useEffect } from "react";
import DeathScreenPage from "./DeathScreenPage";
import Game from "./Game";
import "../CSS/GamePage.css";
import heart from "../images/heart-icon.png";
import "../CSS/CustomFont.css";

const GamePage = () => {
  const elementRef = useRef(null);
  const [lifes, setLifes] = useState(300);
  console.log("file: GamePage.jsx:11 ~ GamePage ~ lifes:", lifes);
  const [score, setScore] = useState(0);
  const [hearts, sethearts] = useState([heart, heart, heart]);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.requestFullscreen().catch((error) => {
        console.error("Error attempting to enable full-screen mode:", error);
      });
    }
  }, []);

  useEffect(() => {
    if (lifes === 0) {
      console.log(score);
    }
    if (lifes === 200 || lifes === 100) {
      const updatedLifes = [...hearts];
      updatedLifes.splice(0, 1);
      sethearts(updatedLifes);
      return;
    }
  }, [lifes]);

  return (
    <div className="GamePage" ref={elementRef}>
      <div className="score-board-div">
        <div className="left-box">
          
        </div>
        <div
          className="score-div"
          style={{
            fontFamily: "FVRIOSA",
            color: "#bf1b1b",
            fontSize: "4vw",
          }}
        >
          <div>
            <b>Score:</b>
          </div>
          <div>{score}</div>
        </div>
        <div className="hearts">
          {hearts.map((heart, idx) => {
            return (
              <img
                key={idx}
                src={heart}
                alt="heart-image"
                height={"100%"}
                width={"100%"}
              />
            );
          })}
        </div>
      </div>
      <Game
        lifes={lifes}
        setLifes={setLifes}
        score={score}
        setScore={setScore}
      ></Game>
      {lifes <= 0 && <DeathScreenPage />}
    </div>
  );
};
export default GamePage;
