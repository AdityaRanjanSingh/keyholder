import { isHost, myPlayer, setState } from "playroomkit";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useGameEngine } from "../hooks/useGameEngine";
import FlippingCard from "../components/Card";
import Header from "../components/Header";
import FabButton from "../components/FabButton";
import { TextFade } from "../components/text-fade";
import Lobby from "../components/Lobby";
import { AnimatePresence, motion } from "framer-motion";
import Discussion from "../components/Discussion";
import Role from "../components/Role";

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

  const introduciton = useMemo(() => getPhaseIntro(phase), [phase]);
  const onStartGame = () => {
    setState("phase", "shuffle", true);
  };
  const role = me.getState("role");
  const roleDesc = useMemo(() => getRoleDescription(role), [role]);

  const isPlayerCardsVisible = ["wizard", "keyholder", "stop"].includes(phase);
  const isPhaseIntroductionVisible = [
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
    <>
      <div className="flex-col my-5 content-center">
        <TextFade
          direction="up"
          className="pt-0 pb-5 flex-col flex justify-center items-center space-y-0"
        >
          <h2 className="text-4xl text-center sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[0rem] prose-h2:my-0 mx-5">
            {introduciton.title}
          </h2>
          {introduciton.description && (
            <div className="prose-p:my-1 text-center md:text-lg max-w-lg mx-auto text-balance dark:text-zinc-300">
              {introduciton.description}
            </div>
          )}
        </TextFade>
      </div>
      {isHost() && phase === "lobby" && (
        <div className="flex justify-center">
          <button onClick={onStartGame} className="btn btn-primary btn-wide">
            Start
          </button>
        </div>
      )}
    </>
  );
};
