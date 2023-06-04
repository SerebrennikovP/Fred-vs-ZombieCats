import React, { useState, useEffect } from "react";
import "../CSS/DeathScreenCss.css";

const ExpandingSquare = () => {
  const [expanding, setExpanding] = useState(false);
  const [renderDeathBackground, setRenderDeathBackground] = useState(false);

  useEffect(() => {
    const expandDelay = setTimeout(() => {
      setExpanding(true);
    }, 0);

    const backgroundDelay = setTimeout(() => {
      setRenderDeathBackground(true);
    }, 2000);

    return () => {
      clearTimeout(expandDelay);
      clearTimeout(backgroundDelay);
    };
  }, []);

  return (
    <div className={`expanding-square ${expanding ? "expand" : ""}`}>
      {renderDeathBackground && (
        <>
          <div className="death-background">
            <p>
              You Died
              <p className="scoreCount">Your score: </p>
            </p>
            <div className="deathLeaderBtnsDiv">
              <div className="deathLeaderBtn deathBtns">
                <img src="../space-key.svg" className="deathScreenKey" alt="" />
                Press space to the Leader Board
              </div>
              <div className="deathRetryBtn deathBtns">
                <img src="../enter-key.svg" className="deathScreenKey" alt="" />{" "}
                Press enter to try one more time
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpandingSquare;
