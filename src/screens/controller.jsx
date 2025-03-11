import { getState, isHost, myPlayer, setState } from "playroomkit";
import { useEffect, useMemo, useState } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import Header from "../components/Header";
import FabButton from "../components/FabButton";
import { AnimatePresence, motion } from "motion/react";
import Question from "./question";
import Player from "../components/Player";
import "./styles.css";
import { animate } from "motion";
import Timer from "../components/Timer";
import Fab from "../components/Fab";
import Navbar from "../components/Navbar";

export default () => {
  const me = myPlayer();

  const { phase, answers, players } = useGameEngine();

  const [answer, setAnswer] = useState("");
  const myIndex = players.findIndex((player) => player.id === me.id);
  const onSubmit = () => {
    me.setState("answer", answer, true);

    const isExisting = answers.find((item) => item === answer);

    if (!isExisting) {
      setState("answers", [...answers, answer]);
    }
  };
  return (
    <div className="flex flex-col h-full bg-neutral">
      <Navbar></Navbar>
      <div className="m-5 flex-1">
        {phase === "question" && <Question />}
        <div className="flex flex-wrap mt-2">
          {answers.map((item) => (
            <span className="bg-accent text-xl text-accent-content rounded-full p-2 mr-2 mb-2">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-5 rounded-xl">
        <input
          type="text"
          placeholder="Your answer"
          className="input input-xl w-full border-2"
          onChange={(event) => setAnswer(event.target.value)}
        />
      </div>
      <div className="m-2 mx-5">
        <button className="btn w-full btn-primary" onClick={onSubmit}>
          Submit
        </button>
      </div>
      <div className="mb-10"></div>

      {/* <Fab></Fab> */}
    </div>
  );
};
