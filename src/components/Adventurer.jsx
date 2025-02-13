import { useEffect, useMemo, useState } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import { myPlayer } from "playroomkit";
import wizardPhoto from "../assets/photos/wizard-red.jpg";
const wizardIcon = "https://img.icons8.com/emoji/48/mage-emoji.png";
const blackWizardIcon = "https://img.icons8.com/emoji/48/man-mage.png";
const guard =
  "https://img.icons8.com/external-victoruler-solid-victoruler/64/228BE6/external-guard-occupation-and-people-victoruler-solid-victoruler.png";
const keyholder = "https://img.icons8.com/bubbles/500/key.png";
export default ({ index = 0 }) => {
  const { players, phase } = useGameEngine();

  const [player, setPlayer] = useState({
    photo: "https://api.dicebear.com/9.x/personas/svg",
    name: "test",
    role: "Guard",
  });

  const name = players[index].getProfile().name;
  const role = players[index].getState("role");

  const me = myPlayer();

  const myRole = me.getState("role");

  const showRole =
    phase === "end" || (myRole !== "wizard" && role === "keyholder");

  useEffect(() => {
    const photo =
      role === "wizard"
        ? wizardIcon
        : role === "guard"
        ? guard
        : role === "keyholder"
        ? keyholder
        : blackWizardIcon;

    setPlayer({ photo, name, role });
  }, [name, role]);

  return (
    <div className="w-20 m-2">
      <figure>
        <img src={wizardPhoto} alt="Photo" className="rounded-xl" />
      </figure>
      <div className="items-center text-center capitalize">
        <h2 className="text-md">{player.name}</h2>
        {showRole && <p>{player.role}</p>}
      </div>
    </div>
  );
};
