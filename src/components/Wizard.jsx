import { useEffect, useMemo, useState } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import { myPlayer } from "playroomkit";
import wizardPhoto from "../assets/photos/wizard.jpg";
import wizardRed from "../assets/photos/wizard-red.jpg";

export default ({ index = 0 }) => {
  const { players, phase } = useGameEngine();

  const [player, setPlayer] = useState({
    photo: "https://api.dicebear.com/9.x/personas/svg",
    name: "test",
    role: "Guard",
  });

  const name = players[index].getProfile().name;
  const photo = players[index].getProfile().photo;

  const role = players[index].getState("role");

  const me = myPlayer();

  const myRole = me.getState("role");

  const showRole =
    phase === "end" || (myRole !== "wizard" && role === "keyholder");

  useEffect(() => {
    setPlayer({ photo, name, role });
  }, [photo !== false, name, role]);

  return (
    <div className="w-20 m-2">
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
