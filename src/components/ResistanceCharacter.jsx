import { useEffect, useMemo, useState } from "react";
import { useGameEngine } from "../hooks/useGameEngine";

export default ({ index = 0 }) => {
  const { players } = useGameEngine();

  const [player, setPlayer] = useState({
    photo: "https://api.dicebear.com/9.x/personas/svg",
    name: "test",
    role: "Guard",
  });

  const photo = players[index].getProfile().photo;
  const name = players[index].getProfile().name;
  const role = players[index].getState("role");

  useEffect(() => {
    setPlayer({ photo, name, role });
  }, [photo === true, name, role]);

  console.log({ player });
  return (
    <div className="w-20 m-2">
      <figure>
        <img src={player.photo} alt="Photo" className="rounded-xl" />
      </figure>
      <div className="items-center text-center">
        <h2 className="text-md">{player.name}</h2>
        <p>{player.role}</p>
      </div>
    </div>
  );
};
