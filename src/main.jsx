import { insertCoin } from "playroomkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { GameEngineProvider } from "./hooks/useGameEngine";
import "./index.css";

import Controller from "./screens/controller";

insertCoin({
  gameId: "a0xaPjlAzIDR2nXv4WKQ",
  reconnectGracePeriod: 5 * 60 * 1000,
}).then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <GameEngineProvider>
        <Controller />
      </GameEngineProvider>
    </React.StrictMode>
  );
});
