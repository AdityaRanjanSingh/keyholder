import { isHost, myPlayer, setState } from "playroomkit";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useGameEngine } from "../hooks/useGameEngine";
import FlippingCard from "../components/Card";
import Header from "../components/Header";
import FabButton from "../components/FabButton";
import { LettersPullUp } from "../components/gradual-spacing";

const getPhaseTitle = (phase) => {
  let title = "";
  switch (phase) {
    case "lobby":
      title = "Ready to start new round";
      break;
    case "shuffle":
      title = "Assigning roles";
      break;
    case "role-description":
      title = "role-description";
      break;
    case "role":
      title = "role";
      break;
    case "wizard-description":
      title = "wizard-description";
      break;
    case "wizard":
      title = "wizard";
      break;
    case "keyholder-description":
      title = "keyholder-description";
      break;
    case "keyholder":
      title = "keyholder";
      break;
    case "discussion-description":
      title = "discussion-description";
      break;
    case "discussion":
      title = "discussion";
      break;
    case "stop-description":
      title = "stop-description";
      break;
    case "stop":
      title = "stop";
      break;
    case "result-description":
      title = "result-description";
      break;
    case "result":
      title = "result";
      break;
    case "treasure-description":
      title = "treasure-description";
      break;
    case "treasure":
      title = "treasure";
      break;
    case "ring-description":
      title = "ring-description";
      break;
    case "ring":
      title = "ring";
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

  const isPlayerCardsVisible = [
    "ready",
    "role",
    "wizard",
    "keyholder",
    "stop",
  ].includes(phase);
  const isPhaseIntroductionVisible = [
    "lobby",
    "role-description",
    "wizard-description",
    "keyholder-description",
    "discussion-description",
    "stop-description",
    "result-description",
    "treasure-description",
    "ring-description",
  ].includes(phase);
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
      {isPhaseIntroductionVisible && (
        <div className="content-center" style={{ height: "90%" }}>
          <div className="flex-col my-5">
            <LettersPullUp text={title}></LettersPullUp>
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
