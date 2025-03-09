import { useEffect, useState } from "react";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { useGameEngine } from "../hooks/useGameEngine";
import { isHost, myPlayer, setState } from "playroomkit";
export default () => {
  const [newRoundVisible, setNewRoundVisible] = useState(false);
  const [stopVisible, setStopVisible] = useState(true);

  const me = myPlayer();
  const role = me.getState("role");
  const { phase, round, players } = useGameEngine();
  const myIndex = players.findIndex((player) => player.id === me.id);

  useEffect(() => {
    const isStopVisible = role !== "traitor" && phase === "discussion";
    const isNewRoundVisible = isHost();
    setStopVisible(isStopVisible);
    setNewRoundVisible(isNewRoundVisible);
  }, [role, phase]);

  const onStopClick = () => {
    setState("stoppedPlayer", myIndex, true);
    setState("phase", "stop-description", true);
    setState("timer", 5, true);
  };
  const onNewRound = () => {
    setState("timer", 1, true);
    setState("phase", "shuffle");
  };

  return (
    <Fab
      event="click"
      icon={<i className="fa-solid fa-plus"></i>}
      alwaysShowTitle={true}
    >
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
