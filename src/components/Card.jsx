import React, { useEffect, useState } from "react";
import { useSpring, a } from "@react-spring/web";
import CardBack from "../assets/photos/card-back.jpg";
import Copper from "../assets/photos/copper.jpg";
import Gold from "../assets/photos/gold.jpg";
import Jewel from "../assets/photos/jewel.jpg";
import Platinum from "../assets/photos/platinum.jpg";
import Silver from "../assets/photos/silver.jpg";
import Guard from "../assets/photos/guard.jpg";
import Keyholder from "../assets/photos/keyholder.jpg";
import GoodWizard from "../assets/photos/wizard-good.jpg";
import EvilWizard from "../assets/photos/wizard-evil.jpg";

import styles from "./styles.module.css";

export default function App({ type = "gold" }) {
  const [photo, setPhoto] = useState(Gold);
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
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
      case "wizard-bad":
        photoType = EvilWizard;
        break;
      case "keyholder":
        photoType = Keyholder;
        break;
      case "guard":
        photoType = Guard;
        break;
      default:
        photoType = Gold;
    }
    setPhoto(photoType);
  }, [type]);
  return (
    <div
      className={styles.container}
      onClick={() => set((state) => !state)}
    >
      <a.div
        className={`${styles.c} ${styles.back} w-40`}
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      >
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <img src={CardBack} alt="Back" />
          </figure>
        </div>
      </a.div>
      <a.div
        className={`${styles.c} ${styles.front} w-40`}
        style={{
          opacity,
          transform,
          rotateY: "180deg",
        }}
      >
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <img src={photo} alt={type} />
          </figure>
        </div>
      </a.div>
    </div>
  );
}
