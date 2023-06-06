import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/DeathScreenCss.css";
import axios from "axios";
import { UserContextInstance } from "../context/UserContext";

const DeathScreenPage = () => {
  const [expanding, setExpanding] = useState(false);
  const [renderDeathBackground, setRenderDeathBackground] = useState(false);
  const [userName, setUserName] = useState("");
  const { newUser, setNewUser } = useContext(UserContextInstance);

  const navigate = useNavigate();

  //PLACEHOLDER SCORES//
  const scores = 1679;

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

  setNewUser({
    Nickname: userName,
    Scores: scores,
  });
  
  const submitScore = async () => {
    try {
      if (newUser.Nickname == "") {
        newUser.Nickname = "Fred";
      }
      const res = await axios.post("http://localhost:8080/newscore", newUser);
      console.log(res.data)
      setNewUser({
        Nickname: userName,
        Scores: scores,
        userId: res.data.userId[0]
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
            <p>
              You Died
              <p className="scoreCount">Your score: </p>
              <div className="NicknameDiv">
                <p className="scoreCount">
                  Nickname:{" "}
                  <input
                    className="nicknameInput"
                    placeholder="Your Nickname"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    autoFocus
                  ></input>{" "}
                </p>
              </div>
            </p>
            <div className="deathLeaderBtnsDiv">
              <div className="deathLeaderBtn deathBtns" onClick={submitScore}>
                <img src="../space-key.svg" className="deathScreenKey" alt="" />
                Press space to save score
              </div>
              <div
                className="deathRetryBtn deathBtns"
                onClick={() => navigate("/game")}
              >
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

export default DeathScreenPage;
