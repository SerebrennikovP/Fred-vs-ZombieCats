import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/DeathScreenCss.css";
import axios from "axios";
import { UserContextInstance } from "../context/UserContext";
import { Kbd } from "@chakra-ui/layout";

const DeathScreenPage = () => {
  const [expanding, setExpanding] = useState(false);
  const [renderDeathBackground, setRenderDeathBackground] = useState(false);
  const [userName, setUserName] = useState("");
  const { newUser, setNewUser,score, setScore} = useContext(UserContextInstance);

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
      if (event.keyCode === 13) {
        setScore(0)
        window.location.reload();
      } else if (event.keyCode === 32) {
        submitScore(); 
        setScore(0)
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

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
      console.log(res.data);
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

  return (
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
              <div className="deathLeaderBtn deathBtns" onClick={()=>{submitScore(); setScore(0)}}>
                <div className="space-icon-death">
                  <Kbd className="kbd spaceKbd">
                    <span className="spaceDeath">{"space"}</span>
                  </Kbd>
                </div>
                <div className="deathBtnText">save score</div>
              </div>
              <div
                className="deathRetryBtn deathBtns"
                onClick={() => {navigate("/game"); setScore(0)}}
              >
                <img src="../enter-key.svg" className="deathScreenKey" alt="" />{" "}
                <div className="deathBtnText">
                  rety
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DeathScreenPage;
