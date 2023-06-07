import React, { useState, useEffect, useContext } from "react";
import BG from '../images/Zombie-Cats_BG.png'
import Cat1 from "../images/Zombie-cat-1.png"
import Cat2 from "../images/Zombie-cat-2.png"
import Cat3 from "../images/Zombie-cat-3.png"
import Cat4 from "../images/Zombie-cat-4.png"
import Cat5 from "../images/Zombie-cat-5.png"
import Heart from '../images/heart.png'
import Fred1 from '../images/Fred1.png'
import Fred2 from '../images/Fred2.png'
import Fred3 from '../images/Fred3.png'
import Fred4 from '../images/Fred4.png'
import Fred5 from '../images/Fred5.png'
import "../CSS/Game.css"
import Chance from 'chance';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { UserContextInstance } from "../context/UserContext";


const Game = ({ setLifes, lifes, level, setLevel }) => {
  const [ms, setMs] = useState(0);
  const [cats, setCats] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [position, setPosition] = useState(3)
  const [allCats, setAllCats] = useState([Cat1, Cat2, Cat3, Cat4, Cat5])
  const [heartCounter, setHeartCounter] = useState(0)
  const [reloading, setReloading] = useState(false)
  const [maxHearts, setMaxHearts] = useState(15)

  const {score, setScore } = useContext(UserContextInstance)

  const regex = /lifes(\d+)/;

  const chance = new Chance();

  useEffect(() => {
    setInterval(() => {
      setMs((prev) => prev + 1);
    }, 1);
  }, []);

  useEffect(() => {
    const elements = [
      { catElementAll: document.querySelectorAll(".line1"), heartElement: document.querySelector(".line1-heart") },
      { catElementAll: document.querySelectorAll(".line2"), heartElement: document.querySelector(".line2-heart") },
      { catElementAll: document.querySelectorAll(".line3"), heartElement: document.querySelector(".line3-heart") },
      { catElementAll: document.querySelectorAll(".line4"), heartElement: document.querySelector(".line4-heart") },
      { catElementAll: document.querySelectorAll(".line5"), heartElement: document.querySelector(".line5-heart") },
    ];

    elements.forEach(({ catElementAll, heartElement }) => {

      let heartZIndex;
      if (heartElement) heartZIndex = parseInt(getComputedStyle(heartElement).zIndex);
      if (heartZIndex === 0) setHearts(hearts.filter((el) => el.id != heartElement.id))
      const catElementArray = Array.from(catElementAll);
      catElementArray.forEach((catElement) => {
        let catZIndex;
        if (catElement) catZIndex = parseInt(getComputedStyle(catElement).zIndex)

        if (Math.abs(catZIndex - heartZIndex) < 150) {
          const match = catElement.className.match(regex);
          if (parseInt(match[1]) > 1) {
            setHearts(hearts.filter((el) => el.id != heartElement.id))
            catElement.classList.remove(`lifes${parseInt(match[1])}`)
            catElement.classList.add(`lifes${parseInt(match[1]) - 1}`)
            catElement.classList.add(`healing`)
            setTimeout(() => {
              catElement.classList.remove(`healing`)
            }, 100);
          } else {
            setHearts(hearts.filter((el) => el.id != heartElement.id))
            setCats(cats.filter((el) => el.id != catElement.id))


            //////////////////////////////SCORE//////////////////////////////

            if (catElement.className.includes('cat1')) setScore((prev) => prev + 1)
            if (catElement.className.includes('cat2')) setScore((prev) => prev + 3)
            if (catElement.className.includes('cat3')) setScore((prev) => prev + 10)
            if (catElement.className.includes('cat4')) setScore((prev) => prev + 20)
            if (catElement.className.includes('cat5')) setScore((prev) => prev + 50)

            //////////////////////////////SCORE//////////////////////////////
          }
        }
        if (catElement && parseInt(getComputedStyle(catElement).opacity) === 0) {
          setLifes((prev) => prev - 1);
          const queryFredAll = document.querySelectorAll(".fred");
          const queryFredArray = Array.from(queryFredAll);
          queryFredArray.forEach((FredElement) => {
            FredElement.classList.add("healing");
            setTimeout(() => {
              FredElement.classList.remove("healing");
            }, 100)
          })
          setCats(cats.filter((el) => el.id != catElement.id))
        }
      })
    });
  });

  useEffect(() => {
    let randomInterval
    let options
    let probabilities


    //////////////////////////////LEVELS//////////////////////////////
    if (ms < 10000) {
      randomInterval = Math.floor(Math.random() * 3000) + 1000;
      options = [1];
      probabilities = [100];
    } else if (ms < 20000) {
      randomInterval = Math.floor(Math.random() * 2500) + 500;
      options = [1, 2];
      probabilities = [70, 30];
      setLevel(prev => prev + 1)
    } else if (ms < 30000) {
      randomInterval = Math.floor(Math.random() * 2000) + 500;
      options = [1, 2, 3];
      probabilities = [50, 30, 20];
      setLevel(prev => prev + 1)
    } else if (ms < 40000) {
      randomInterval = Math.floor(Math.random() * 2000) + 250;
      options = [1, 2, 3, 4];
      setMaxHearts(30)
      probabilities = [45, 25, 20, 10];
      setLevel(prev => prev + 1)
    } else if (ms < 60000) {
      randomInterval = Math.floor(Math.random() * 1500);
      options = [1, 2, 3, 4, 5];
      probabilities = [35, 25, 20, 15, 5];
      setLevel(prev => prev + 1)
    } else {
      randomInterval = Math.floor(Math.random() * 1000);
      options = [1, 2, 3, 4, 5];
      setMaxHearts(100)
      probabilities = [5, 35, 30, 20, 10];
      setLevel(prev => prev + 1)
    }

    //////////////////////////////LEVELS//////////////////////////////

    const timeout = setTimeout(() => {
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
          if (!reloading) {
            const newHeart = {
              id: Date.now(),
              line: position
            };
            setHearts((prevHearts) => [...prevHearts, newHeart]);
            setHeartCounter(prev => prev + 1);
          }
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
  });

  useEffect(() => {
    if (heartCounter === maxHearts) {
      setReloading(true)
      setTimeout(() => {
        setReloading(false)
        setHeartCounter(0)
      }, 4000);
    }
  }, [heartCounter])

  const renderTime = ({ remainingTime }) => {
    return (
      <div className="timer">
        <div className="text">reloading</div>
        <div className="value">{remainingTime}</div>
      </div>
    );
  };


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
      {!reloading && lifes > 0 && <div className={`ammo ammo${position}`}>{maxHearts - heartCounter}</div>}
      {reloading && lifes > 0 && <div className={`timer-wrapper timer-wrapper${position}`}>
        <CountdownCircleTimer
          isPlaying
          duration={4}
          size={window.innerWidth * 0.12}
          strokeWidth={window.innerWidth * 0.008}
          colors={["#bf1b1b", "#bf1b1b", "#59220e", "#000000"]}
          colorsTime={[10, 6, 3, 0]}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>}

      {lifes > 0 && <img style={{ opacity: position === 1 ? '40%' : '0' }} className={`fred`} src={Fred1} />}
      {lifes > 0 && <img style={{ opacity: position === 2 ? '40%' : '0' }} className={`fred`} src={Fred2} />}
      {lifes > 0 && <img style={{ opacity: position === 3 ? '40%' : '0' }} className={`fred`} src={Fred3} />}
      {lifes > 0 && <img style={{ opacity: position === 4 ? '40%' : '0' }} className={`fred`} src={Fred4} />}
      {lifes > 0 && <img style={{ opacity: position === 5 ? '40%' : '0' }} className={`fred`} src={Fred5} />}

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

          //////////////////LIFES//////////////////

          className={`lifes${cat.num === 2 ? 3 : cat.num === 4 ? 4 : cat.num === 5 ? 10 : 1} cats cat${cat.num} line${cat.line}`}

          //////////////////LIFES//////////////////

          src={allCats[cat.num - 1]}
        />
      ))}
    </div>
  );
};

export default Game;
