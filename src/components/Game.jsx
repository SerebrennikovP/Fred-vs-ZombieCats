import React from "react";
import BG from '../images/Zombie-Cats_BG.png'
import Cat1 from "../images/Zombie-cat-1.png"
import "../CSS/Game.css"

const Game = () => {

  return (
    <div className="Game" style={{
      backgroundImage: `url(${BG})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100%',
      height: 'calc(100vw / (16 / 9))',
      overflow: 'hidden'
    }}>
      <img className="cat1 line1" src={Cat1} />
      <img className="cat1 line2" src={Cat1} />
      <img className="cat1 line3" src={Cat1} />
      <img className="cat1 line4" src={Cat1} />
      <img className="cat1 line5" src={Cat1} />
    </div>
  );
};
export default Game;
