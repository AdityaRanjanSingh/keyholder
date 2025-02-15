import { isHost, isStreamScreen, myPlayer, setState } from "playroomkit";
import { useEffect, useState } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import Character from "./Character";
import Wizard from "./Wizard";
import Confetti from "react-confetti";
import Treasures from "./Treasures";
import { toast } from "react-toastify";

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
  const { phase, players, wizards, timer, round, winner, stoppedPlayer } =
    useGameEngine();
  const [modalButton, setModalButton] = useState("Okay");
  const [stopVisible, setStopVisible] = useState(true);

  const [actionVisible, setActionVisible] = useState(false);
  const [newRoundVisible, setNewRoundVisible] = useState(false);

  const [confettiVisible, setConfettiVisible] = useState(false);

  const me = myPlayer();
  const role = me.getState("role");
  const modalTitle = me.getState("modalTitle");
  const modalBody = me.getState("modalBody");
  const toastMessage = me.getState("toastMessage");

  const treasureCards = me.getState("treasureCards") || [];

  const myIndex = players.findIndex((player) => player.id === me.id);

  useEffect(() => {
    if (toastMessage) toast(`${toastMessage}`);
  }, [toastMessage]);
  useEffect(() => {
    const isConfettiVisible = phase === "end" && myIndex === winner;
    setConfettiVisible(isConfettiVisible);
  }, [phase]);

  useEffect(() => {
    if (modalTitle !== "" || modalBody !== "") {
      document.getElementById("my_modal_5").showModal();
    }
  }, [modalTitle, modalBody, modalButton]);

  useEffect(() => {
    const isStopVisible = role !== "traitor" && phase === "introduction";
    const isActionVisible =
      phase === "result" &&
      treasureCards.some(({ type }) => type === "magicRing");
    const isNewRoundVisible = isHost();
    setStopVisible(isStopVisible);
    setActionVisible(isActionVisible);
    setNewRoundVisible(isNewRoundVisible);
  }, [role, phase]);

  // AUDIO MANAGER
  const [audioEnabled, setAudioEnabled] = useState(false);
  const toggleAudio = () => {
    setAudioEnabled((prev) => !prev);
  };

  const onStopClick = () => {
    setState("stoppedPlayer", myIndex, true);
    setState("phase", "choosePlayer", true);
    setState("timer", 15, true);
    toast("Choose a player");
  };

  const onNewRound = () => {
    setState("round", round + 1, true);
  };

  const onPlayerSelect = (index) => {
    if (stoppedPlayer === myIndex && phase === "choosePlayer") {
      me.setState("selectedPlayer", index, true);
      setState("phase", "result", true);
      setState("timer", 0, true);
    }
    if (phase === "takeAction") {
      toast("You have chosen " + players[index].getProfile().name);
      me.setState("selectedPlayer", index, true);
    }
  };

  const onActionClicked = () => {
    setState("setActionPlayer", myIndex);
    setState("phase", "takeAction");
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
        numberOfPieces={1000}
        opacity={1}
        wind={0}
        run={confettiVisible}
        recycle={false}
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
              <h2 className="text-lg text-primary text-start uppercase">
                {me.getProfile().name}
              </h2>
              <h2 className="text-sm text-start text-secondary  uppercase">
                {role}
              </h2>
            </div>
            <div className="flex flex-col">
              <h3 className="text-md capitalize">{phase}</h3>
              <h3>{timer}</h3>
            </div>
          </div>
          <div className="card bg-base-300 shadow-xl p-5 justify-center m-5">
            <h2 className="text-2xl text-center font-bold uppercase">
              Wizards
            </h2>
            <div className="flex justify-center">
              {wizards.map((index) => (
                <button key={index} onClick={() => onPlayerSelect(index)}>
                  <Wizard index={index}></Wizard>
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
                      key={index}
                      className="justify-start"
                      onClick={() => onPlayerSelect(index)}
                    >
                      <Character index={index} />
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
          <h3 className="font-bold text-lg capitalize">{modalTitle}</h3>
          <p className="py-4">{modalBody}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn w-fit">{modalButton}</button>
            </form>
          </div>
        </div>
      </dialog>
      <Treasures />
      <div className="absolute flex flex-col-reverse bottom-5 right-5 gap-2">
        {stopVisible && (
          <button className="btn btn-circle btn-primary" onClick={onStopClick}>
            Stop
          </button>
        )}
        {actionVisible && (
          <button className="btn btn-circle btn-info" onClick={onActionClicked}>
            Action
          </button>
        )}
        {newRoundVisible && (
          <button className="btn btn-circle btn-info" onClick={onNewRound}>
            New round
          </button>
        )}
        <button
          className="btn btn-circle btn-neutral"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          ?
        </button>
      </div>
    </>
  );
};
