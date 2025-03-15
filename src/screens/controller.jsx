import { getState, isHost, myPlayer, setState } from "playroomkit";
import { useEffect, useMemo, useState } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import Question from "./question";
import Timer from "../components/Timer";
import "./styles.css";
import Navbar from "../components/Navbar";

export default () => {
  const me = myPlayer();

  const { phase, answers, players, playerTurn } = useGameEngine();

  const [answer, setAnswer] = useState("");

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
      <div className="flex flex-row gap-2 m-2 ">
        {players.map((play) => (
          <div className="bg-base-100 p-2 rounded-lg justify-items-center">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img src={play.getProfile().photo} />
              </div>
            </div>
            <h2 className="">{play.getProfile().name}</h2>
          </div>
        ))}
      </div>
      <div className="m-5 flex-1 content-center">
        {phase === "question" && <Question />}
        {/* <div className="flex flex-wrap mt-2">
          {answers.map((item) => (
            <span className="bg-accent text-xl text-accent-content rounded-full p-2 mr-2 mb-2">
              {item}
            </span>
          ))}
        </div> */}
        {phase === "answer" && (
          <>
            <Timer className="my-5"></Timer>
            <div className="rounded-xl">
              <input
                type="text"
                placeholder="Your answer"
                className="input input-xl w-full border-2"
                onChange={(event) => setAnswer(event.target.value)}
              />
            </div>
            <div className="my-2">
              <button className="btn w-full btn-primary" onClick={onSubmit}>
                Submit
              </button>
            </div>
          </>
        )}
      </div>

      {/* <Fab></Fab> */}
    </div>
  );
};
