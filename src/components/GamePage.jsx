import React, { useState, useEffect, useContext } from "react";
import DeathScreenPage from "./DeathScreenPage";
import Game from "./Game";
import "../CSS/GamePage.css";
import heart from "../images/heart-icon.png";
import "../CSS/CustomFont.css";
import Rules1 from '../images/Rules-Zombie-cat-1.png'
import Rules2 from '../images/Rules-Zombie-cat-2.png'
import Rules3 from '../images/Rules-Zombie-cat-3.png'
import Rules4 from '../images/Rules-Zombie-cat-4.png'
import Rules5 from '../images/Rules-Zombie-cat-5.png'
import { UserContextInstance } from "../context/UserContext";
import LoadingPage from './Loading';

const GamePage = () => {
  const [lifes, setLifes] = useState(3);
  const [level, setLevel] = useState(1)
  const [hundreds, setHundreds] = useState(0)
  const { score, setScore } = useContext(UserContextInstance)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const element = document.documentElement;

    if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
    if (element.requestFullscreen) {
      element.requestFullscreen().catch((error)=>{});
    }
     if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen().catch((error)=>{});
    }  if (element.msRequestFullscreen) {
      element.msRequestFullscreen().catch((error)=>{});
    }

    return () => {
      if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    };
  }, []);

  useEffect(() => {
    if (Math.floor(score / 100) > hundreds) {
      setLifes(prev => prev + 1)
      setHundreds(prev => prev + 1)
    }
  }, [score])


  return (
    <div className="GamePage">
      <div className="score-board-div">
        <div className="rules-box">
          {<img className={`rules-cat`} src={Rules1} />}
          {<img style={{ opacity: level >= 2 ? '100%' : '0' }} className={`rules-cat`} src={Rules2} />}
          {<img style={{ opacity: level >= 3 ? '100%' : '0' }} className={`rules-cat`} src={Rules3} />}
          {<img style={{ opacity: level >= 4 ? '100%' : '0' }} className={`rules-cat`} src={Rules4} />}
          {<img style={{ opacity: level >= 5 ? '100%' : '0' }} className={`rules-cat`} src={Rules5} />}
        </div>
        <div
          className="score-div">
          <div>
            <b>Score:{score}</b>
          </div>
        </div>
        <div className="heart-wrapper">
          <img src={lifes > 0 ? heart : null} />
          <div>{lifes > 0 && lifes}</div>
        </div>
      </div>
      {loading&&<LoadingPage ></LoadingPage>}
      <Game
        lifes={lifes}
        setLifes={setLifes}
        score={score}
        setScore={setScore}
        level={level} setLevel={setLevel}
      ></Game>
      {lifes <= 0 && <DeathScreenPage setLoading={setLoading} />}
    </div>
  );
};
export default GamePage;
