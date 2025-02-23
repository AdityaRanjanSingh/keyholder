import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { useGameEngine } from "../hooks/useGameEngine";
import { isHost, myPlayer, setState } from "playroomkit";
import { toast } from "react-toastify";
export default () => {
  const navigate = useNavigate();
  const [newRoundVisible, setNewRoundVisible] = useState(false);
  const [stopVisible, setStopVisible] = useState(true);

  const me = myPlayer();
  const role = me.getState("role");
  const { phase, round, players } = useGameEngine();
  const myIndex = players.findIndex((player) => player.id === me.id);

  useEffect(() => {
    const isStopVisible = role !== "traitor" && phase === "introduction";
    const isNewRoundVisible = isHost();
    setStopVisible(isStopVisible);
    setNewRoundVisible(isNewRoundVisible);
  }, [role, phase]);

  const onStopClick = () => {
    setState("stoppedPlayer", myIndex, true);
    setState("phase", "choosePlayer", true);
    setState("timer", 15, true);
  };
  const onNewRound = () => {
    setState("round", round + 1, true);
  };

  return (
    <Fab
      event="click"
      icon={<i className="fa-solid fa-plus"></i>}
      alwaysShowTitle={true}
    >
      <Action text="Learn" onClick={() => navigate("/learn")}>
        <i className="fa-brands fa-leanpub"></i>
      </Action>
      {stopVisible && (
        <Action text="Stop" onClick={onStopClick}>
          <i className="fa-solid fa-circle-stop"></i>
        </Action>
      )}
      <Action text="Restart" onClick={onNewRound}>
        <i className="fa-solid fa-rotate-right"></i>
      </Action>
    </Fab>
  );
};
