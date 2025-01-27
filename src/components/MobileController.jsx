import { Center, ContactShadows, Gltf, OrbitControls } from "@react-three/drei";
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
  const { newValue } = useControls({
    newValue: false,
  });
  return (
    <group position-y={-1}>
      <ContactShadows opacity={0.12} />
      <group scale={scalingRatio}>
        {phase === "nominatePlayers" && (
          <>
            <Center disableY disableZ>
              {players.map(
                (player, index) =>
                  true && (
                    <motion.group
                      key={player.id}
                      position-x={playerIdx++ * 0.8}
                      position-z={-5}
                      animate={
                        nominations.indexOf(index) !== -1 ? "selected" : ""
                      }
                      scale={0.5}
                      variants={{
                        selected: {
                          z: -1,
                        },
                      }}
                    >
                      <mesh
                        onClick={() => {
                          if (players[playerTurn].id !== me.id) return;
                          if (nominations.length < 2)
                            return setNominations([...nominations, index]);

                          return setNominations([]);
                        }}
                        position-y={1}
                        visible={false}
                      >
                        <boxGeometry args={[1.2, 2, 0.5]} />
                        <meshStandardMaterial color="hotpink" />
                      </mesh>
                      <PlayerName
                        name={player.state.profile.name}
                        fontSize={0.3}
                        position-y={1.6}
                      />
                      <Character
                        character={index}
                        name={player.state.profile.name}
                      />
                    </motion.group>
                  )
              )}
            </Center>
            <mesh position={[0, 0, -1]}>
              <boxGeometry args={[3, 0, 3]} />
              <meshNormalMaterial />
            </mesh>
          </>
        )}

        <group position={[0, 0, -10]}>
          <Center disableY disableZ>
            {players.map((player, index) => (
              <PlayerMobile player={player} index={index}></PlayerMobile>
            ))}
          </Center>
        </group>
        {/* CARDS */}
        {/* {phase === "voting" && (
          <group>
            {cards.map((card, index) => {
              let cardAnimState = "";
              const selected = index === me.getState("selectedCard");
              // if (phase === "voting") {
              //   cardAnimState = "cardSelection";
              //   if (selected) {
              //     cardAnimState = "cardSelectionSelected";
              //   }
              // } else {
              //   if (selected) {
              //     cardAnimState = "selected";
              //   }
              // }
              return (
                <motion.group
                  key={index}
                  position-x={index * 0.1}
                  position-y={2 - index * 0.1}
                  position-z={-index * 0.1}
                  animate={cardAnimState}
                  variants={{
                    selected: {
                      x: -0.1,
                      y: 2.1,
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
                    if (phase === "voting") {
                      me.setState("selectedCard", index, true);
                    }
                  }}
                >
                  <Card type={card} />
                </motion.group>
              );
            })}
          </group>
        )} */}
        {/* {phase === "playerChoice" && players[playerTurn].id === me.id && (
          <Center disableY disableZ>
            {players.map(
              (player, index) =>
                player.id !== me.id && (
                  <motion.group
                    key={player.id}
                    position-x={playerIdx++ * 0.8}
                    position-z={-2}
                    animate={
                      index === me.getState("playerTarget") ? "selected" : ""
                    }
                    scale={0.4}
                    variants={{
                      selected: {
                        z: 0,
                        scale: 0.8,
                      },
                    }}
                  >
                    <mesh
                      onClick={() => me.setState("playerTarget", index, true)}
                      position-y={1}
                      visible={false}
                    >
                      <boxGeometry args={[1.2, 2, 0.5]} />
                      <meshStandardMaterial color="hotpink" />
                    </mesh>
                    <PlayerName
                      name={player.state.profile.name}
                      fontSize={0.3}
                      position-y={1.6}
                    />
                    <Character
                      character={index}
                      animation={
                        me.getState("role") === "spy"
                          ? "No"
                          : me.getState("playerTarget") === index
                          ? "No"
                          : "Idle"
                      }
                      name={player.state.profile.name}
                    />
                  </motion.group>
                )
            )}
          </Center>
        )} */}
      </group>
      <group position={[0.5, 0, 1]}>
        <mesh>
          <boxGeometry args={[0.5, 1, 0.5]} />
          <meshStandardMaterial></meshStandardMaterial>
        </mesh>
      </group>
      <group position={[-0.5, 0, 1]}>
        <mesh>
          <boxGeometry args={[0.5, 1, 0.5]} />
          <meshStandardMaterial></meshStandardMaterial>
        </mesh>
      </group>
    </group>
  );
};
