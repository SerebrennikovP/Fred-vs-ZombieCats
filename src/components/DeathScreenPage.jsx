import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/DeathScreenCss.css";
import axios from "axios";
import { UserContextInstance } from "../context/UserContext";
import { MusicContextInstance } from "../context/MusicContext";
import ReactAudioPlayer from 'react-audio-player';

const DeathScreenPage = () => {
  const [expanding, setExpanding] = useState(false);
  const [renderDeathBackground, setRenderDeathBackground] = useState(false);
  const [userName, setUserName] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { newUser, setNewUser, score, setScore } = useContext(UserContextInstance);
  const { Dead, muted } = useContext(MusicContextInstance);


  const navigate = useNavigate();

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


  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.keyCode === 27) {
        window.location.reload();
      }
      if (event.keyCode === 13) {
        submitScore();
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  });

  useEffect(() => {
    setNewUser({
      Nickname: userName,
      Scores: score,
    });
  }, [userName]);

  const submitScore = async () => {
    try {
      if (newUser.Nickname == "") {
        newUser.Nickname = "Fred";
      }
      const res = await axios.post("https://fred-vs-zombie-cats-server-n0ixkhh54-bumbox.vercel.app/newscore", newUser);
      setNewUser({
        Nickname: userName,
        Scores: score,
        userId: res.data.userId[0],
      });
      navigate("/Scoreboard");
    } catch (err) {
      console.log(err);
    }
  };

  

  return (<>
    {!muted && <ReactAudioPlayer
      src={Dead}
      autoPlay={true}
      loop={true}
      muted={muted}
    />}
    <div className={`expanding-square ${expanding ? "expand" : ""}`}>
      {renderDeathBackground && (
        <>
          <div className="death-background">
            <p className="youDied">
              You Died
              <p className="scoreCount">Your score: {score}</p>
              <div className="NicknameDiv">
                <p className="scoreCount">
                  Nickname:{" "}
                  <input
                    className="nicknameInput"
                    placeholder="Enter Nickname"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    maxLength={16}
                    autoFocus
                  ></input>{" "}
                </p>
              </div>
            </p>
            <div className="deathLeaderBtnsDiv">
              <div className="deathBtns" onClick={() => { window.location.reload() }}>
                <img src="../escape-key.svg" className="deathScreenKey" alt="" />{" "}
                <div className="deathBtnText">retry</div>
              </div>
              <div
                className="deathBtns"
                disabled={isButtonDisabled}
                onClick={() => { submitScore(); setIsButtonDisabled(true); }}
              >
                <img src="../enter-key.svg" className="deathScreenKey" alt="" />{" "}
                <div className="deathBtnText">
                  save score
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div></>
  );
};

export default DeathScreenPage;
