import { insertCoin } from "playroomkit";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GameEngineProvider } from "./hooks/useGameEngine";
import "./index.css";
import { config } from "@dotenvx/dotenvx";
config({ path: [".env.local", ".env"] });
insertCoin({
  gameId: process.env.GAME_ID,
  streamMode: true,
}).then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <GameEngineProvider>
        <App />
      </GameEngineProvider>
    </React.StrictMode>
  );
});
