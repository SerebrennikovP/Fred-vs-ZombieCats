import React from "react";
import { createContext, useEffect, useState } from "react";

const UserContextInstance = createContext([]);

const UserContext = ({ children }) => {
  const [newUser, setNewUser] = useState({Nickname: "",
    Scores: "",
    userId: ""});

  return (
    <UserContextInstance.Provider
      value={{
        newUser,
        setNewUser,
      }}
    >
      {children}
    </UserContextInstance.Provider>
  );
};

export { UserContextInstance };
export default UserContext;
