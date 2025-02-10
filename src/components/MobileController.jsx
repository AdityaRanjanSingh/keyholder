import {
  Billboard,
  Center,
  ContactShadows,
  Gltf,
  OrbitControls,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import {
  getState,
  isHost,
  myPlayer,
  setState,
  usePlayersList,
} from "playroomkit";
import { degToRad } from "three/src/math/MathUtils";
import { useGameEngine } from "../hooks/useGameEngine";
import { Card } from "./Card";
import { PlayerName } from "./PlayerName";
import { useState } from "react";

import { Bunny } from "./Bunny";
import { Cactoro } from "./Cactoro";
import { Character } from "./Character";
import Cat from "./Cat";

export const MobileController = () => {
  const me = myPlayer();
  const {
    players,
    phase,
    playerTurn,
    nominations,
    missionPlayers,
    next,
    mission,
  } = useGameEngine();
  const myIndex = players.findIndex((player) => player.id === me.id);
  const isPlayerTurn = phase === "nominations" && myIndex === playerTurn;

  const [bunnyAnimation, setBunnyAnimation] = useState("Idle");

  const role = me.getState("role") || "";
  usePlayersList(true); // force rerender when player change
  let playerIdx = 0;
  const viewport = useThree((state) => state.viewport);
  const scalingRatio = Math.min(1, viewport.width / 3);

  const onPlayerSelect = (playerIndex) => {
    if (isPlayerTurn) {
      let newNominations = [];
      if (
        nominations.length >= missionPlayers[mission - 1] ||
        nominations.includes(playerIndex)
      ) {
        newNominations = nominations.filter((item) => item !== playerIndex);
      } else {
        newNominations = [...nominations, playerIndex];
      }
      setState("nominations", newNominations, true);
    }
  };

  const { positionX, positionY, positionZ, rotateX, rotateY, rotateZ } =
    useControls({
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
    });
  const onBunnyPress = () => {
    setBunnyAnimation("Death");
    setTimeout(() => {
      setBunnyAnimation("Idle");
    }, 5);
    setState("next", next + 1, true);
  };
  return (
    <group position-y={-1}>
      <ContactShadows opacity={0.12} />
      <group scale={scalingRatio}>
        {/* {isHost() && (
          <>
            <group position-z={3.5} position-x={0} position-y={0}>
              <mesh onClick={() => onBunnyPress()} visible={false}>
                <boxGeometry args={[1, 1.5, 1]} />
                <meshStandardMaterial color="hotpink" />
              </mesh>
              <Bunny scale={0.2} animation={bunnyAnimation} />
            </group>
          </>
        )} */}
        <group
          position={[positionX, positionY, positionZ]}
          rotation-x={degToRad(rotateX)}
          rotation-y={degToRad(rotateY)}
          rotation-z={degToRad(rotateZ)}
        >
          <Cat></Cat>
        </group>

        <group position={[-1, 0, 0]}>
          <Center disableY disableZ>
            {players.map((player, index) => (
              <motion.group
                key={player.id}
                position-y={playerIdx++ * 0.8}
                position-z={-2}
                animate={nominations.includes(index) ? "selected" : ""}
                scale={0.4}
                variants={{
                  selected: {
                    z: 0,
                    scale: 0.5,
                  },
                }}
              >
                <mesh
                  onClick={() => onPlayerSelect(index)}
                  position-y={1}
                  visible={false}
                >
                  <boxGeometry args={[1.2, 2, 0.5]} />
                  <meshStandardMaterial color="hotpink" />
                </mesh>
                <PlayerName
                  name={player.state.profile.name}
                  fontSize={0.5}
                  position-y={3}
                />
                <PlayerName
                  name={
                    role === "spy"
                      ? players[index].getState("role")
                      : "resistance"
                  }
                  fontSize={0.3}
                  position-y={3.5}
                />
                <Character
                  character={index}
                  animation={nominations.includes(index) ? "Yes" : "Idle"}
                  name={player.state.profile.name}
                  scale={0.5}
                />
              </motion.group>
            ))}
          </Center>
        </group>
        {/* <group position-y={1}>
          <PlayerName
            position-x={-1}
            position-y={-2.5}
            position-z={0}
            fontSize={0.15}
            name="Mission cards"
          ></PlayerName>
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
                position-x={1 + index * 0.1}
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
          <PlayerName
            fontSize={0.15}
            position-x={1}
            position-y={-2.5}
            position-z={0}
            name="Nomination cards"
          ></PlayerName>
          {["sabotage", "support"].map((card, index) => {
            let cardAnimState = "";
            const selected = index === me.getState("selectedMissionCard");
            const isNominated = nominations.includes(myIndex);
            if (isNominated) {
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
            } else {
              if (selected) {
                cardAnimState = "selected";
              }
            }
            return (
              <motion.group
                key={index}
                position-x={-1 + index * 0.1}
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
        </group> */}
      </group>
    </group>
  );
};
