import React, { useState, useRef, useEffect } from "react";
import DeathScreenPage from "./DeathScreenPage";
import Game from "./Game";

const GamePage = () => {
  const elementRef = useRef(null);
  const [lifes, setLifes] = useState(300);
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.requestFullscreen().catch((error) => {
        // console.error("Error attempting to enable full-screen mode:", error);
      });
    }
  }, []);

  useEffect(() => {
    if (lifes === 0) {
      console.log(score)
    }
  }, [lifes])

  return (
    <div className="GamePage" ref={elementRef}>
      <Game lifes={lifes} setLifes={setLifes} score={score} setScore={setScore}></Game>
      {lifes <= 0 && <DeathScreenPage />}
    </div>
  );
};
export default GamePage;
