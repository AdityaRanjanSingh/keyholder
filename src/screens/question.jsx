import { useEffect, useState } from "react";
import { useGameEngine } from "../hooks/useGameEngine";

export default () => {
  const questions = [
    "What is the best flavour of chips?",
    "Name the biggest fruit you can fit in your mouth without chopping it up?",
    "Name a very cold country?",
    "What gets passed around?",
    "Other than illness, name an acceptable excuse for missing work?",
  ];

  const [question, setQuestion] = useState("");

  const { phase } = useGameEngine();

  useEffect(() => {
    setQuestion(questions[0]);
  }, [phase]);
  return (
    <>
      <div className="card bg-base-100 w-full">
        <div className="card-body items-center text-center">
          <p>Choose a question.</p>
          <h2 className="card-title">{question}</h2>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Accept</button>
            <button className="btn btn-ghost">Deny</button>
          </div>
        </div>
      </div>
    </>
  );
};
