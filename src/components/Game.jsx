import React, { useState, useEffect } from "react";
import BG from '../images/Zombie-Cats_BG.png'
import Cat1 from "../images/Zombie-cat-1.png"
import Heart from '../images/heart.png'
import "../CSS/Game.css"

const Game = () => {
  const [ms, setMs] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setMs(prev => prev + 1)
    }, 1);
  })


  useEffect(() => {
    const elements = [
      { catElement: document.querySelector(".line1"), heartElement: document.querySelector(".line1-heart") },
      { catElement: document.querySelector(".line2"), heartElement: document.querySelector(".line2-heart") },
      { catElement: document.querySelector(".line3"), heartElement: document.querySelector(".line3-heart") },
      { catElement: document.querySelector(".line4"), heartElement: document.querySelector(".line4-heart") },
      { catElement: document.querySelector(".line5"), heartElement: document.querySelector(".line5-heart") },
    ];
  
    elements.forEach(({ catElement, heartElement }) => {
      if (catElement && heartElement) {
        const catWidth = parseInt(getComputedStyle(catElement).width);
        const heartWidth = parseInt(getComputedStyle(heartElement).width);
  
        if (Math.abs(catWidth - heartWidth) < 5) {
          catElement.remove();
          heartElement.remove();
        }
        if (heartWidth === 0) {
          heartElement.remove();
        }
        if (getComputedStyle(catElement).display === 'none') {
          console.log('hi')
          catElement.remove();
        }
      }
    });
  });
  

  return (
    <div className="Game" style={{
      backgroundImage: `url(${BG})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100%',
      height: 'calc(100vw / (16 / 9))',
      overflow: 'hidden'
    }}>
      <img className="heart line1-heart" src={Heart} />
      <img className="cat1 line1" src={Cat1} />
      <img className="heart line2-heart" src={Heart} />
      <img className="cat1 line2" src={Cat1} />
      {/* <img className="heart line3-heart" src={Heart} /> */}
      <img className="cat1 line3" src={Cat1} />
      <img className="heart line4-heart" src={Heart} />
      <img className="cat1 line4" src={Cat1} />
      <img className="heart line5-heart" src={Heart} />
      <img className="cat1 line5" src={Cat1} />
    </div>
  );
};
export default Game;

