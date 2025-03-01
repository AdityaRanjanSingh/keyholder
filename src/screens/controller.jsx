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
import Introduction from "../components/Introduction";
import Player from "../components/Player";
import "./styles.css";
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
    <div className="flex flex-col h-full background">
      <Header></Header>
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 justify-center"
        >
          {isPlayerCardsVisible && (
            <motion.div className="">
              {players.map((player, index) => (
                <div key={index} className="rounded-box flex-col">
                  <Player index={index}></Player>
                </div>
              ))}
            </motion.div>
          )}
          {phase === "lobby" && <Lobby></Lobby>}
          {phase === "discussion" && <Discussion></Discussion>}
          {phase === "role" && <Role></Role>}

          {isPhaseIntroductionVisible && <Introduction />}
        </motion.div>
      </AnimatePresence>
      <FabButton></FabButton>
    </div>
  );
};
