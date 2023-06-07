import React from "react";
import { createContext, useState } from "react";

const UserContextInstance = createContext([]);

const UserContext = ({ children }) => {
  const [newUser, setNewUser] = useState({
    Nickname: "",
    Scores: "",
    userId: "",
  });
  const [score, setScore] = useState(0);

  return (
    <UserContextInstance.Provider
      value={{
        newUser,
        setNewUser,
        score,
        setScore,
      }}
    >
      {children}
    </UserContextInstance.Provider>
  );
};

export { UserContextInstance };
export default UserContext;
