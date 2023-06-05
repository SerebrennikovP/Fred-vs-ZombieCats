import React, { useState, useRef, useEffect } from "react";
import DeathScreenPage from "./DeathScreenPage";
import Game from "./Game";

const GamePage = () => {
  const elementRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.requestFullscreen().catch((error) => {
        console.error("Error attempting to enable full-screen mode:", error);
      });
    }
  }, []);

  return (
    <div className="GamePage" ref={elementRef}>
      <Game></Game>
      {gameOver && <DeathScreenPage />}
    </div>
  );
};
export default GamePage;
