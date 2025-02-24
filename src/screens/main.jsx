import { insertCoin } from "playroomkit";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GameEngineProvider } from "./hooks/useGameEngine";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Learn from "./screens/Learn";
import PlayerRole from "./screens/Role";
import Discussion from "./screens/Discussion";
import Introduction from "./wizard";

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
            <Route index element={<Introduction />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/introduction" element={<Introduction />} />
            <Route path="/discussion" element={<Discussion />} />
            <Route path="/stop" element={<Discussion />} />
          </Routes>
        </BrowserRouter>
      </GameEngineProvider>
    </React.StrictMode>
  );
});
