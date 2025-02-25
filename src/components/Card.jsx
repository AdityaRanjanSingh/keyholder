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

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FlippingCard = ({ type = "gold" }) => {
  const [photo, setPhoto] = useState(Gold);
  const [isFlipped, setIsFlipped] = useState(false);
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
  return (
    <motion.div
      className="w-[100px] h-[150px] overflow-hidden"
      style={{
        perspective: "600px", // Adds depth for 3D animation
      }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }} // Animates the flip
        transition={{ duration: 1 }} // Controls the flip speed
        className="w-full h-full relative"
        style={{
          transformStyle: "preserve-3d", // Enables 3D effect
        }}
      >
        {/* Front Side */}
        <motion.div
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            position: "absolute",
            backfaceVisibility: "hidden", // Ensures only one side is visible
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <figure>
            <img src={CardBack} alt="Shoes" className="rounded-sm" />
          </figure>
        </motion.div>
        <motion.div
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            position: "absolute",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)", // Flips the back face
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <figure>
            <img src={photo} alt="Shoes" />
          </figure>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FlippingCard;
