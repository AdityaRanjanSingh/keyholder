import { isHost, myPlayer, setState } from "playroomkit";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useGameEngine } from "../hooks/useGameEngine";
import FlippingCard from "../components/Card";
import Header from "../components/Header";
import FabButton from "../components/FabButton";

const getPhaseTitle = (phase) => {
  let title = "";
  switch (phase) {
    case "lobby":
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
      title = phase;
      break;
  }
  return title;
};

export default () => {
  const me = myPlayer();

  const { phase, phaseNo, players } = useGameEngine();

  const title = useMemo(() => getPhaseTitle(phase), [phase]);
  const onStartGame = () => {
    setState("phase", "shuffle", true);
  };

  const isPlayerCardsVisible = ["ready", "role-description", "role"].includes(
    phase
  );
  return (
    <div className="overflow-scroll h-full">
      <Header></Header>
      {isPlayerCardsVisible && (
        <div className="flex flex-wrap justify-center my-5 gap-1 gap-y-2">
          {players.map((player) => (
            <div key={player.id}>
              <p className="text-md">{player.getProfile().name}</p>
              <FlippingCard type={player.getState("role")} />
            </div>
          ))}
        </div>
      )}
      {phase === "lobby" && (
        <div className="content-center" style={{ height: "90%" }}>
          <div className="flex-col my-5">
            <h1 className="text-5xl text-center">{title}</h1>
          </div>
          {isHost() && phase === "lobby" && (
            <div className="flex justify-center">
              <button
                onClick={onStartGame}
                className="btn btn-primary btn-wide"
              >
                Start
              </button>
            </div>
          )}
        </div>
      )}
      <FabButton></FabButton>
    </div>
  );
};
