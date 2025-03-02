import { isHost, myPlayer, setState } from "playroomkit";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useGameEngine } from "../hooks/useGameEngine";
import FlippingCard from "../components/Card";
import Header from "../components/Header";
import FabButton from "../components/FabButton";
import { TextFade } from "../components/text-fade";
import Lobby from "../components/Lobby";
import { AnimatePresence, motion } from "framer-motion";

export default () => {
  const { timer } = useGameEngine();
  return (
    <>
      <TextFade
        direction="up"
        className="pt-0 pb-5 flex-col flex justify-center items-center space-y-0"
      >
        {timer}
      </TextFade>
      <FabButton></FabButton>
    </>
  );
};
