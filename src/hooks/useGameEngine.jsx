import { useControls } from "leva";
import {
  getState,
  isHost,
  onPlayerJoin,
  useMultiplayerState,
  usePlayersList,
  onDisconnect,
} from "playroomkit";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { randInt } from "three/src/math/MathUtils";

export const Phases = [
  "ready",
  "role-description",
  "role",
  "wizard-description",
  "wizard",
  "keyholder-description",
  "keyholder",
  "discussion-description",
  "discussion",
  "stop-description",
  "stop",
  "result-description",
  "result",
  "treasure-description",
  "treasure",
  "ring-description",
  "ring",
  "choose-player",
  "choose-card",
  "end",
];

export const INTRODUCTION_TIME = 5;
export const DISCUSSION_TIME = 15;

export const Time = [15, 15, 15, 60, 15, 15, 15, -1];
const GameEngineContext = React.createContext();

export const NB_MISSIONS = 5;

const roleChoiceMap = {
  "wizard-evil": "traitor",
  keyholder: "goodWizard",
  guard: "traitor",
  "wizard-good": "keyholder",
};
const getPlayerRoles = (players) => {
  if (players === 4) {
    const alignments = [
      ...new Array(1).fill(0).map(() => "wizard-good"),
      ...new Array(1).fill(0).map(() => "wizard-evil"),
    ];
    const shuffledArray = alignments.sort((a, b) => 0.5 - Math.random());
    const wizards = Array(1)
      .fill(0)
      .map(() => {
        const randomIndex = randInt(0, shuffledArray.length - 1);
        const role = shuffledArray[randomIndex];
        shuffledArray.splice(randomIndex, 1);
        return role;
      });
    return {
      traitor: 1,
      keyholder: 1,
      guard: 1,
      goodWizard: wizards.filter((role) => role === "wizard-good").length,
      evilWizard: wizards.filter((role) => role === "wizard-evil").length,
    };
  }
  if (players === 5) {
    const alignments = [
      ...new Array(1).fill(0).map(() => "wizard-good"),
      ...new Array(1).fill(0).map(() => "wizard-evil"),
    ];
    const shuffledArray = alignments.sort((a, b) => 0.5 - Math.random());
    const wizards = Array(2)
      .fill(0)
      .map(() => {
        const randomIndex = randInt(0, shuffledArray.length - 1);
        const role = shuffledArray[randomIndex];
        shuffledArray.splice(randomIndex, 1);
        return role;
      });
    return {
      traitor: 1,
      keyholder: 1,
      guard: 1,
      goodWizard: wizards.filter((role) => role === "wizard-good").length,
      evilWizard: wizards.filter((role) => role === "wizard-evil").length,
    };
  }
  if (players === 6) {
    const alignments = [
      ...new Array(1).fill(0).map(() => "wizard-good"),
      ...new Array(1).fill(0).map(() => "wizard-evil"),
    ];
    const shuffledArray = alignments.sort((a, b) => 0.5 - Math.random());
    const wizards = Array(2)
      .fill(0)
      .map(() => {
        const randomIndex = randInt(0, shuffledArray.length - 1);
        const role = shuffledArray[randomIndex];
        shuffledArray.splice(randomIndex, 1);
        return role;
      });
    return {
      traitor: 1,
      keyholder: 1,
      guard: 2,
      goodWizard: wizards.filter((role) => role === "wizard-good").length,
      evilWizard: wizards.filter((role) => role === "wizard-evil").length,
    };
  }
  if (players === 7) {
    const alignments = [
      ...new Array(1).fill(0).map(() => "wizard-good"),
      ...new Array(1).fill(0).map(() => "wizard-evil"),
    ];
    const shuffledArray = alignments.sort((a, b) => 0.5 - Math.random());
    const wizards = Array(2)
      .fill(0)
      .map(() => {
        const randomIndex = randInt(0, shuffledArray.length - 1);
        const role = shuffledArray[randomIndex];
        shuffledArray.splice(randomIndex, 1);
        return role;
      });
    return {
      traitor: 1,
      keyholder: 1,
      guard: 3,
      goodWizard: wizards.filter((role) => role === "wizard-good").length,
      evilWizard: wizards.filter((role) => role === "wizard-evil").length,
    };
  }
  if (players === 8) {
    const alignments = [
      ...new Array(1).fill(0).map(() => "wizard-good"),
      ...new Array(1).fill(0).map(() => "wizard-evil"),
    ];
    const shuffledArray = alignments.sort((a, b) => 0.5 - Math.random());
    const wizards = Array(2)
      .fill(0)
      .map(() => {
        const randomIndex = randInt(0, shuffledArray.length - 1);
        const role = shuffledArray[randomIndex];
        shuffledArray.splice(randomIndex, 1);
        return role;
      });
    return {
      traitor: 2,
      keyholder: 1,
      guard: 3,
      goodWizard: wizards.filter((role) => role === "wizard-good").length,
      evilWizard: wizards.filter((role) => role === "wizard-evil").length,
    };
  }
  if (players === 9) {
    const alignments = [
      ...new Array(2).fill(0).map(() => "wizard-good"),
      ...new Array(2).fill(0).map(() => "wizard-evil"),
    ];
    const shuffledArray = alignments.sort((a, b) => 0.5 - Math.random());
    const wizards = Array(2)
      .fill(0)
      .map(() => {
        const randomIndex = randInt(0, shuffledArray.length - 1);
        const role = shuffledArray[randomIndex];
        shuffledArray.splice(randomIndex, 1);
        return role;
      });
    return {
      traitor: 2,
      keyholder: 1,
      guard: 3,
      goodWizard: wizards.filter((role) => role === "wizard-good").length,
      evilWizard: wizards.filter((role) => role === "wizard-evil").length,
    };
  }
  if (players === 10) {
    const alignments = [
      ...new Array(2).fill(0).map(() => "wizard-good"),
      ...new Array(2).fill(0).map(() => "wizard-evil"),
    ];
    const shuffledArray = alignments.sort((a, b) => 0.5 - Math.random());
    const wizards = Array(2)
      .fill(0)
      .map(() => {
        const randomIndex = randInt(0, shuffledArray.length - 1);
        const role = shuffledArray[randomIndex];
        shuffledArray.splice(randomIndex, 1);
        return role;
      });
    return {
      traitor: 2,
      keyholder: 1,
      guard: 4,
      goodWizard: wizards.filter((role) => role === "wizard-good").length,
      evilWizard: wizards.filter((role) => role === "wizard-evil").length,
    };
  }
};
export const GameEngineProvider = ({ children }) => {
  // GAME STATE
  const [timer, setTimer] = useMultiplayerState("timer", 0);
  const [goodTeam, setGoodTeam] = useMultiplayerState("goodTeam", []);
  const [badTeam, setBadTeam] = useMultiplayerState("badTeam", []);

  const [phase, setPhase] = useMultiplayerState("phase", "lobby");
  const [phaseNo, setPhaseNo] = useMultiplayerState("phaseNo", 0);
  const [playerTurn, setPlayerTurn] = useMultiplayerState("playerTurn", 0);
  const [playerStart, setPlayerStart] = useMultiplayerState("playerStart", 0);
  const [deck, setDeck] = useMultiplayerState("deck", []);
  const [rolesDeck, setRolesDeck] = useMultiplayerState("rolesDeck", []);
  const [treasureDeck, setTreasureDeck] = useMultiplayerState(
    "treasureDeck",
    []
  );

  const [round, setRound] = useMultiplayerState("round", 0);
  const [winner, setWinner] = useMultiplayerState("winner", 100);

  const [stoppedPlayer, setStoppedPlayer] = useMultiplayerState(
    "stoppedPlayer",
    100
  );
  const [wizards, setWizards] = useMultiplayerState("wizards", []);

  const [keyholder, setKeyholder] = useMultiplayerState("keyholder", -1, true);
  const players = usePlayersList(true);

  const playerRoles = useMemo(
    () => getPlayerRoles(players.length),
    [players.length]
  );

  players.sort((a, b) => a.id.localeCompare(b.id)); // we sort players by id to have a consistent order through all clients

  const gameState = {
    timer,
    phase,
    playerTurn,
    playerStart,
    players,
    deck,
    wizards,
    round,
    winner,
    stoppedPlayer,
    phaseNo,
    keyholder,
  };

  const startGame = () => {
    if (isHost()) {
      console.log("Start game");
      const shuffledArray = [
        ...new Array(2).fill(0).map(() => "jewels"),
        ...new Array(5).fill(0).map(() => "platinum"),
        ...new Array(12).fill(0).map(() => "gold"),
        ...new Array(11).fill(0).map(() => "silver"),
        ...new Array(5).fill(0).map(() => "copper"),
        ...new Array(5).fill(0).map(() => "magicRing"),
        ...new Array(2).fill(0).map(() => "gildedStatue"),
      ].sort(() => 0.5 - Math.random());
      setTreasureDeck(shuffledArray, true);
      players.forEach((player) => {
        player.setState("treasureCards", [], true);
        player.setState("role", "", true);
      });
      distributeRoles();
      setPhase("role");
    }
  };

  const distributeRoles = () => {
    setRolesDeck(
      [
        ...new Array(playerRoles.guard).fill(0).map(() => "guard"),
        ...new Array(playerRoles.goodWizard).fill(0).map(() => "wizard-good"),
        ...new Array(playerRoles.evilWizard).fill(0).map(() => "wizard-evil"),
        ...new Array(playerRoles.keyholder).fill(0).map(() => "keyholder"),
        ...new Array(playerRoles.traitor).fill(0).map(() => "traitor"),
      ],
      true
    );
    const newDeck = [...getState("rolesDeck")];
    const shuffledArray = newDeck.sort((a, b) => 0.5 - Math.random());
    const newWizards = [];
    const newGoodTeam = [];
    const newBadTeam = [];
    players.forEach((player, index) => {
      const randomIndex = randInt(0, shuffledArray.length - 1);
      const role = shuffledArray[randomIndex];
      player.setState("role", role, true);
      if (role === "keyholder") {
        setKeyholder(index, true);
      }
      if (/wizard/gi.test(role)) newWizards.push(index);
      if (["goodWizard", "guard", "keyholder"].includes(role)) {
        newGoodTeam.push(index);
      } else {
        newBadTeam.push(index);
      }
      shuffledArray.splice(randomIndex, 1);
    });
    setWizards(newWizards, true);
    setGoodTeam(newGoodTeam, true);
    setBadTeam(newBadTeam, true);
    // setTimer(Time[phaseNo]);
  };
  const countTreasure = (treasures) => {
    const jewels = treasures.filter(({ type }) => type === "jewels").length;
    const platinum = treasures.filter(({ type }) => type === "platinum").length;
    const gold = treasures.filter(({ type }) => type === "gold").length;
    const silver = treasures.filter(({ type }) => type === "silver").length;
    const copper = treasures.filter(({ type }) => type === "copper").length;
    const magicRing = treasures.filter(
      ({ type }) => type === "magicRing"
    ).length;
    const gildedStatue = treasures.filter(
      ({ type }) => type === "gildedStatue"
    ).length;

    const count =
      5 * jewels +
      4 * platinum +
      3 * gold +
      2 * silver +
      1 * copper +
      magicRing * 1 +
      gildedStatue * 0;
    return count;
  };
  const distributeTreasureCards = (winPlayers) => {
    if (!isHost()) return;
    const newDeck = [...getState("treasureDeck")];
    winPlayers.forEach((index) => {
      const randomIndex = randInt(0, newDeck.length - 1);
      const pTreasureCards = players[index].getState("treasureCards") || [];
      const cards = [
        ...pTreasureCards,
        { type: newDeck[randomIndex], used: false },
      ];
      const count = countTreasure(cards);
      players[index].setState("treasureCards", cards, true);
      players[index].setState("treasureCount", count, true);
      players[index].setState(
        "toastMessage",
        "You have drawn a " + newDeck[randomIndex],
        true
      );
      newDeck.splice(randomIndex, 1);
    });
    setTreasureDeck(newDeck, true);
  };

  const phaseEnd = () => {
    let newTime = 0;
    switch (phase) {
      case "shuffle":
        setPhase("role-description");
        newTime = INTRODUCTION_TIME;
        break;
      case "role-description":
        startGame();
        newTime = INTRODUCTION_TIME;
        break;
      case "role":
        setPhase("wizard-description");
        newTime = INTRODUCTION_TIME;
        break;
      case "wizard-description":
        setPhase("wizard");
        newTime = INTRODUCTION_TIME;
        break;
      case "wizard":
        newTime = INTRODUCTION_TIME;
        setPhase("keyholder-description");
        // setPhase("keyholder-description");
        break;
      case "keyholder-description":
        newTime = INTRODUCTION_TIME;
        setPhase("keyholder");
        break;
      case "keyholder":
        newTime = INTRODUCTION_TIME;
        setPhase("discussion-description");
        break;
      case "discussion-description":
        newTime = DISCUSSION_TIME;
        setPhase("discussion");
        break;
      // case "discussion":
      //   newTime = INTRODUCTION_TIME;
      //   setPhase("stop-description");
      //   break;
      case "stop-description":
        newTime = INTRODUCTION_TIME;
        setPhase("stop");
        break;
      case "stop":
        newTime = INTRODUCTION_TIME;
        setPhase("result-description");
        break;
      case "result-description":
        newTime = INTRODUCTION_TIME;
        setPhase("result");
        break;
      case "result": {
        newTime = INTRODUCTION_TIME;
        const pStopped = players[stoppedPlayer] ?? players[0];
        const stoppedPlayerRole = pStopped.getState("role");
        const selectedPlayer = pStopped.getState("selectedPlayer") ?? 0;
        const selectedPlayerRole = players[selectedPlayer].getState("role");
        const isCorrectGuess =
          selectedPlayerRole === roleChoiceMap[stoppedPlayerRole];
        const isGoodTeam = goodTeam.includes(stoppedPlayer);
        players.forEach((player) => {
          player.setState(
            "toastMessage",
            `${pStopped.getProfile().name} has made a ${
              isCorrectGuess ? "correct" : "wrong"
            } guess`,
            true
          );
        });
        if (isCorrectGuess && isGoodTeam) {
          distributeTreasureCards(goodTeam);
        } else if (isCorrectGuess) {
          distributeTreasureCards(badTeam);
        } else if (isGoodTeam && !isCorrectGuess) {
          distributeTreasureCards(badTeam);
        } else {
          distributeTreasureCards(goodTeam);
        }
        setPhase("treasure-description");
        break;
      }
      case "treasure-description":
        newTime = INTRODUCTION_TIME;
        setPhase("treasure");
        break;
      case "treasure":
        newTime = INTRODUCTION_TIME;
        setPhase("ring-description");
        break;
      case "ring-description":
        newTime = INTRODUCTION_TIME;
        setPhase("ring");
        break;
      case "ring":
        newTime = INTRODUCTION_TIME;
        setPhase("choose-player");
        break;
      case "choose-player":
        newTime = INTRODUCTION_TIME;
        setPhase("choose-card");
        break;
      case "choose-card":
        newTime = INTRODUCTION_TIME;
        setPhase("choose-card");
        break;
      case "end":
        break;
      case "revealTreasureCard":
        newTime = INTRODUCTION_TIME;
        players.forEach((player) => {
          const treasureCards = player.getState("treasureCards") || [];
          const hasUnsedRing = treasureCards.some(
            (card) => card.type === "magicRing" && !card.used
          );
          player.setState("selectedPlayer", -1);
          if (hasUnsedRing) {
            player.setState(
              "toastMessage",
              "Touch the magic ring to use it",
              true
            );
          }
        });
        setPhase("takeAction");
        break;
      case "takeAction":
        newTime = INTRODUCTION_TIME;
        setPhase("actionPlay");
        break;
      case "actionPlay":
        newTime = INTRODUCTION_TIME;
        let toastMessages = [];
        players.forEach((player) => {
          const selectedPlayer = player.getState("selectedPlayer");
          const currentPlayerCards = player.getState("treasureCards") || [];
          if (selectedPlayer !== -1) {
            const treasureCards =
              players[selectedPlayer].getState("treasureCards") || [];
            if (treasureCards.length !== 0) {
              const randomIndex = randInt(0, treasureCards.length - 1);
              const gildedStatueIndex = treasureCards.findIndex(
                (card) => card.type === "gildedStatue"
              );
              const cardIndex =
                gildedStatueIndex !== -1 ? gildedStatueIndex : randomIndex;
              const stolenCards = treasureCards.splice(cardIndex, 1);
              players[selectedPlayer].setState(
                "treasureCards",
                treasureCards,
                true
              ),
                toastMessages.push(
                  `${player.getProfile().name} used magic ring on ${
                    players[selectedPlayer].getProfile().name
                  } and took ${stolenCards[0].type} card`
                );

              const magicRingIndex = currentPlayerCards.findIndex(
                (card) => card.type === "magicRing"
              );
              currentPlayerCards.splice(magicRingIndex, 1, {
                type: "magicRing",
                used: true,
              });
              player.setState("treasureCards", [
                ...currentPlayerCards,
                ...stolenCards,
              ]);
              player.setState("selectedPlayer", -1);
            }
          }
        });
        players.forEach((player) => {
          toastMessages.map((message) =>
            player.setState("toastMessage", message)
          );
        });

        break;
      default:
        break;
    }
    setTimer(newTime);
  };
  const { paused } = useControls({
    paused: false,
  });
  const timerInterval = useRef();

  const setModalContent = () => {
    switch (phase) {
      case "choosePlayer":
        {
          players.forEach((player) => {
            const role = players[stoppedPlayer].getState("role");
            const message =
              players[stoppedPlayer].getProfile().name +
              ` is a ${role} and choosing the ${roleChoiceMap[role]}`;

            player.setState("toastMessage", message, true);
          });
        }
        break;
      case "end":
        {
          players.forEach((player) => {
            const name = players[winner].getProfile().name;
            const message = `${name} is the winner`;
            player.setState("toastMessage", message, true);
          });
        }
        break;
      default:
        break;
    }
  };

  const checkWinner = () => {
    const winner = players.findIndex((player) => {
      const treasureCount = player.getState("treasureCount");
      return treasureCount >= 10;
    });
    if (winner !== -1) {
      setWinner(winner, true);
      setPhase("end", true);
    }
  };
  useEffect(() => {
    setModalContent();
    checkWinner();
  }, [phase]);
  const setNextPlayerTurn = () => {
    const newPlayerTurn = (getState("playerTurn") + 1) % players.length;
    setPlayerTurn(newPlayerTurn, true);
  };

  const startNewRound = () => {
    setPhase("introduction", true);
    setGoodTeam([], true);
    setBadTeam([], true);
    setStoppedPlayer(100, true);
    setWizards([], true);
    players.forEach((player) => {
      player.setState("selectedPlayer", 100, true);
      player.setState("role", "", true);
      player.setState("modalTitle", "", true);
      player.setState("modalBody", "", true);
    });
    distributeRoles();
  };

  useEffect(() => {
    if (!round || !isHost()) return;
    startNewRound();
  }, [round]);

  const runTimer = () => {
    timerInterval.current = setInterval(() => {
      if (paused) return;
      if (!isHost()) return;
      const time = getState("timer");
      let newTime = time - 1;
      console.log("Timer", newTime);

      if (newTime <= 0) {
        phaseEnd();
      } else {
        if (isNaN(newTime)) newTime = 0;
        setTimer(newTime, true);
      }
    }, 1000);
  };

  useEffect(() => {
    runTimer();
    return clearTimer;
  }, [phase, paused]);

  const clearTimer = () => {
    clearInterval(timerInterval.current);
  };

  return (
    <GameEngineContext.Provider
      value={{
        ...gameState,
        startGame,
      }}
    >
      {children}
    </GameEngineContext.Provider>
  );
};

export const useGameEngine = () => {
  const context = React.useContext(GameEngineContext);
  if (context === undefined) {
    throw new Error("useGameEngine must be used within a GameEngineProvider");
  }
  return context;
};
