import { insertCoin } from "playroomkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { GameEngineProvider } from "./hooks/useGameEngine";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Discussion from "./screens/discussion";
import Stop from "./screens/stop";
import Treasure from "./screens/treasure";
import Role from "./screens/role";
import Wizard from "./screens/wizard";
import Keyholder from "./screens/keyholder";
import Ring from "./screens/ring";
import End from "./screens/end";
import Experience from "./screens/Experience";

insertCoin({
  gameId: "a0xaPjlAzIDR2nXv4WKQ",
  maxPlayersPerRoom: 10,
  reconnectGracePeriod: 10 * 60 * 1000,
}).then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <GameEngineProvider>
        <Experience></Experience>
      </GameEngineProvider>
    </React.StrictMode>
  );
});
