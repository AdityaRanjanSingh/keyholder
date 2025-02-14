import { isHost, isStreamScreen, myPlayer, setState } from "playroomkit";
import { useEffect, useState } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import Character from "./Character";
import Wizard from "./Wizard";
import Confetti from "react-confetti";
import Treasure from "./Treasure";

const audios = {
  background: new Audio("/audios/Drunken Sailor - Cooper Cannell.mp3"),
  introductions: new Audio("/audios/introduction.mp3"),
  punch: new Audio("/audios/punch.mp3"),
  shield: new Audio("/audios/shield.mp3"),
  grab: new Audio("/audios/grab.mp3"),
  fail: new Audio("/audios/fail.mp3"),
  cards: new Audio("/audios/cards.mp3"),
};

export default () => {
  const { phase, players, wizards, timer } = useGameEngine();
  const [modalButton, setModalButton] = useState("Okay");
  const [stopVisible, setStopVisible] = useState(true);
  const [actionVisible, setActionVisible] = useState(false);

  const [confettiVisible, setConfettiVisible] = useState(false);

  const me = myPlayer();
  const role = me.getState("role");
  const modalTitle = me.getState("modalTitle");
  const modalBody = me.getState("modalBody");

  const treasureCards = me.getState("treasureCards") || [];

  const myIndex = players.findIndex((player) => player.id === me.id);

  useEffect(() => {
    setConfettiVisible(phase === "end");
    document.getElementById("my_modal_5").showModal();
    setTimeout(() => {
      setConfettiVisible(false);
    }, 10000);
  }, [phase]);

  useEffect(() => {
    const isStopVisible = role !== "traitor" && phase === "introduction";
    const isActionVisible = phase === "action";
    setStopVisible(isStopVisible);
    setActionVisible(isActionVisible);
  }, [role, phase]);

  // AUDIO MANAGER
  const [audioEnabled, setAudioEnabled] = useState(false);
  const toggleAudio = () => {
    setAudioEnabled((prev) => !prev);
  };

  const onStopClick = () => {
    setState("stoppedPlayer", myIndex, true);
    setState("phase", "choosePlayer", true);
    setState("timer", 10, true);
  };

  const onPlayerSelect = (index) => {
    me.setState("selectedPlayer", index, true);
    setState("phase", "result");
  };

  useEffect(() => {
    if (!audioEnabled) {
      return;
    }
    let audioToPlay;
    if (phase === "introductions") {
      audioToPlay = audios.introductions;
    }

    if (phase === "voting") {
      audioToPlay = audios.cards;
    }
    if (audioToPlay) {
      audioToPlay.currentTime = 0;
      audioToPlay.play();
    }
  }, [phase, audioEnabled]);
  return (
    <>
      <Confetti
        gravity={0.1}
        numberOfPieces={200}
        opacity={1}
        wind={0}
        run={confettiVisible}
      />
      <div className="flex justify-center">
        <div className="artboard  w-full">
          <div className="navbar bg-base-300 gap-2 align-middle">
            <div className="flex-none gap-2">
              <div className="dropdown dropdown-end">
                <div className="btn-circle avatar">
                  <div className="w-15 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={me.getProfile().photo}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex-col items-start">
              <h2 className="text-lg text-start uppercase">
                {me.getProfile().name}
              </h2>
              <h2 className="text-sm text-start uppercase">{role}</h2>
            </div>
            <div className="">
              <h3>{timer}</h3>
            </div>
          </div>
          <div className="card bg-base-300 shadow-xl p-5 justify-center m-5">
            <h2 className="text-2xl text-center font-bold uppercase">
              Wizards
            </h2>
            <div className="flex justify-center">
              {wizards.map((index) => (
                <button onClick={() => onPlayerSelect(index)}>
                  <Wizard key={index} index={index}></Wizard>
                </button>
              ))}
            </div>
          </div>
          <div className="p-5 justify-center card bg-base-300 shadow-xl m-5">
            <h2 className="text-2xl text-center font-bold uppercase">
              Adventurers
            </h2>
            <div className="flex flex-row justify-center flex-wrap flex-1">
              {players.map(
                (player, index) =>
                  !wizards.includes(index) && (
                    <button
                      className="justify-start"
                      onClick={() => onPlayerSelect(index)}
                    >
                      <Character key={index} index={index} />
                    </button>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{modalTitle}</h3>
          <p className="py-4">{modalBody}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn w-fit">{modalButton}</button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="m-5">
        <div className="flex flex-row items-center gap-2">
          <h2 className="text-xl font-semibold">Treasure</h2>
          <div className="badge badge-accent">5</div>
        </div>
        {treasureCards.map(() => (
          <Treasure></Treasure>
        ))}
      </div>
      <div className="absolute flex flex-col-reverse bottom-10 right-10 gap-2">
        {stopVisible && (
          <button className="btn btn-circle btn-primary" onClick={onStopClick}>
            Stop
          </button>
        )}
        {actionVisible && (
          <button
            className="btn btn-circle btn-info"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Action
          </button>
        )}
        <button
          className="btn btn-circle btn-info"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          Help
        </button>
      </div>
    </>
  );
};
