import "./CSS/App.css";
import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Routes>
          <Route path="/game" element={<GamePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </ChakraProvider>
    </div>
  );
}

export default App;
