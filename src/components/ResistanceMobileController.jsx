import { isHost, isStreamScreen, myPlayer, setState } from "playroomkit";
import { useEffect, useState } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import ResistanceCharacter from "./ResistanceCharacter";
import Wizard from "./Wizard";
import { toast } from "react-toastify";
import Confetti from "react-confetti";

const audios = {
  background: new Audio("/audios/Drunken Sailor - Cooper Cannell.mp3"),
  introductions: new Audio("/audios/introduction.mp3"),
  punch: new Audio("/audios/punch.mp3"),
  shield: new Audio("/audios/shield.mp3"),
  grab: new Audio("/audios/grab.mp3"),
  fail: new Audio("/audios/fail.mp3"),
  cards: new Audio("/audios/cards.mp3"),
};

const introductions = {
  goodWizard:
    "You are the Good Wizard! Your goal is to help the group complete their mission and identify the Traitor.",
  evilWizard:
    "You are the Evil Wizard! You secretly work against the group, but they don’t know it. Your goal is to find out which player is the Key Holder and stop them from succeeding.",
  keyholder:
    "You are the Key Holder! Your goal is to find the Good Wizard and secretly pass them the key. Be careful—if you give it to the wrong person, disaster may follow! Watch the players, look for signs of trust, and make your choice wisely.",
  guard:
    "You are a Guard! Your goal is to protect the group by identifying the Traitor. Pay close attention to everyone’s actions and words—someone is working against you. Work with the team, trust wisely, and uncover the traitor before it's too late!",
  wizard:
    "You are a Guard! Your goal is to protect the group by identifying the Bad Wizard. Pay close attention to everyone’s actions and words—someone is working against you. Work with the team, trust wisely, and uncover the traitor before it's too late!",
  traitor:
    "You are the Traitor! You secretly work with the Bad Wizard to find the Key Holder, but the group thinks you're on their side. Earn their trust, gather information, and subtly guide the Bad Wizard to their target. Be careful—if they suspect you, your plan could fall apart!",
};

export default () => {
  const { phase, players, wizards, timer } = useGameEngine();
  const [modalButton, setModalButton] = useState("Okay");
  const [stopVisible, setStopVisible] = useState(true);

  const [confettiVisible, setConfettiVisible] = useState(false);

  const me = myPlayer();
  const role = me.getState("role");
  const modalTitle = me.getState("modalTitle");
  const modalBody = me.getState("modalBody");

  console.log({ modalTitle, modalBody });

  const myIndex = players.findIndex((player) => player.id === me.id);

  useEffect(() => {
    setConfettiVisible(phase === "end");
    document.getElementById("my_modal_5").showModal();
    setTimeout(() => {
      setConfettiVisible(false);
    }, 10000);
  }, [phase]);

  useEffect(() => {
    if (role !== "traitor" && phase === "introduction") {
      setStopVisible(true);
    } else {
      setStopVisible(false);
    }
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
    setState("phase", "");
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
                    <button className="justify-start" onClick={() => onPlayerSelect(index)}>
                      <ResistanceCharacter key={index} index={index} />
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
      <div className="absolute flex justify-center bottom-10 left-auto right-auto w-full">
        {stopVisible && (
          <button className="btn btn-active btn-primary" onClick={onStopClick}>
            Stop
          </button>
        )}
      </div>
      <div className="absolute flex bottom-10 right-10">
        <button
          className="btn btn-circle btn-info"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          ?
        </button>
      </div>
    </>
  );
};
