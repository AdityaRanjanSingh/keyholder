import { isHost, myPlayer, setState } from "playroomkit";
import { useEffect, useMemo, useState } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import Header from "../components/Header";
import FabButton from "../components/FabButton";
import { AnimatePresence, motion } from "motion/react";
import Player from "../components/Player";
import "./styles.css";
import { animate } from "motion";
import Timer from "../components/Timer";
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
      break;
  }
  return title;
};

const getRoleDescription = (role) => {
  const isEvilTeam = ["wizard-evil", "traitor"].includes(role);
  if (isEvilTeam) return "You are in the evil team";
  return "You are in the good team";
};
export default () => {
  const me = myPlayer();

  const { phase, phaseNo, players, timer } = useGameEngine();

  const myIndex = players.findIndex((player) => player.id === me.id);
  const phaseTitle = useMemo(() => getPhaseIntro(phase), [phase]);

  const showMessage = () => {
    animate(
      ".messages",
      {
        height: "100%",
        width: "100%",
        opacity: 1,
      },
      {
        duration: 1,
      }
    );
  };
  const hideMessage = () => {
    animate(
      ".messages",
      {
        height: 0,
        width: "100%",
        opacity: 0,
      },
      {
        duration: 1,
      }
    );
  };

  useEffect(() => {
    if (
      [
        "role-description",
        "wizard-description",
        "keyholder-description",
        "discussion-description",
      ].includes(phase)
    ) {
      showMessage();
    }
    if (["role", "wizard", "keyholder", "stop-description"].includes(phase)) {
      hideMessage();
    }
  }, [phase]);

  return (
    <div className="flex flex-col h-full ">
      <Header></Header>
      <motion.div initial={{ height: "auto", opacity: 1 }} className="players">
        {players.map((player, index) => (
          <motion.div key={index}>
            <Player index={index}></Player>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        initial={{
          height: 0,
          opacity: 0,
          width: "100%",
          backgroundColor: "#ffadad",
        }}
        className="flex flex-col justify-center items-center messages absolute bottom-0 text-primary-content content-center "
      >
        <h1 className="text-3xl text-center">{phaseTitle}</h1>
        {phase === "discussion" && <Timer></Timer>}
        {timer === 0 && phase === "discussion" && (
          <button className="btn btn-circle btn-lg" onClick={() => {}}>
            Stop
          </button>
        )}
      </motion.div>
      <FabButton></FabButton>
    </div>
  );
};
