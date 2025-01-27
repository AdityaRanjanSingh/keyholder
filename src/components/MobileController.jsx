import {
  Billboard,
  Center,
  ContactShadows,
  Gltf,
  OrbitControls,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { myPlayer, usePlayersList } from "playroomkit";
import { degToRad } from "three/src/math/MathUtils";
import { useGameEngine } from "../hooks/useGameEngine";
import { Card } from "./Card";
import { Character } from "./Character";
import { PlayerName } from "./PlayerName";
import { useCallback, useMemo } from "react";
import { PlayerRole } from "./PlayerRole";
import { Player } from "./Player";
import { MissionPlayer } from "./MissionPlayer";
import { useControls } from "leva";
import { PlayerMobile } from "./PlayerMobile";

export const MobileController = () => {
  const me = myPlayer();
  const { players, phase, playerTurn, nominations, setNominations } =
    useGameEngine();
  const myIndex = players.findIndex((player) => player.id === me.id);
  const myRole = me.getState("role");

  const cards = me.getState("cards") || [];
  usePlayersList(true); // force rerender when player change
  let playerIdx = 0;
  const viewport = useThree((state) => state.viewport);
  const scalingRatio = Math.min(1, viewport.width / 3);
  const { cylinderRotation } = useControls({
    cylinderRotation: { x: 0, y: 0, z: 0 },
  });
  return (
    <group position-y={-1}>
      <ContactShadows opacity={0.12} />
      <group scale={scalingRatio}>
        <group position={[0, 0, -10]}>
          <Center>
            {players.map((player, index) => (
              <PlayerMobile
                key={index}
                player={player}
                index={index}
              ></PlayerMobile>
            ))}
          </Center>
        </group>
        <Center disableZ>
          <group position={[0, 0, -20]}>
            {[1, 2, 3, 4, 5].map((i, index) => (
              <mesh
                position-x={index * 1.2}
                key={index}
                rotation-z={degToRad(90)}
                rotation-y={degToRad(90)}
                scale={1}
              >
                <cylinderGeometry args={[0.5, 0.5, 0.2]} />
                <meshStandardMaterial color={"orange"}></meshStandardMaterial>
              </mesh>
            ))}
          </group>
        </Center>
        <group>
          <group>
            <PlayerName position={[-1, 0, 0]} name={"Approves"}></PlayerName>
            <PlayerName position={[-1, 0, 0.5]} name={"10"}></PlayerName>
          </group>
          <group>
            <PlayerName position={[1, 0, 0]} name={"Rejects"}></PlayerName>
            <PlayerName position={[1, 0, 0.5]} name={"10"}></PlayerName>
          </group>
        </group>
        <group position={[1, 0, 2]}>
          <mesh>
            <boxGeometry args={[1, 0.1, 0.5]} />
            <meshStandardMaterial color={"red"}></meshStandardMaterial>
            <PlayerName name={"No"} />
          </mesh>
        </group>
        <group position={[-1, 0, 2]}>
          <mesh>
            <boxGeometry args={[1, 0.1, 0.5]} />
            <meshStandardMaterial color={"green"}></meshStandardMaterial>
            <PlayerName name={"Yes"} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
