import {
  getState,
  isHost,
  onPlayerJoin,
  useMultiplayerState,
  usePlayersList,
} from "playroomkit";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { randInt } from "three/src/math/MathUtils";

const GameEngineContext = React.createContext();

export const NB_MISSIONS = 5;

const introductions = {
  goodWizard:
    "You are the Good Wizard! Your goal is to help the group complete their mission and identify the Traitor.",
  evilWizard:
    "You are the Evil Wizard! You secretly work against the group, but they don’t know it. Your goal is to find out which player is the Key Holder and stop them from succeeding.",
  keyholder:
    "You are the Key Holder! Your goal is to find the Good Wizard and secretly pass them the key. Be careful—if you give it to the wrong person, disaster may follow! Watch the players, look for signs of trust, and make your choice wisely.",
  guard:
    "You are a Guard! Your goal is to protect the group by identifying the Bad Wizard. Pay close attention to everyone’s actions and words—someone is working against you. Work with the team, trust wisely, and uncover the traitor before it's too late!",
  traitor:
    "You are the Traitor! You secretly work with the Bad Wizard to find the Key Holder, but the group thinks you're on their side. Earn their trust, gather information, and subtly guide the Bad Wizard to their target. Be careful—if they suspect you, your plan could fall apart!",
};

const roleChoiceMap = {
  goodWizard: "traitor",
  keyholder: "goodWizard",
  guard: "traitor",
  evilWizard: "keyholder",
};
const getPlayerRoles = (players) => {
  if (players === 4) {
    const alignments = [
      ...new Array(1).fill(0).map(() => "goodWizard"),
      ...new Array(1).fill(0).map(() => "evilWizard"),
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
      goodWizard: wizards.filter((role) => role === "goodWizard").length,
      evilWizard: wizards.filter((role) => role === "evilWizard").length,
    };
  }
  if (players === 5) {
    const alignments = [
      ...new Array(1).fill(0).map(() => "goodWizard"),
      ...new Array(1).fill(0).map(() => "evilWizard"),
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
      goodWizard: wizards.filter((role) => role === "goodWizard").length,
      evilWizard: wizards.filter((role) => role === "evilWizard").length,
    };
  }
  if (players === 6) {
    const alignments = [
      ...new Array(1).fill(0).map(() => "goodWizard"),
      ...new Array(1).fill(0).map(() => "evilWizard"),
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
      goodWizard: wizards.filter((role) => role === "goodWizard").length,
      evilWizard: wizards.filter((role) => role === "evilWizard").length,
    };
  }
  if (players === 7) {
    const alignments = [
      ...new Array(1).fill(0).map(() => "goodWizard"),
      ...new Array(1).fill(0).map(() => "evilWizard"),
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
      goodWizard: wizards.filter((role) => role === "goodWizard").length,
      evilWizard: wizards.filter((role) => role === "evilWizard").length,
    };
  }
  if (players === 8) {
    const alignments = [
      ...new Array(1).fill(0).map(() => "goodWizard"),
      ...new Array(1).fill(0).map(() => "evilWizard"),
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
      goodWizard: wizards.filter((role) => role === "goodWizard").length,
      evilWizard: wizards.filter((role) => role === "evilWizard").length,
    };
  }
  if (players === 9) {
    const alignments = [
      ...new Array(2).fill(0).map(() => "goodWizard"),
      ...new Array(2).fill(0).map(() => "evilWizard"),
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
      goodWizard: wizards.filter((role) => role === "goodWizard").length,
      evilWizard: wizards.filter((role) => role === "evilWizard").length,
    };
  }
  if (players === 10) {
    const alignments = [
      ...new Array(2).fill(0).map(() => "goodWizard"),
      ...new Array(2).fill(0).map(() => "evilWizard"),
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
      goodWizard: wizards.filter((role) => role === "goodWizard").length,
      evilWizard: wizards.filter((role) => role === "evilWizard").length,
    };
  }
};
export const GameEngineProvider = ({ children }) => {
  // GAME STATE
  const [timer, setTimer] = useMultiplayerState("timer", 0);
  const [goodTeam, setGoodTeam] = useMultiplayerState("goodTeam", []);
  const [badTeam, setBadTeam] = useMultiplayerState("badTeam", []);

  const [phase, setPhase] = useMultiplayerState("phase", "lobby");
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
  const [actionPlayer, setActionPlayer] = useMultiplayerState(
    "actionPlayer",
    100
  );

  const [wizards, setWizards] = useMultiplayerState("wizards", []);

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
      ].sort((a, b) => 0.5 - Math.random());

      setTreasureDeck(shuffledArray, true);
      distributeRoles();
      setPhase("introduction", true);
      players.forEach((player) => {
        player.setState("treasureCards", [], true);
      });
    }
  };

  const distributeRoles = () => {
    setRolesDeck(
      [
        ...new Array(playerRoles.guard).fill(0).map(() => "guard"),
        ...new Array(playerRoles.goodWizard).fill(0).map(() => "goodWizard"),
        ...new Array(playerRoles.evilWizard).fill(0).map(() => "evilWizard"),
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
      if (/wizard/gi.test(role)) newWizards.push(index);
      if (["goodWizard", "guard", "keyholder"].includes(role)) {
        newGoodTeam.push(index);
      } else {
        newBadTeam.push(index);
      }

      const modalTitle = phase;
      const modalBody = introductions[role];
      player.setState("modalTitle", modalTitle);
      player.setState("modalBody", modalBody);
      shuffledArray.splice(randomIndex, 1);
    });

    setWizards(newWizards, true);
    setGoodTeam(newGoodTeam, true);
    setBadTeam(newBadTeam, true);
  };
  const distributeTreasureCards = (winPlayers) => {
    if (!isHost()) return;
    const newDeck = [...getState("treasureDeck")];
    winPlayers.forEach((index) => {
      const randomIndex = randInt(0, newDeck.length - 1);
      const pTreasureCards = players[index].getState("treasureCards") || [];
      players[index].setState(
        "treasureCards",
        [...pTreasureCards, newDeck[randomIndex]],
        true
      );
      newDeck.splice(randomIndex, 1);
    });
    setTreasureDeck(newDeck, true);
  };
  useEffect(() => {
    startGame();
    // onPlayerJoin(startGame); // we restart the game when a new player joins
  }, []);

  const getCard = () => {
    const player = players[getState("playerTurn")];
    if (!player) {
      return "";
    }
    const cards = player.getState("cards");
    if (!cards) {
      return "";
    }
    const selectedNominationCard = player.getState("selectedNominationCard");
    return cards[selectedNominationCard];
  };
  const phaseEnd = () => {};

  const timerInterval = useRef();

  const setModalContent = () => {
    switch (phase) {
      case "introduction":
        {
          players.forEach((player) => {
            const role = player.getState("role");
            const modalTitle = phase;
            const modalBody = introductions[role];
            player.setState("modalTitle", modalTitle);
            player.setState("modalBody", modalBody);
          });
        }
        break;

      case "result":
        {
          const stoppedPlayerRole = players[stoppedPlayer].getState("role");
          const selectedPlayer =
            players[stoppedPlayer].getState("selectedPlayer");
          const selectedPlayerRole = players[selectedPlayer].getState("role");
          const isCorrectGuess =
            selectedPlayerRole === roleChoiceMap[stoppedPlayerRole];
          const isGoodTeam = goodTeam.includes(stoppedPlayer);
          const toastMessage = `${
            players[stoppedPlayer].getProfile().name
          } made a ${isCorrectGuess ? "correct" : "wrong"} guess`;
          toast(toastMessage);
          if (isCorrectGuess && isGoodTeam) {
            distributeTreasureCards(goodTeam);
          } else if (isCorrectGuess) {
            distributeTreasureCards(badTeam);
          } else if (isGoodTeam && !isCorrectGuess) {
            distributeTreasureCards(badTeam);
          } else {
            distributeTreasureCards(goodTeam);
          }
        }
        break;
      case "choosePlayer":
        {
          const message =
            players[stoppedPlayer].getProfile().name +
            ` is choosing the a player`;
          toast(message);
        }
        break;
      default:
        break;
    }
  };

  const checkWinner = () => {
    const winner = players.find((player) => {
      const treasureCount = player.getState("treasureCount");
      return treasureCount >= 10;
    });
    if (winner) {
      const index = players.findIndex((player) => player.id === winner.id);
      setWinner(index, true);
      setPhase("end");
      toast(
        `${winner.getProfile().name} is the winner with ${winner.getState(
          "treasureCount"
        )}`
      );
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

  const setNewRoundState = () => {
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
  };

  const startNewRound = () => {
    setPhase("introduction");
    setNewRoundState();
    distributeRoles();
  };

  useEffect(() => {
    if (!round) return;
    startNewRound();
  }, [round]);

  const runTimer = () => {
    timerInterval.current = setInterval(() => {
      if (!isHost()) return;
      let newTime = getState("timer") - 1;
      console.log("Timer", newTime);

      if (newTime <= 0) {
        phaseEnd();
      } else {
        setTimer(newTime, true);
      }
    }, 1000);
  };

  useEffect(() => {
    runTimer();
    return clearTimer;
  }, [phase]);

  const clearTimer = () => {
    clearInterval(timerInterval.current);
  };

  return (
    <GameEngineContext.Provider
      value={{
        ...gameState,
        startGame,
        getCard,
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
