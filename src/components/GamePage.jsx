import React, { useState } from "react";
import DeathScreenPage from './DeathScreenPage'
import Game from "./Game";

const GamePage = () => {
    const [gameOver, setGameOver] = useState(false)

    return (
        <div className="GamePage">
            <Game></Game>
            {gameOver && <DeathScreenPage />}
        </div>
    );
};
export default GamePage;
