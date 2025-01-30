import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

export const Bunny = ({ character = 0, animation = "Idle", ...props }) => {
  const { scene, animations } = useGLTF(`/models/Bunny.gltf`);

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
