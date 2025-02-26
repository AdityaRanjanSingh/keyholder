import { myPlayer } from "playroomkit";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useGameEngine } from "../hooks/useGameEngine";
import FlippingCard from "../components/Card";
import Header from "../components/Header";

const getPhaseTitle = (phase) => {
  let title = "";
  switch (phase) {
    case "ready":
      title = "Ready to start new round";
      break;
    case "role":
      title = "Assigning roles";
      break;
    case "wizard":
      title = "Revealing wizards";
      break;
    case "keyholder":
      title = "Revealing keyholder";
      break;
    case "discussion":
      title = "Discussion phase";
      break;
    case "stop":
      title = "Stop phase";
    case "result":
      title = "Winning team";
      break;
    case "ring":
      title = "Use magic ring";
      break;
    default:
      break;
  }
  return title;
};

export default () => {
  const navigate = useNavigate();
  const me = myPlayer();

  const [flipped, set] = useState(false);
  const { phase, phaseNo, players } = useGameEngine();

  return (
    <div className="overflow-scroll h-full">
      <Header></Header>
      {/* <div className="flex flex-wrap justify-center my-5 gap-1 gap-y-2">
        {players.map((player) => (
          <div key={player.id}>
            <p className="text-md">{player.getProfile().name}</p>
            <FlippingCard type={player.getState("role")} />
          </div>
        ))}
      </div> */}
      <div className="content-center" style={{ height: "90%" }}>
        <div className="flex-col my-5">
          <h1 className="text-6xl text-center">Ready to start</h1>
        </div>
        <div className="flex justify-center">
          <button className="btn btn-primary btn-wide">Start</button>
        </div>
      </div>
    </div>
  );
};
