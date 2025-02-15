import { useEffect, useMemo, useState } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import { myPlayer } from "playroomkit";

export default ({ index = 0 }) => {
  const { players, phase } = useGameEngine();

  const [player, setPlayer] = useState({
    photo: "https://api.dicebear.com/9.x/personas/svg",
    name: "test",
    role: "Guard",
  });

  const photo = players[index].getProfile().photo;
  const name = players[index].getProfile().name;
  const role = players[index].getState("role");

  const me = myPlayer();

  const myRole = me.getState("role");

  const showRole =
    !["introduction", "choosePlayer"].includes(phase) ||
    (myRole !== "wizard" && role === "keyholder");

  useEffect(() => {
    setPlayer({ photo, name, role });
  }, [photo === true, name, role]);

  return (
    <div
      className="w-20 m-2"
      onClick={() => {
        me.setState("selectedPlayer", index, true);
      }}
    >
      <figure>
        <img src={player.photo} alt="Photo" className="rounded-xl" />
      </figure>
      <div className="items-center text-center capitalize">
        <h2 className="text-md">{player.name}</h2>
        {showRole && <p>{player.role}</p>}
      </div>
    </div>
  );
};
