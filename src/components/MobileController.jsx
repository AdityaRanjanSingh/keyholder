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
import { VoteCard } from "./VoteCard";
import { RejectCard } from "./RejectCard";

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
        <Center disableZ>
          <group position={[0, 0, -30]}>
            {[1, 2, 3, 4, 5].map((i, index) => (
              <mesh
                position-x={index * 1.8}
                key={index}
                rotation-z={degToRad(90)}
                rotation-y={degToRad(90)}
                scale={1.5}
              >
                <cylinderGeometry args={[0.5, 0.5, 0.2]} />
                <meshStandardMaterial color={"orange"}></meshStandardMaterial>
              </mesh>
            ))}
          </group>
        </Center>
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
        <group position-y={1}>
          {["reject", "approve"].map((card, index) => {
            let cardAnimState = "";
            const selected = index === me.getState("selectedNominationCard");
            if (phase === "voteNomination") {
              cardAnimState = "cardSelection";
              if (selected) {
                cardAnimState = "cardSelectionSelected";
              }
            } else {
              if (selected) {
                cardAnimState = "selected";
              }
            }
            return (
              <motion.group
                key={index}
                position-x={1.2 + index * 0.1}
                position-y={-1.5 + index * 0.1}
                position-z={-index * 0.1}
                animate={cardAnimState}
                variants={{
                  selected: {
                    x: -0.1,
                    y: 0.1,
                    z: 0.1,
                  },
                  cardSelection: {
                    x: index % 2 ? 0.6 : -0.6,
                    y: Math.floor(index / 2) * 1.6,
                    z: -0.5,
                  },
                  cardSelectionSelected: {
                    x: 0,
                    y: 0,
                    z: 2,
                    rotateX: degToRad(-45),
                    rotateY: 0,
                    rotateZ: 0,
                    scale: 1.1,
                  },
                }}
                onClick={() => {
                  if (phase === "voteNomination") {
                    me.setState("selectedNominationCard", index, true);
                  }
                }}
              >
                <Card type={card} />
              </motion.group>
            );
          })}
        </group>
        <group position-y={1}>
          {["failure", "success"].map((card, index) => {
            let cardAnimState = "";
            const selected = index === me.getState("selectedMissionCard");
            if (phase === "voteMission") {
              cardAnimState = "cardSelection";
              if (selected) {
                cardAnimState = "cardSelectionSelected";
              }
            } else {
              if (selected) {
                cardAnimState = "selected";
              }
            }
            return (
              <motion.group
                key={index}
                position-x={-1.2 + index * 0.1}
                position-y={-1.5 + index * 0.1}
                position-z={-index * 0.1}
                animate={cardAnimState}
                variants={{
                  selected: {
                    x: -0.1,
                    y: 0.1,
                    z: 0.1,
                  },
                  cardSelection: {
                    x: index % 2 ? 0.6 : -0.6,
                    y: Math.floor(index / 2) * 1.6,
                    z: -0.5,
                  },
                  cardSelectionSelected: {
                    x: 0,
                    y: 0,
                    z: 2,
                    rotateX: degToRad(-45),
                    rotateY: 0,
                    rotateZ: 0,
                    scale: 1.1,
                  },
                }}
                onClick={() => {
                  if (phase === "voteMission") {
                    me.setState("selectedMissionCard", index, true);
                  }
                }}
              >
                <Card type={card} />
              </motion.group>
            );
          })}
        </group>
      </group>
    </group>
  );
};
