import { useMemo } from "react";
import { useGameEngine } from "../hooks/useGameEngine";

export default ({ index = 0 }) => {
  const { players } = useGameEngine();

  const name = useMemo(() => {
    const currentPlayer = players[index];
    return currentPlayer.getProfile().name;
  }, [index, players]);
  const photo = useMemo(() => {
    const currentPlayer = players[index];
    return currentPlayer.getProfile().photo ?? undefined;
  }, [index, players]);
  const playerRole = useMemo(() => {
    const currentPlayer = players[index];
    return currentPlayer.getState("role");
  }, [index, players]);

  return (
    <div>
      <figure className="flex justify-center">
        <div className="avatar">
          <div className="w-20 rounded-full">
            <img src={photo} />
          </div>
        </div>
      </figure>
      <h5 className="text-sm text-center">{name}</h5>
      <h5 className="text-sm text-center">{playerRole}</h5>
    </div>
  );
};
