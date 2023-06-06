import "./CSS/App.css";
import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ScoreboardPage from "./components/ScoreboardPage";
import DeathScreenPage from "./components/DeathScreenPage";
import UserContextInstance from "./context/UserContext";



function App() {
  return (
    <div className="App">
      <UserContextInstance>
      <ChakraProvider>
        <Routes>
          <Route path="/game" element={<GamePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/Scoreboard" element={<ScoreboardPage/>} />
          <Route path="/death" element={<DeathScreenPage/>} />
        </Routes>
      </ChakraProvider>
      </UserContextInstance>
    </div>
  );
}

export default App;
