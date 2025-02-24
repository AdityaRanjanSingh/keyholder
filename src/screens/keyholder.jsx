import { useSpring, a } from "@react-spring/web";
import { myPlayer } from "playroomkit";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./styles.module.css";
import { useGameEngine } from "../hooks/useGameEngine";

export default () => {
  const navigate = useNavigate();
  const me = myPlayer();

  const [flipped, set] = useState(false);
  const { phase, phaseNo } = useGameEngine();
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  useEffect(() => {
    console.log({ phase, phaseNo });
  }, [phase]);
  return (
    <div className={styles.container} onClick={() => set((state) => !state)}>
      <a.div
        className={`${styles.c} ${styles.back}`}
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      />
      <a.div
        className={`${styles.c} ${styles.front}`}
        style={{
          opacity,
          transform,
          rotateX: "180deg",
        }}
      />
    </div>
  );
  // return

  // <div
  //   className="artboard  w-full h-full"
  //   style={{ backgroundColor: "#0D1B2A" }}
  // >
  //   <div className="flex flex-col items-center ">
  //     <div className="avatar mt-10">
  //       <div className="w-28 rounded-full">
  //         <img
  //           alt="Tailwind CSS Navbar component"
  //           src={me.getProfile().photo}
  //         />
  //       </div>
  //     </div>
  //     <h4 className="text-3xl text-center font-bold my-5 text-secondary">
  //       {me.getProfile().name}
  //     </h4>
  //     <h4 className="text-3xl mt-4 text-center">Assigning player roles</h4>
  //     <span className="loading loading-dots loading-lg"></span>
  //   </div>
  // </div>
  // );
};
