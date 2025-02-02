import {
  AccumulativeShadows,
  Gltf,
  RandomizedLight,
  useGLTF,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { useMemo, useCallback } from "react";
import { degToRad } from "three/src/math/MathUtils";
import { useGameEngine } from "../hooks/useGameEngine";
import { Card } from "./Card";
import { Player } from "./Player";
import { useControls } from "leva";
import { Zombie } from "./Zombie";

export const Gameboard = () => {
  const viewport = useThree((state) => state.viewport);
  const scalingRatio = Math.min(1, viewport.width / 12);

  const { deck, players, phase, nominations } = useGameEngine();

  const voteResult = useMemo(
    () =>
      players
        .map((player) => player.getState("selectedNominationCard"))
        .map((item) => (item === 0 ? "reject" : "approve")),
    [phase === "voteResult"]
  );
  const missionResult = useMemo(
    () =>
      nominations
        .map((idx) => players[idx].getState("selectedMissionCard"))
        .map((item) => (item === 0 ? "sabotage" : "support")),
    [phase === "missionResult"]
  );

  const isNominated = useCallback(
    (index) => nominations.includes(index),
    [nominations]
  );

  const shadows = useMemo(
    () => (
      <AccumulativeShadows
        temporal
        frames={35}
        alphaTest={0.75}
        scale={100}
        position={[0, 0.01, 0]}
        color="#EFBD4E"
      >
        <RandomizedLight
          amount={4}
          radius={9}
          intensity={0.55}
          ambient={0.25}
          position={[30, 5, -10]}
        />
        <RandomizedLight
          amount={4}
          radius={5}
          intensity={0.25}
          ambient={0.55}
          position={[-30, 5, -9]}
        />
      </AccumulativeShadows>
    ),
    []
  );

  return (
    <group scale={scalingRatio}>
      {/* BG */}
      <Gltf
        castShadow
        src="/models/Gameboard.glb"
        scale={0.8}
        position-x={-1}
        position-z={5}
      />
      {shadows}

      {/* Vote Result Deck */}
      <group position-x={8} position-z={0} position-y={1}>
        {voteResult.map((type, index) => (
          <motion.group
            key={index}
            position-y={index * 0.015}
            rotation-y={index % 2 ? degToRad(2) : 0}
            rotation-x={degToRad(-45)}
            animate={phase === "voteResult" ? "selected" : ""}
            variants={{
              selected: {
                x: -5,
                y: 0,
                z: -7,
                rotateY: degToRad(180),
                rotateX: degToRad(0),
                rotateZ: degToRad(0),
              },
            }}
          >
            <motion.group
              rotation-x={degToRad(90)}
              variants={{
                selected: {
                  rotateX: degToRad(-45),
                  x: index * -1.2,
                },
              }}
            >
              <Card type={type || undefined} />
            </motion.group>
          </motion.group>
        ))}
      </group>
      {/* Mission Result Deck */}
      <group position-x={10} position-z={0} position-y={1}>
        {missionResult.map((type, index) => (
          <motion.group
            key={index}
            position-y={index * 0.015}
            rotation-y={index % 2 ? degToRad(2) : 0}
            rotation-x={degToRad(-45)}
            animate={phase === "missionResult" ? "selected" : ""}
            variants={{
              selected: {
                x: -5,
                y: 0,
                z: -7,
                rotateY: degToRad(180),
                rotateX: degToRad(0),
                rotateZ: degToRad(0),
              },
            }}
          >
            <motion.group
              rotation-x={degToRad(90)}
              variants={{
                selected: {
                  rotateX: degToRad(-45),
                  x: index * -1.2,
                },
              }}
            >
              <Card type={type || undefined} />
            </motion.group>
          </motion.group>
        ))}
      </group>
      {/* CHARACTERS */}
      <motion.group position={[-2.5, 0, 0]}>
        {players.map((player, index) => (
          <motion.group
            key={player.id}
            animate={isNominated(index) ? "nominated" : ""}
            position-x={index * 0.3}
            variants={{
              nominated: {
                z: -3,
              },
            }}
          >
            <Player index={index} player={player} />
          </motion.group>
        ))}
      </motion.group>
      <motion.group>
        <Zombie position-x={1} position-z={-2} />
      </motion.group>
    </group>
  );
};

useGLTF.preload("/models/Gameboard.glb");
