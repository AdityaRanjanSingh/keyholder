import { AnimatePresence, motion } from "framer-motion";
import { isHost, setState } from "playroomkit";
import { useCallback, useState } from "react";
const container = {
  hidden: {
    translateY: 50,
    opacity: 0,
  },
  show: {
    translateY: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemA = {
  hidden: { translateY: 25, opacity: 0 },
  show: { translateY: 0, opacity: 1 },
};

const itemB = {
  hidden: { translateY: 25, opacity: 0 },
  show: { translateY: 0, opacity: 1 },
};

const itemC = {
  hidden: { translateY: 25, opacity: 0 },
  show: { translateY: 0, opacity: 1 },
};
const FabButton = () => {
  const [isFabEnabled, setIsFabEnabled] = useState(false);

  const toggleFAB = useCallback(() => {
    setIsFabEnabled((prevState) => !prevState);
  }, []);

  return (
    <div className="bg-primary h-16 w-16 rounded-full fixed bottom-5 right-5 flex items-center justify-center cursor-pointer active:scale-95 transition-all ease-in">
      <div
        onClick={toggleFAB}
        className={`select-none secondaryBorderThick rounded-full w-full h-full flex items-center justify-center transition-transform ease-in ${
          isFabEnabled ? "rotate-[315deg]" : ""
        }`}
      >
        <i className="fa-solid fa-plus scale-150 text-primary-content"></i>
      </div>

      <AnimatePresence>
        {isFabEnabled && (
          <motion.ul
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="absolute bottom-20 flex justify-between flex-col items-center gap-2"
          >
            {/* <motion.li
              variants={itemA}
              className="h-14 w-14 flex items-center justify-center rounded-full bg-cyan-500"
            ></motion.li> */}

            {isHost() && (
              <motion.li
                variants={itemB}
                className="h-14 w-14 flex items-center justify-center rounded-full bg-[#F4458D]"
                onClick={() => {
                  setState("phase", "lobby");
                }}
              >
                <i className="fa-solid  scale-150 fa-rotate-right text-primary-content"></i>
              </motion.li>
            )}

            <motion.li
              variants={itemC}
              className="h-14 w-14 flex items-center justify-center rounded-full bg-[#0094E8]"
            >
              <i className="fa-brands fa-leanpub scale-150 text-primary-content"></i>
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FabButton;
