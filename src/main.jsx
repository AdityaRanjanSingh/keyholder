import { insertCoin } from "playroomkit";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GameEngineProvider } from "./hooks/useGameEngine";
import "./index.css";
insertCoin({
  gameId: "7yiutgkh5Gy5WehkR7JO",
  streamMode: true,
  maxPlayersPerRoom: 10,
}).then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <GameEngineProvider>
        <App />
      </GameEngineProvider>
    </React.StrictMode>
  );
});
