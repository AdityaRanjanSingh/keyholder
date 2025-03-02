import { useMemo } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import { myPlayer } from "playroomkit";

export default ({ index = 0 }) => {
  const { players, phase } = useGameEngine();
  const player = players[index];
  const role = player.getState("role");
  const isTeamRevealed = phase === "result";
  const me = myPlayer();
  const myPlayerRole = me.getState("role");
  const cardBgColor = useMemo(() => {
    const isBlueTeam = ["wizard-good", "keyholder", "guard"].includes(role);

    const isWizard = ["wizard-good", "wizard-evil"].includes(role);

    if (isWizard && !isTeamRevealed) return "wizard text-primary-content";

    if (
      phase === "keyholder" &&
      role === "keyholder" &&
      !["wizard-good", "wizard-evil"].includes(myPlayerRole)
    )
      return "blue-team text-primary-content";

    return isTeamRevealed
      ? isBlueTeam
        ? "blue-team text-primary-content"
        : "red-team text-primary-content"
      : "bg-base-200";
  }, [role, phase, isTeamRevealed]);

  const roleTitle = useMemo(() => {
    const isWizardVisible =
      phase === "result" && ["wizard-good", "wizard-evil"].includes(role);
    const isKeyholderVisible =
      ["keyholder"].includes(phase) &&
      !["wizard-good", "wizard-evil"].includes(myPlayerRole) &&
      role === "keyholder";

    return isWizardVisible || isKeyholderVisible
      ? player.getState("role")
      : ["wizard-good", "wizard-evil"].includes(role)
      ? "wizard"
      : "";
  }, [phase, role, myPlayerRole]);

  return (
    <div className={"flex items-center rounded-box m-2 " + `${cardBgColor}`}>
      <img
        className="size-20 m-2 flex-none"
        src={player.getProfile().photo}
        alt={player.getProfile().name}
      />
      <div className="flex-col flex-1">
        <h3 className={"text-3xl"}>{player.getProfile().name}</h3>
        <h3 className="text-md">{roleTitle}</h3>
      </div>
    </div>
  );
};
