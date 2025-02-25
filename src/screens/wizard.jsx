import React, { useState } from "react";
import Card from "../components/Card";
import Confetti from "react-confetti";
import { useGameEngine } from "../hooks/useGameEngine";

export default function App() {
  const [confettiVisible, setConfettiVisible] = useState(false);

  const { players } = useGameEngine();

  return (
    <div className="flex justify-center" style={{ backgroundColor: "#004F4F" }}>
      <Confetti
        gravity={0.1}
        numberOfPieces={1000}
        opacity={1}
        wind={0}
        run={confettiVisible}
        recycle={false}
      />
      <div className="artboard  w-full h-full phone-2">
        <div className="flex flex-wrap justify-center my-5 gap-4">
          {players.map((player) => (
            <div>
              <p className="text-md">{player.getProfile().name}</p>
              <p className="text-md">{player.getState("role")}</p>
              <Card type={player.getState("role")} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
