import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/ScoreBoard.css";
import axios from "axios";
import { UserContextInstance } from "../context/UserContext";
import { async } from "q";

const ScoreboardPage = () => {
  const [scoresList, setScoresList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const { newUser, setNewUser } = useContext(UserContextInstance);

  const navigate = useNavigate();

  const getCurrentUser = async () => {
    try {
      const resCurrent = await axios.post(
        "https://fred-vs-zombie-cats-server-n0ixkhh54-bumbox.vercel.app/user",
        newUser
      );

      // console.log(resCurrent.data[0])
      setCurrentUser(resCurrent.data[0]);
    } catch (err) {}
  };

  const getScore = async () => {
    try {
      const res = await axios.get(
        "https://fred-vs-zombie-cats-server-n0ixkhh54-bumbox.vercel.app/scoreboard"
      );
      // console.log(newUser.userId)
      const rawScoresList = res.data;
      setScoresList(rawScoresList);
      getCurrentUser();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getScore();
  }, []);

  useEffect(() => {
    return () => {
      setNewUser({ Nickname: "", Scores: "", userId: "" });
    };
  }, []);

  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.keyCode === 13) {
        navigate("/game")
        console.log('Enter key pressed');
      } else if (event.keyCode === 27) {
        navigate("/")
        console.log('Escape key pressed');
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
      <div className="background-image-Score">
    <div className="backgroundSquareScore">
      <div className="scoreEscBtn scoreBtns" onClick={() => navigate("/")}>
        <img src="../escape-key.svg" className="deathScreenKey" alt="" />
        main menu
      </div>
      <div className="ScoreboardTabble">
        {currentUser.place && (
          <div className="currentUserScore">
            <div className="ScoreboardTabbleUser currentUser">
              <div className="userPlace">
                <div className="userText userPlace">{currentUser.place}.</div>
                <div className="userNickname userText">
                  {currentUser.Nickname}
                </div>{" "}
              </div>
              <div className="userScore userText"> {currentUser.Scores}</div>
            </div>
          </div>
        )}
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
        <img src="../enter-key.svg" className="deathScreenKey" alt="" /> retry
      </div>
    </div>
    </div>
  );
};

export default ScoreboardPage;
