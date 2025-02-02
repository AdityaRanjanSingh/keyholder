import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useGameEngine } from "../hooks/useGameEngine";

export const Zombie = ({ character = 0, ...props }) => {
  const { scene, animations } = useGLTF(`/models/Zombie_Arm.gltf`);
  const { phase } = useGameEngine();

  const ref = useRef();
  const { actions } = useAnimations(animations, ref);

  const [animation, setAnimation] = useState("Idle");

  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return () => actions[animation]?.fadeOut(0.5);
  }, [animation]);

  useEffect(() => {
    let newAnimation = "Idle";
    if (phase === "voteMission") {
      newAnimation = "Punch";
    }
    if (phase === "missionSuccess") {
      newAnimation = "Death";
    }
    setAnimation(newAnimation);
  }, [phase]);
  return (
    <group {...props} ref={ref}>
      <primitive object={scene} />
    </group>
  );
};
