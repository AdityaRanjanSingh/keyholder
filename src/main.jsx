import { insertCoin } from "playroomkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { GameEngineProvider } from "./hooks/useGameEngine";
import "./index.css";

import Experience from "./screens/Experience";

insertCoin({
  gameId: "a0xaPjlAzIDR2nXv4WKQ",
  reconnectGracePeriod: 5 * 60 * 1000,
}).then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <GameEngineProvider>
        <Experience></Experience>
      </GameEngineProvider>
    </React.StrictMode>
  );
});
