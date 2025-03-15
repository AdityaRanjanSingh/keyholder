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
      <div className="flex flex-row m-2 overflow-scroll gap-2">
        {players.map((play, index) => (
          <div
            key={index}
            className="bg-base-100 rounded-lg p-2 justify-items-center items-center"
          >
            <div className="justify-items-center">
              <div className="avatar">
                <div className="w-16 rounded-full">
                  <img src={play.getProfile().photo} />
                </div>
              </div>
              <h2 className="mx-2">{play.getProfile().name}</h2>
              {isHost() && (
                <button
                  className="btn btn-error btn-xs w-full"
                  onClick={() => {
                    play.kick();
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-2">
        <Question />
      </div>
      {phase === "answer" && <Timer className="my-5"></Timer>}
      {phase === "answer" && (
        <div className="flex-1 m-2 content-end">
          {/* <div className="flex flex-wrap mt-2">
          {answers.map((item) => (
            <span className="bg-accent text-xl text-accent-content rounded-full p-2 mr-2 mb-2">
              {item}
            </span>
          ))}
        </div> */}
          {phase === "answer" && (
            <>
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
      )}

      {phase === "result" && (
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            Most played songs this week
          </li>

          {answers.map((key) => (
            <li key={key} className="list-row">
              <div>
                <img
                  className="size-10 rounded-box"
                  src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                />
              </div>
              <div>
                <div>Dio Lupa</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  Remaining Reason
                </div>
              </div>
              <button className="btn btn-square btn-ghost">
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M6 3L20 12 6 21 6 3z"></path>
                  </g>
                </svg>
              </button>
              <button className="btn btn-square btn-ghost">
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </g>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* <Fab></Fab> */}
    </div>
  );
};
