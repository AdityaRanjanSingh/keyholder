import { insertCoin } from "playroomkit";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GameEngineProvider } from "./hooks/useGameEngine";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Learn from "./screens/Learn";

insertCoin({
  gameId: "a0xaPjlAzIDR2nXv4WKQ",
  maxPlayersPerRoom: 10,
  reconnectGracePeriod: 10 * 60 * 1000,
}).then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <GameEngineProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<App />} />
            <Route path="/learn" element={<Learn />} />
          </Routes>
        </BrowserRouter>
      </GameEngineProvider>
    </React.StrictMode>
  );
});
