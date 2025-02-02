import { Center, Gltf } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useEffect, useState } from "react";
import { degToRad } from "three/src/math/MathUtils";
import { useGameEngine } from "../hooks/useGameEngine";
import { Character } from "./Character";
import { PlayerName } from "./PlayerName";

export const Player = ({ index, player }) => {
  const { phase, playerTurn, players, getCard, nominations } = useGameEngine();
  const isPlayerTurn = phase === "playerAction" && index === playerTurn;
  const currentPlayer = players[playerTurn];
  const currentCard = getCard();
  const hasShield = player.getState("shield");
  const isPlayerPunched =
    phase === "playerAction" &&
    currentCard === "punch" &&
    index === currentPlayer.getState("playerTarget");
  const isWinner = player.getState("winner");
  const isSpy = player.getState("role") === "spy";

  const myIndex = players.findIndex((pl) => pl.id === player.id);

  const isMissionInProgress =
    phase === "voteMission" && nominations.includes(myIndex);

  const isMissionFailure =
    phase === "missionFailure" && nominations.includes(myIndex);

  const [animation, setAnimation] = useState("Idle");

  useEffect(() => {
    let cardAnim = "Idle";
    if (isPlayerTurn) {
      switch (currentCard) {
        case "punch":
          cardAnim = "Sword";
          break;
        case "shield":
          cardAnim = "Wave";
          break;
        case "grab":
          cardAnim = "Punch";
          break;
        default:
          break;
      }
    } else {
      if (isPlayerPunched) {
        cardAnim = "Duck";
      }
    }
    if (isWinner) {
      cardAnim = "Wave";
    }
    if (isMissionInProgress) {
      cardAnim = "Punch";
    }
    if (isMissionFailure) {
      cardAnim = "Death";
    }
    if (isMissionFailure) {
      cardAnim = "Death";
    }
    setAnimation(cardAnim);
  }, [currentCard, playerTurn, phase, isPlayerPunched, isWinner, isSpy]);

  return (
    <motion.group
      animate={animation}
      position-x={1 + index}
      position-z={2}
      variants={{
        Sword: {
          // punch
          z: 0.2,
          x: -1,
        },
        Wave: {
          // shield
          scale: 1.5,
        },
        Punch: {},
        Duck: {
          // punched
          z: -0.4,
          x: -1,
          rotateY: degToRad(180),
        },
      }}
    >
      <PlayerName name={player.state.profile.name} position-y={1.7} />
      <Character
        scale={0.5}
        character={index}
        rotation-y={degToRad(180)}
        animation={animation}
      />
      {hasShield && <Gltf scale={0.5} src="/models/Prop_Barrel.gltf" />}
      {/* PLAYER GEMS */}
      <Center disableY disableZ>
        {[...Array(player.getState("gems") || 0)].map((_, index) => (
          <Gltf
            key={index}
            src="/models/UI_Gem_Blue.gltf"
            position-x={index * 0.25}
            position-y={0.25}
            position-z={0.5}
            scale={0.5}
          />
        ))}
      </Center>
    </motion.group>
  );
};
