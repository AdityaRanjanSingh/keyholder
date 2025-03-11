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
  const [answers, setAnswers] = useMultiplayerState("answers", []);

  // GAME STATE
  const [timer, setTimer] = useMultiplayerState("timer", 0);
  const [goodTeam, setGoodTeam] = useMultiplayerState("goodTeam", []);
  const [badTeam, setBadTeam] = useMultiplayerState("badTeam", []);
  const [phase, setPhase] = useMultiplayerState("phase", "question");
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
    -1
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
    answers,
  };

  const startGame = () => {
    if (isHost()) {
      console.log("Start game");
      setPhase("question");
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
      case "start":
        newTime = INTRODUCTION_TIME;
        break;
      case "question":
        break;
      case "players":
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
    checkWinner();
  }, [phase]);

  useEffect(() => {
    startGame();
  });
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
