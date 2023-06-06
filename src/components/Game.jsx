import React, { useState, useEffect } from "react";
import BG from '../images/Zombie-Cats_BG.png'
import Cat1 from "../images/Zombie-cat-1.png"
import Cat2 from "../images/Zombie-cat-2.png"
import Heart from '../images/heart.png'
import Fred from '../images/Fred.png'
import "../CSS/Game.css"
import Chance from 'chance';


const Game = () => {
  const [ms, setMs] = useState(0);
  const [lifes, setLifes] = useState(3000000);
  const [cats, setCats] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [position, setPosition] = useState(3)
  const [allCats, setAllCats] = useState([Cat1, Cat2])

  const chance = new Chance();

  useEffect(() => {
    setInterval(() => {
      setMs((prev) => prev + 1);
    }, 1);
  }, []);

  useEffect(() => {
    const elements = [
      { catElement: document.querySelector(".line1"), heartElement: document.querySelector(".line1-heart") },
      { catElement: document.querySelector(".line2"), heartElement: document.querySelector(".line2-heart") },
      { catElement: document.querySelector(".line3"), heartElement: document.querySelector(".line3-heart") },
      { catElement: document.querySelector(".line4"), heartElement: document.querySelector(".line4-heart") },
      { catElement: document.querySelector(".line5"), heartElement: document.querySelector(".line5-heart") },
    ];

    elements.forEach(({ catElement, heartElement }) => {
      let catZIndex;
      let heartZIndex;
      if (catElement) catZIndex = parseInt(getComputedStyle(catElement).zIndex)
      if (heartElement) heartZIndex = parseInt(getComputedStyle(heartElement).zIndex);

      if (Math.abs(catZIndex - heartZIndex) < 100) {
        setCats(cats.filter((el) => el.id != catElement.id))
        setHearts(hearts.filter((el) => el.id != heartElement.id))
      }
      if (heartZIndex === 0) {
        setHearts(hearts.filter((el) => el.id != heartElement.id))
      }
      if (catElement && parseInt(getComputedStyle(catElement).opacity) === 0) {
        setLifes((prev) => prev - 1);
        setCats(cats.filter((el) => el.id != catElement.id))
      }
    });
  });

  useEffect(() => {
    const randomInterval = ms > 10000 ? Math.floor(Math.random() * 2000) : Math.floor(Math.random() * 4000) + 1000
    const timeout = setTimeout(() => {
      const options = [1, 2];
      const probabilities = [80, 20];

      const newCat = {
        id: Date.now() + Math.floor(Math.random() * 100),
        line: Math.floor(Math.random() * 5) + 1,
        num: chance.weighted(options, probabilities)
      };
      setCats((prevCats) => [...prevCats, newCat]);
    }, randomInterval);

    return () => {
      clearTimeout(timeout)
    };
  }, [cats]);

  useEffect(() => {
    const handleKeyUp = (event) => {
      switch (event.code) {
        case "Space": {
          const newHeart = {
            id: Date.now(),
            line: position
          };
          setHearts((prevHearts) => [...prevHearts, newHeart]);
        }
          break;
        case "ArrowLeft": {
          position > 1 && setPosition(prev => prev - 1)
        }
          break;
        case "ArrowRight": {
          position < 5 && setPosition(prev => prev + 1)
        }
          break;
      }
    }

    lifes > 0 && window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [position]);

  return (
    <div
      className="Game"
      style={{
        backgroundImage: `url(${BG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        height: "calc(100vw / (16 / 9))",
        overflow: "hidden",
      }}
    >
      {lifes > 0 && <img className={`fred line${position}-fred`} src={Fred} />}

      {lifes > 0 && hearts.map((heart) => (
        <img
          key={heart.id}
          id={heart.id}
          className={`heart line${heart.line}-heart`}
          src={Heart}
        />
      ))}
      {cats.map((cat) => (
        <img
          key={cat.id}
          id={cat.id}
          className={`cats cat${cat.num} line${cat.line}`}
          src={allCats[cat.num - 1]}
        />
      ))}
    </div>
  );
};

export default Game;
