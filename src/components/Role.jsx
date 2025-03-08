import { isHost, myPlayer, setState } from "playroomkit";
import { useEffect, useMemo, useState } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import FlippingCard from "../components/Card";

import { TextFade } from "../components/text-fade";
import Player from "./Player";

const getPhaseIntro = (phase) => {
  let title = "";
  let description = "";
  switch (phase) {
    case "lobby":
      title = "Ready to start new round";
      break;
    case "shuffle":
      title = "Assigning roles";
      break;
    case "role-description":
      title = "Assign Roles";
      description =
        "The roles have been assigned! Keep your identity secret and prepare for the game ahead.";
      break;
      break;
    case "wizard-description":
      title = "Revealing Wizards";
      description = "Revealing wizards to the rest of the group";
      break;
    case "keyholder-description":
      title = "Revealing Keyholders";
      description =
        "Keyholders will be revealed to everyone except the wizards";
      break;
    case "discussion-description":
      title = "Start Discussion";
      description =
        "The discussion begins! Who can be trusted, and who is the traitor? Choose your words wisely!";
      break;
    case "stop-description":
      title = "Play is Stopped by X Player";
      description =
        "Player [X] has stopped the round! They will select a player to reveal their role";
      break;
    case "stop":
      title = "stop";
      break;
    case "result-description":
      title = "Player Has Made a Correct Guess – Good Team or Evil Player Wins";
      break;
    case "result":
      title = "result";
      break;
    case "treasure-description":
      title = "Distributing Treasure";
      description =
        "The treasure is being divided! The winning team gets a random treasure card.";
      break;
    case "treasure":
      title = "treasure";
      break;
    case "ring-description":
      title = "Ring Phase";
      break;
    case "ring":
      title = "ring";
      break;
    default:
      title = phase;
      break;
  }
  return { title, description };
};

const getRoleDescription = (role) => {
  const isEvilTeam = ["wizard-evil", "traitor"].includes(role);
  if (isEvilTeam) return "You are in the evil team";
  return "You are in the good team";
};
export default () => {
  const me = myPlayer();

  const { phase, phaseNo, players } = useGameEngine();
  const myIndex = players.findIndex((player) => player.id === me.id);

  const role = me.getState("role");
  const roleDesc = useMemo(() => getRoleDescription(role), [role]);

  const isPlayerCardsVisible = ["wizard", "keyholder", "stop"].includes(phase);

  return (
    <div className="">
      <Player index={myIndex} />
    </div>
  );
};
