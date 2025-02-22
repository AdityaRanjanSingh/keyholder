import { isHost, isStreamScreen, myPlayer, setState } from "playroomkit";
import { useEffect, useState } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import Character from "../components/Character";
import Wizard from "../components/Wizard";
import Confetti from "react-confetti";
import Treasures from "../components/Treasures";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default () => {
  const { phase, players, wizards, timer, round, winner, stoppedPlayer } =
    useGameEngine();
  const [modalButton, setModalButton] = useState("Okay");
  const [stopVisible, setStopVisible] = useState(true);
  const navigate = useNavigate();

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
            {isHost() && (
              <div className="flex flex-col">
                <h3 className="text-md capitalize">{phase}</h3>
                <h3>{timer}</h3>
              </div>
            )}
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
          <button className="btn btn-primary" onClick={onStopClick}>
            Stop
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM9 9H15V15H9V9Z"></path>
            </svg>
          </button>
        )}
        {actionVisible && (
          <button className="btn  btn-primary" onClick={onActionClicked}>
            Ring
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9.46488 1L7.69076 3.66118L9.55579 5.35667C6.05273 6.40661 3.5 9.6552 3.5 13.5C3.5 18.1944 7.30558 22 12 22C16.6944 22 20.5 18.1944 20.5 13.5C20.5 9.65523 17.9473 6.40667 14.4443 5.35669L16.3094 3.66118L14.5352 1H9.46488ZM12 7C15.5899 7 18.5 9.91015 18.5 13.5C18.5 17.0899 15.5899 20 12 20C8.41015 20 5.5 17.0899 5.5 13.5C5.5 9.91015 8.41015 7 12 7ZM10.3094 3.33882L10.5352 3H13.4649L13.6908 3.33882L12.0001 4.87581L10.3094 3.33882Z"></path>
            </svg>
          </button>
        )}
        {newRoundVisible && (
          <button className="btn btn-secondary" onClick={onNewRound}>
            New round
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"></path>
            </svg>
          </button>
        )}
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          Introduction
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM13 13.3551V14H11V12.5C11 11.9477 11.4477 11.5 12 11.5C12.8284 11.5 13.5 10.8284 13.5 10C13.5 9.17157 12.8284 8.5 12 8.5C11.2723 8.5 10.6656 9.01823 10.5288 9.70577L8.56731 9.31346C8.88637 7.70919 10.302 6.5 12 6.5C13.933 6.5 15.5 8.067 15.5 10C15.5 11.5855 14.4457 12.9248 13 13.3551Z"></path>
          </svg>
        </button>
        <button className="btn" onClick={() => navigate("/learn")}>
          How to play
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H9C10.1947 3 11.2671 3.52375 12 4.35418C12.7329 3.52375 13.8053 3 15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13ZM20 19V5H15C13.8954 5 13 5.89543 13 7V19H20ZM11 19V7C11 5.89543 10.1046 5 9 5H4V19H11Z"></path>
          </svg>
        </button>
      </div>
    </>
  );
};
