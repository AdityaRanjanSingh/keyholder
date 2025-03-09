import { useEffect, useMemo, useState } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import { myPlayer } from "playroomkit";
import { animate } from "motion";
import { motion } from "motion/react";

export default ({ index = 0 }) => {
  const { players, phase, wizards, keyholder } = useGameEngine();
  const player = players[index];
  const role = player.getState("role");
  const me = myPlayer();

  const [wizedVisible, setWizardVisible] = useState(false);

  const myIndex = players.findIndex((player) => player.id === me.id);

  const isTeamRevealed = phase === "result";
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
      : "";
  }, [role, phase, isTeamRevealed]);

  const keyholderVisible = useMemo(() => {
    return (
      ["keyholder", "discussion", "stop"].includes(phase) &&
      !["wizard-good", "wizard-evil"].includes(myPlayerRole) &&
      role === "keyholder"
    );
  }, [role, myPlayerRole, phase]);

  const roleTitle = useMemo(() => {
    const isWizardVisible =
      phase === "result" && ["wizard-good", "wizard-evil"].includes(role);
    const isKeyholderVisible =
      ["keyholder", "discussion", "stop"].includes(phase) &&
      !["wizard-good", "wizard-evil"].includes(myPlayerRole) &&
      role === "keyholder";

    const isPersonsRole = myIndex === index;
    setWizardVisible(isWizardVisible);
    return isWizardVisible || isKeyholderVisible || false
      ? player.getState("role")
      : ["wizard-good", "wizard-evil"].includes(role)
      ? "wizard"
      : "";
  }, [phase, role, myPlayerRole]);

  useEffect(() => {
    // if (!wizedVisible) return;
    // const animatePlayer = `player${index}`;
    // animate(
    //   animatePlayer,
    //   {
    //     x: 0,
    //   },
    //   {
    //     duration: 0.8,
    //     delay: 0.5,
    //     ease: [0, 0.71, 0.2, 1.01],
    //   }
    // );

    const changeColor = (index, color) => {
      animate(
        `.player${index}`,
        {
          background: color,
        },
        {
          duration: 2,
        }
      );
    };
    const animateHeight = (index) => {
      animate(
        `.player${index}`,
        {
          rotateZ: [15, -15, 0],
        },
        {
          duration: 1,
          repeat: 2,
          repeatType: "reverse",
        }
      );
    };

    if (phase === "role") {
      animateHeight(myIndex);
    }
    if (phase === "shuffle") {
      players.forEach((p, idx) => changeColor(idx, "#d8e2dc"));
    }
    if (phase === "wizard") {
      wizards.forEach((idx) => {
        changeColor(idx, "#ffd166");
        animateHeight(idx);
      });
    }
    if (phase === "keyholder") {
      if (keyholderVisible) {
        changeColor(keyholder, "#118ab2");
        animateHeight(keyholder);
      }
    }
  }, [phase]);

  const playerName = useMemo(() => {
    return myIndex === index ? "You" : player.getProfile().name;
  }, [myIndex, index]);

  return (
    <motion.div
      className={`rounded-box player${index} m-2 text-primary-content prose-h2`}
      style={{ background: "#d8e2dc" }}
    >
      <div className={"flex items-center "}>
        <img
          className="size-20 m-2 flex-none"
          src={player.getProfile().photo}
          alt={player.getProfile().name}
        />
        <div className="flex-col flex-1">
          <h3 className={"text-3xl"}>{playerName}</h3>
          <h3 className="text-md uppercase">{roleTitle}</h3>
        </div>
      </div>
    </motion.div>
  );
};
