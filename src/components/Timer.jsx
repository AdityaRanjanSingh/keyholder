import { useEffect, useRef, useState } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import { animate } from "motion/react";

export default ({ className = "" }) => {
  const ref = useRef();
  const { timer } = useGameEngine();
  const [time, setTime] = useState(timer);
  useEffect(() => {
    animate(time, timer, {
      duration: 1,
      ease: "circOut",
      onUpdate: (latest) => (ref.current.innerHTML = Math.round(latest)),
    });
    setTime(timer);
  }, [timer]);
  return (
    <pre
      className={"text-5xl text-center text-neutral-content " + className}
      ref={ref}
    >
      {timer}
    </pre>
  );
};
