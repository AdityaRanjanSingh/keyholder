"use client";
import CardBack from "../assets/photos/card-back.jpg";
import Copper from "../assets/photos/copper.jpg";
import Traitor from "../assets/photos/traitor.jpg";
import Gold from "../assets/photos/gold.jpg";
import Jewel from "../assets/photos/jewel.jpg";
import Platinum from "../assets/photos/platinum.jpg";
import Silver from "../assets/photos/silver.jpg";
import Guard from "../assets/photos/guard.jpg";
import Keyholder from "../assets/photos/keyholder.jpg";
import GoodWizard from "../assets/photos/wizard-good.jpg";
import EvilWizard from "../assets/photos/wizard-evil.jpg";
import WizardBack from "../assets/photos/wizard-back.jpg";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { useGameEngine } from "../hooks/useGameEngine";
import { myPlayer } from "playroomkit";

const FlippingCard = ({ type = "gold", className = "", flipped }) => {
  const [photo, setPhoto] = useState(Gold);
  const { phase } = useGameEngine();
  const player = myPlayer();
  useEffect(() => {
    let photoType = Gold;
    switch (type) {
      case "gold":
        photoType = Gold;
        break;
      case "silver":
        photoType = Silver;
        break;
      case "platinum":
        photoType = Platinum;
        break;
      case "jewel":
        photoType = Jewel;
        break;
      case "wizard-good":
        photoType = GoodWizard;
        break;
      case "wizard-evil":
        photoType = EvilWizard;
        break;
      case "keyholder":
        photoType = Keyholder;
        break;
      case "guard":
        photoType = Guard;
        break;
      case "traitor":
        photoType = Traitor;
        break;
      default:
        photoType = Gold;
    }
    setPhoto(photoType);
  }, [type]);
  const role = player.getState("role");
  const isFlipped = useMemo(() => {
    const isWizardVisible =
      phase === "result" && ["wizard-good", "wizard-evil"].includes(type);
    const isKeyholderVisible =
      ["keyholder"].includes(phase) &&
      !["wizard-good", "wizard-evil"].includes(role) &&
      type === "keyholder";

    return isWizardVisible || isKeyholderVisible || flipped;
  }, [phase, type]);

  const backSide = ["wizard-good", "wizard-evil"].includes(type)
    ? WizardBack
    : CardBack;
  return (
    <motion.div
      className={`${className} overflow-hidden`}
      style={{
        perspective: "600px", // Adds depth for 3D animation
      }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }} // Animates the flip
        transition={{ duration: 1 }} // Controls the flip speed
        className="relative"
        style={{
          transformStyle: "preserve-3d", // Enables 3D effect
        }}
      >
        {/* Front Side */}
        <motion.div
          style={{
            position: "absolute",
            backfaceVisibility: "hidden", // Ensures only one side is visible
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <figure>
            <img src={backSide} alt="Shoes" className="rounded-sm" />
          </figure>
          {["wizard-good", "wizard-evil"].includes(type) && (
            <h2 className="absolute bottom-0 text-primary text-xl glass w-full text-center">
              wizard
            </h2>
          )}
        </motion.div>
        <motion.div
          style={{
            position: "absolute",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)", // Flips the back face
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <figure>
            <img src={photo} />
          </figure>
          <h2 className="absolute bottom-0 text-primary text-xl glass w-full text-center">
            {type}
          </h2>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FlippingCard;
