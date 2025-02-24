import React, { useState } from "react";
import { useSpring, a } from "@react-spring/web";
import Card from "../components/Card";
import Confetti from "react-confetti";

export default function App() {
  const [confettiVisible, setConfettiVisible] = useState(false);

  return (
    <>
      <Confetti
        gravity={0.1}
        numberOfPieces={1000}
        opacity={1}
        wind={0}
        run={confettiVisible}
        recycle={false}
      />
      <div className="flex justify-center">
        <div className="artboard  w-full h-full">
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
}
