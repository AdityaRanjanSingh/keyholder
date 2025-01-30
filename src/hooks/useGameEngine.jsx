import { useControls } from "leva";
import {
  getState,
  isHost,
  onPlayerJoin,
  setState,
  useMultiplayerState,
  usePlayersList,
} from "playroomkit";
import React, { useEffect, useRef } from "react";
import { randInt } from "three/src/math/MathUtils";
import { ROLES } from "../constants";

const GameEngineContext = React.createContext();

const TIME_PHASE_INTRODUCTIONS = 10;
const TIME_PHASE_NOMINATIONS = 10;
const TIME_PHASE_VOTE_NOMINATIONS = 10;
const TIME_PHASE_MISSON_VOTE = 10;
const TIME_PHASE_MISSION_RESULT = 10;
export const NB_MISSIONS = 5;
const NB_GEMS = 3;
const PLAYERS_SPIES = {
  3: 1,
  4: 1,
  5: 2,
  6: 2,
  7: 3,
  8: 3,
  9: 4,
};
const MISSION_PLAYERS = {
  5: [2, 3, 2, 3, 3],
  6: [2, 3, 4, 3, 4],
  7: [2, 3, 3, 4, 4],
  8: [3, 4, 4, 5, 5],
  9: [3, 4, 4, 5, 5],
  10: [3, 4, 4, 5, 5],
};

export const GameEngineProvider = ({ children }) => {
  // GAME STATE
  const [timer, setTimer] = useMultiplayerState("timer", 0);
  const [mission, setMission] = useMultiplayerState("mission", 1);
  const [missionSuccess, setMissionSuccess] = useMultiplayerState(
    "missionSuccess",
    0
  );
  const [missionFailure, setMissionFailure] = useMultiplayerState(
    "missionFailure",
    0
  );
  const [nominationFailure, setNominationFailure] = useMultiplayerState(
    "nominationFailure",
    0
  );

  const [phase, setPhase] = useMultiplayerState("phase", "lobby");
  const [playerTurn, setPlayerTurn] = useMultiplayerState("playerTurn", 0);
  const [playerStart, setPlayerStart] = useMultiplayerState("playerStart", 0);
  const [deck, setDeck] = useMultiplayerState("deck", []);
  const [rolesDeck, setRolesDeck] = useMultiplayerState("rolesDeck", []);

  const [gems, setGems] = useMultiplayerState("gems", NB_GEMS);
  const [nominations, setNominations] = useMultiplayerState("nominations", []);

  const [actionSuccess, setActionSuccess] = useMultiplayerState(
    "actionSuccess",
    true
  );

  const players = usePlayersList(true);
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
    gems,
    deck,
    nominations,
    actionSuccess,
  };

  const startGame = () => {
    if (isHost()) {
      console.log("Start game");
      setTimer(TIME_PHASE_INTRODUCTIONS, true);
      const randomPlayer = randInt(0, players.length - 1); // we choose a random player to start
      setPlayerStart(randomPlayer, true);
      setPlayerTurn(randomPlayer, true);
      setMission(1, true);
      const totalPlayers = players.length;
      const NB_MISSON_PLAYERS = MISSION_PLAYERS[totalPlayers];
      setMissionPlayers(NB_MISSON_PLAYERS, true);
      const spies = PLAYERS_SPIES[players.length];
      const resistance = players.length - spies;
      setRolesDeck([
        ...new Array(spies).fill(0).map(() => "spy"),
        ...new Array(resistance).fill(0).map(() => "resistance"),
      ]);
      setNominations([], true);
      resetMissionVote();
      resetNominationVote();

      players.forEach((player) => {
        const randomPlayer = randInt(0, players.length - 1); // we choose a random player to start

        console.log("Setting up player", player.id);
        player.setState("cards", [], true);
        player.setState("gems", 0, true);
        player.setState("shield", false, true);
        player.setState("winner", false, true);
      });
      distributeRoles(players.length);
      setPhase("introductions", true);
    }
  };

  const distributeRoles = (number) => {
    const newDeck = [...getState("rolesDeck")];
    const shuffledArray = newDeck.sort((a, b) => 0.5 - Math.random());
    players.forEach((player) => {
      const randomIndex = randInt(0, shuffledArray.length - 1);
      player.setState("role", shuffledArray[randomIndex], true);
      shuffledArray.splice(randomIndex, 1);
    });
  };
  useEffect(() => {
    startGame();
    onPlayerJoin(startGame); // we restart the game when a new player joins
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
      case "introductions":
        setPhase("nominations", true);
        newTime = TIME_PHASE_NOMINATIONS;
        break;
      case "nominations": {
        const newNominations = [];
        new Array(missionPlayers[mission - 1]).fill(0).forEach(() => {
          const random = randInt(0, players.length - 1);
          const addRandomToNomination = (random) => {
            if (newNominations.includes(random)) {
              const newrandom = randInt(0, players.length - 1);
              addRandomToNomination(newrandom);
            } else {
              newNominations.push(random);
            }
          };
          addRandomToNomination(random);
        });
        setNominations(newNominations, true);
        setPhase("voteNomination", true);
        newTime = TIME_PHASE_VOTE_NOMINATIONS;
        break;
      }
      case "voteNomination": {
        players.forEach((player) => {
          const playerSelectedCard = player.getState("selectedNominationCard");
          if (![0, 1].includes(playerSelectedCard)) {
            player.setState("selectedNominationCard", randInt(0, 1), true);
          }
        });
        setPhase("voteResult", true);
        break;
      }
      case "voteResult": {
        let approveVote = players.filter(
          (player) => player.getState("selectedNominationCard") === 1
        ).length;
        if (approveVote >= players.length / 2) {
          setNominationFailure(0, true);
          setPhase("nominationSuccess", true);
        } else {
          setNominationFailure(nominationFailure + 1, true);

          setPhase("nominationFailure", true);
        }
        break;
      }
      case "nominationSuccess":
        newTime = TIME_PHASE_MISSON_VOTE;
        setPhase("voteMission", true);
        resetNominationVote();
        break;
      case "nominationFailure":
        if (getState("nominationFailure") === 5) {
          console.log("End of game");
          setPhase("end", true);
        } else {
          setNextPlayerTurn();
          setNominations([], true);
          resetNominationVote();
          newTime = TIME_PHASE_NOMINATIONS;
          setPhase("nominations", true);
        }
        break;
      case "voteMission": {
        players.forEach((player) => {
          const selectedCard = player.getState("selectedMissionCard");
          if (![0, 1].includes(selectedCard)) {
            player.setState("selectedMissionCard", randInt(0, 1), true);
          }
        });
        newTime = TIME_PHASE_MISSION_RESULT;
        setPhase("missionResult", true);
        break;
      }
      case "missionResult": {
        let failureMission = players.some(
          (player) => player.getState("selectedMissionCard") === 0
        );
        if (failureMission) {
          setPhase("missionFailure");
          setMissionFailure(missionFailure + 1, true);
        } else {
          setPhase("missionSuccess");
          setMissionSuccess(missionSuccess + 1, true);
        }
        break;
      }
      case "missionSuccess":
        resetMissionVote();
        if (getState("missionSuccess") === 3) {
          console.log("End of game");
          setPhase("end", true);
        } else {
          newTime = TIME_PHASE_NOMINATIONS;
          setNominations([], true);
          setNextPlayerTurn();
          setPhase("nominations");
        }
        break;
      case "missionFailure":
        resetMissionVote();
        if (getState("missionFailure") === 3) {
          console.log("End of game");
          setPhase("end", true);
        } else {
          newTime = TIME_PHASE_NOMINATIONS;
          setNominations([], true);
          setNextPlayerTurn();
          setPhase("nominations");
        }
        setMission(mission + 1, true);
      default:
        break;
    }
    setTimer(newTime, true);
  };

  const { paused } = useControls({
    paused: false,
  });
  const timerInterval = useRef();

  const resetNominationVote = () => {
    players.forEach((players) => {
      players.setState("selectedNominationCard", 10, true);
    });
  };

  const resetMissionVote = () => {
    players.forEach((players) => {
      players.setState("selectedMissionCard", 10, true);
    });
  };

  const setNextPlayerTurn = () => {
    const newPlayerTurn = (getState("playerTurn") + 1) % players.length;
    setPlayerTurn(newPlayerTurn, true);
  };

  const runTimer = () => {
    timerInterval.current = setInterval(() => {
      if (!isHost()) return;
      if (paused) return;
      let newTime = getState("timer") - 1;
      console.log("Timer", newTime);

      if (newTime <= 0) {
        phaseEnd();
      } else {
        setTimer(newTime, true);
      }
    }, 1000);
  };

  const clearTimer = () => {
    clearInterval(timerInterval.current);
  };

  useEffect(() => {
    runTimer();
    return clearTimer;
  }, [phase, paused]);

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
