import { Center, Gltf } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useEffect, useState } from "react";
import { degToRad } from "three/src/math/MathUtils";
import { useGameEngine } from "../hooks/useGameEngine";
import { Character } from "./Character";
import { PlayerName } from "./PlayerName";
import { useControls } from "leva";
import { getState } from "playroomkit";

export const PlayerMobile = ({ index, player }) => {
  const { phase, playerTurn, players, getCard, nominations, setNominations } =
    useGameEngine();
  const isPlayerTurn = phase === "playerAction" && index === playerTurn;
  const currentPlayer = players[playerTurn];
  const currentCard = getCard();
  const isPlayerPunched =
    phase === "playerAction" &&
    currentCard === "punch" &&
    index === currentPlayer.getState("playerTarget");
  const isWinner = player.getState("winner");
  const role = player.getState("role");

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
    if (nominations.includes(index)) {
      cardAnim = "Jump";
    }
    setAnimation(cardAnim);
  }, [currentCard, playerTurn, phase, isPlayerPunched, isWinner, nominations]);
  const onPlayerSelect = (index) => {
    setNominations([...nominations, index]);
    console.log(index);
  };
  return (
    <motion.group
      animate={animation}
      position-x={1 + index}
      variants={{
        Jump: {
          // punch
        },
        Wave: {
          // shield
          scale: 1.5,
        },
        Punch: {
          // grab
          x: 0,
          z: 0.4,
        },
        Duck: {
          // punched
          z: -0.4,
          x: -1,
          rotateY: degToRad(180),
        },
      }}
    >
      <mesh onClick={() => onPlayerSelect(index)} visible={false}>
        <boxGeometry args={[1.2, 2, 0.5]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <Character scale={0.3} character={index} animation={animation} />
      <PlayerName name={player.state.profile.name} position-y={1} />
      <PlayerName name={role} position-z={0.8} />
    </motion.group>
  );
};
