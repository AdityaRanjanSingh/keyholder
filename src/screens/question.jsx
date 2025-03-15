import { useEffect, useMemo, useState } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import { myPlayer, setState } from "playroomkit";

export default () => {
  const questions = [
    "What is the best flavour of chips?",
    "Name the biggest fruit you can fit in your mouth without chopping it up?",
    "Name a very cold country?",
    "What gets passed around?",
    "Other than illness, name an acceptable excuse for missing work?",
  ];

  const { playerTurn, players, phase } = useGameEngine();
  const me = myPlayer();
  const myIndex = players.findIndex((player) => player.id === me.id);
  const playerName = useMemo(
    () => players[playerTurn].getProfile().name,
    [playerTurn]
  );

  const isCurrentPlayerTurn = myIndex === playerTurn;

  const [question, setQuestion] = useState("");

  useEffect(() => {
    setQuestion(questions[0]);
  }, [phase]);
  return (
    <>
      <div className="card bg-base-100 w-full">
        <div className="card-body items-center text-center">
          {isCurrentPlayerTurn && phase === "question" && (
            <>
              <p>Choose a question.</p>
              <h2 className="card-title">{question}</h2>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setState("phase", "answer", true);
                    setState("timer", 10, true);
                  }}
                >
                  Accept
                </button>
                <button className="btn btn-secondary">Shuffle</button>
              </div>
            </>
          )}
          {!isCurrentPlayerTurn && phase === "question" && (
            <>
              <h2 className="card-title">
                {playerName} is choosing a question
              </h2>
            </>
          )}
        </div>
      </div>
    </>
  );
};
