import React, { useEffect, useState } from "react";
import "../CSS/ScoreBoard.css";
import axios from "axios";

const ScoreboardPage = () => {
  const [scoresList, setScoresList] = useState([]);

  const getScore = async () => {
    try {
      const res = await axios.get("http://localhost:8080/scoreboard");
      setScoresList(res.data);
      //   console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getScore();
  }, []);

  return (
    <div className="backgroundSquare">
      <button onClick={getScore}> Get score</button>
      <div className="ScoreboardTabble">
        {scoresList.map((user) => (
          <div className="ScoreboardTabbleUser">
            <div className="userNickname userText">{user.Nickname}</div>{" "}
            <div className="userScore userText"> {user.Scores}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreboardPage;
