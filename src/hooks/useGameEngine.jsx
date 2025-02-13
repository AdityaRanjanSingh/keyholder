import {
  getState,
  isHost,
  onPlayerJoin,
  useMultiplayerState,
  usePlayersList,
} from "playroomkit";
import React, { useEffect, useMemo, useRef } from "react";
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
  wizard:
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
  if (players === 4) return { traitor: 1, keyholder: 1, guard: 1, wizard: 1 };
  if (players === 5) return { traitor: 1, keyholder: 1, guard: 1, wizard: 2 };
  if (players === 6) return { traitor: 1, keyholder: 1, guard: 2, wizard: 2 };
  if (players === 7) return { traitor: 1, keyholder: 1, guard: 3, wizard: 2 };
  if (players === 8) return { traitor: 2, keyholder: 1, guard: 3, wizard: 2 };
  if (players === 9) return { traitor: 2, keyholder: 1, guard: 3, wizard: 3 };
  if (players === 10) return { traitor: 2, keyholder: 1, guard: 4, wizard: 3 };
};
export const GameEngineProvider = ({ children }) => {
  // GAME STATE
  const [timer, setTimer] = useMultiplayerState("timer", 0);
  const [mission, setMission] = useMultiplayerState("mission", 1);
  const [missionSuccess, setMissionSuccess] = useMultiplayerState(
    "missionSuccess",
    0
  );

  const [phase, setPhase] = useMultiplayerState("phase", "lobby");
  const [playerTurn, setPlayerTurn] = useMultiplayerState("playerTurn", 0);
  const [playerStart, setPlayerStart] = useMultiplayerState("playerStart", 0);
  const [deck, setDeck] = useMultiplayerState("deck", []);
  const [rolesDeck, setRolesDeck] = useMultiplayerState("rolesDeck", []);
  const [stoppedPlayer, setStoppedPlayer] = useMultiplayerState(
    "stoppedPlayer",
    100
  );

  const [nominations, setNominations] = useMultiplayerState("nominations", []);
  const [next, setNext] = useMultiplayerState("next", 0);

  const [wizards, setWizards] = useMultiplayerState("wizards", []);

  const players = usePlayersList(true);

  const playerRoles = useMemo(
    () => getPlayerRoles(players.length),
    [players.length]
  );
  const [missionPlayers, setMissionPlayers] = useMultiplayerState(
    "missionPlayers",
    []
  );
  players.sort((a, b) => a.id.localeCompare(b.id)); // we sort players by id to have a consistent order through all clients

  const gameState = {
    timer,
    mission,
    phase,
    playerTurn,
    playerStart,
    missionPlayers,
    players,
    deck,
    nominations,
    missionSuccess,
    wizards,
  };

  const startGame = () => {
    if (isHost()) {
      console.log("Start game");
      console.log({ playerRoles });
      setRolesDeck(
        [
          ...new Array(playerRoles.guard).fill(0).map(() => "guard"),
          ...new Array(playerRoles.wizard).fill(0).map(() => "wizard"),
          ...new Array(playerRoles.keyholder).fill(0).map(() => "keyholder"),
          ...new Array(playerRoles.traitor).fill(0).map(() => "traitor"),
        ],
        true
      );
      distributeRoles();
      setPhase("introduction", true);
      setTimer(30, true);
    }
  };

  const distributeRoles = () => {
    const newDeck = [...getState("rolesDeck")];
    const shuffledArray = newDeck.sort((a, b) => 0.5 - Math.random());
    const newWizards = [];
    players.forEach((player, index) => {
      const randomIndex = randInt(0, shuffledArray.length - 1);
      player.setState("role", shuffledArray[randomIndex], true);
      player.setState("chats", [introductions[shuffledArray[randomIndex]]]);
      if (shuffledArray[randomIndex] === "wizard") newWizards.push(index);
      shuffledArray.splice(randomIndex, 1);
    });
    console.log({ newWizards });
    setWizards(newWizards, true);
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
  const phaseEnd = () => {
    let newTime = 0;
    switch (getState("phase")) {
      case "choosePlayer":
        setPhase("result", true);
        break;
      case "result":
        setPhase("chooseCard", true);
        break;
      case "chooseCard":
        setPhase("revealCard", true);
        break;
      case "revealCard":
        setPhase("action", true);
        break;
      case "action":
        setPhase("choosePlayerCard", true);
        break;
      case "choosePlayerCard":
        setPhase("checkPoints", true);
        break;
      case "checkPoints":
        setPhase("end", true);
        break;
      default:
        break;
    }
    setTimer(newTime, true);
  };

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
      case "choosePlayer": {
        players.forEach((player, index) => {
          const modalTitle =
            stoppedPlayer === index
              ? "You is choosing a player"
              : `${
                  players[stoppedPlayer].getProfile().name
                } is choosing a player`;
          const modalBody = "";
          player.setState("modalTitle", modalTitle);
          player.setState("modalBody", modalBody);
        });
      }
    }
  };
  useEffect(() => {
    setModalContent();
  }, [phase]);
  const setNextPlayerTurn = () => {
    const newPlayerTurn = (getState("playerTurn") + 1) % players.length;
    setPlayerTurn(newPlayerTurn, true);
  };

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

  useEffect(() => {
    if (isHost() && next) phaseEnd();
  }, [next]);

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
