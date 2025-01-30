import { isHost, isStreamScreen, myPlayer } from "playroomkit";
import { useEffect, useState } from "react";
import { NB_MISSIONS, useGameEngine } from "../hooks/useGameEngine";

const audios = {
  background: new Audio("/audios/Drunken Sailor - Cooper Cannell.mp3"),
  punch: new Audio("/audios/punch.mp3"),
  shield: new Audio("/audios/shield.mp3"),
  grab: new Audio("/audios/grab.mp3"),
  fail: new Audio("/audios/fail.mp3"),
  cards: new Audio("/audios/cards.mp3"),
};

export const UI = () => {
  const {
    phase,
    startGame,
    timer,
    playerTurn,
    players,
    mission,
    getCard,
    actionSuccess,
    missionSuccess,
    nominations,
    missionPlayers,
  } = useGameEngine();

  const currentPlayer = players[playerTurn];
  const me = myPlayer();
  const myIndex = players.findIndex((player) => player.id === me.id);
  const missionPlayersNames = (nominations || [])
    .map((index) => players[index].state.profile?.name)
    .join(" and ");
  const noOfmissionPlayers = missionPlayers[mission - 1];
  let label = "";
  switch (phase) {
    case "introductions":
      label = "Only spies can see the player roles";
      break;
    case "nominations":
      label =
        currentPlayer?.id === me.id
          ? `Nominate ${noOfmissionPlayers} players to send on mission`
          : currentPlayer?.state.profile?.name +
            " is nominating players for mission";
      break;
    case "voteNomination":
      label = missionPlayersNames + " are nominated for mission";
      break;
    case "voteResult":
      label = "Counting votes";
      break;
    case "nominationSuccess":
      label = "Nomination is approved";
      break;
    case "nominationFailure":
      label = "Nomination is rejected";
      break;
    case "voteMission":
      label = nominations.includes(myIndex)
        ? "Support or sabotage mission"
        : "Mission in progress";
      break;
    case "missionSuccess":
      label = "Mission is successful";
      break;
    case "missionFailure":
      label = "Mission has failed";
      break;
    case "end":
      label = "Game Over";
      break;
    default:
      break;
  }

  // AUDIO MANAGER
  const [audioEnabled, setAudioEnabled] = useState(false);
  const toggleAudio = () => {
    setAudioEnabled((prev) => !prev);
  };

  useEffect(() => {
    if (audioEnabled) {
      audios.background.play();
      audios.background.loop = true;
    } else {
      audios.background.pause();
    }
    return () => {
      audios.background.pause();
    };
  }, [audioEnabled]);

  useEffect(() => {
    if (!audioEnabled) {
      return;
    }
    let audioToPlay;
    if (phase === "playerAction") {
      if (actionSuccess) {
        audioToPlay = audios[getCard()];
      } else {
        audioToPlay = audios.fail;
      }
    }
    if (phase === "voting") {
      audioToPlay = audios.cards;
    }
    if (audioToPlay) {
      audioToPlay.currentTime = 0;
      audioToPlay.play();
    }
  }, [phase, actionSuccess, audioEnabled]);
  return (
    <div className="text-white drop-shadow-xl fixed top-0 left-0 right-0 bottom-0 z-10 flex flex-col pointer-events-none">
      <div className="p-4 w-full flex items-center justify-between">
        <h2 className="text-2xl font-bold text-center uppercase">
          Mission {mission}/{NB_MISSIONS}
        </h2>
        <div className=" flex items-center gap-1 w-14">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="mission"
              strokeLinejoin="mission"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-center uppercase">{timer}</h2>
        </div>
      </div>
      <div className="flex-1" />
      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold text-center">{label}</h1>

        {phase === "end" && (
          <p className="text-center">
            Winner: {missionSuccess >= 3 ? "Resistance" : "Spies"}!
          </p>
        )}
        {isHost() && phase === "end" && (
          <button
            onClick={startGame}
            className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded pointer-events-auto"
          >
            Play again
          </button>
        )}
      </div>
      {isStreamScreen() && (
        <button
          className="fixed bottom-4 left-4 pointer-events-auto"
          onClick={toggleAudio}
        >
          {audioEnabled ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="mission"
                strokeLinejoin="mission"
                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="mission"
                strokeLinejoin="mission"
                d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};
