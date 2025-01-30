import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

const CHARACTERS = [
  "Dino",
  "Fish",
  "Frog",
  "Monkroose",
  "MushroomKing",
  "Ninja",
  "Orc_Skull",
  "Orc",
  "Tribal",
  "Yeti",
];

export const Character = ({ character = 0, animation = "Idle", ...props }) => {
  const { scene, animations } = useGLTF(
    `/models/${CHARACTERS[character]}.gltf`
  );

  const ref = useRef();
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return () => actions[animation]?.fadeOut(0.5);
  }, [animation]);
  return (
    <group {...props} ref={ref}>
      <primitive object={scene} />
    </group>
  );
};
