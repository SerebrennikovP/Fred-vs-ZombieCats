import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/ScoreBoard.css";
import axios from "axios";
import { UserContextInstance } from "../context/UserContext";

const ScoreboardPage = () => {
  const [scoresList, setScoresList] = useState([]);
  const { newUser, setNewUser } = useContext(UserContextInstance);


  const navigate = useNavigate();

  const getScore = async () => {
    try {
      const res = await axios.get("http://localhost:8080/scoreboard");
      const rawScoresList = res.data;
      setScoresList(rawScoresList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getScore();
  }, []);

  useEffect(() => {
    return () => {
      setNewUser({Nickname: "",
      Scores: "",
      userId: ""})
    };
  }, [])

  return (
    <div className="backgroundSquare">
      <div className="scoreEscBtn scoreBtns deathBtns" onClick={()=>navigate("/")}>
        <img src="../escape-key.svg" className="deathScreenKey" alt="" />
        to main menu
      </div>
      <div className="ScoreboardTabble">
        {scoresList.slice(0, 7).map((user) => (
          <div className="ScoreboardTabbleUser">
            <div className="userPlace">
              <div className="userText userPlace">{user.place}.</div>
              <div className="userNickname userText">{user.Nickname}</div>{" "}
            </div>
            <div className="userScore userText"> {user.Scores}</div>
          </div>
        ))}
      </div>
      <div
        className="scoreRetryBtn scoreBtns"
        onClick={() => navigate("/game")}
      >
        <img src="../enter-key.svg" className="deathScreenKey" alt="" /> To retry
      </div>
    </div>
  );
};

export default ScoreboardPage;
