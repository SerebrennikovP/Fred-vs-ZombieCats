import "./CSS/App.css";
import React from "react";
import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ScoreboardPage from "./components/ScoreboardPage";
import DeathScreenPage from "./components/DeathScreenPage";
import UserContextInstance from "./context/UserContext";
import MusicContextInstance from "./context/MusicContext";

function App() {

  return (
    <div className="App">
      <UserContextInstance>
        <MusicContextInstance>
          <ChakraProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/Scoreboard" element={<ScoreboardPage />} />
              <Route path="/death" element={<DeathScreenPage />} />
            </Routes>
          </ChakraProvider>
        </MusicContextInstance>
      </UserContextInstance>
    </div>
  );
}

export default App;
