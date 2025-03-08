import { useMemo } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import Timer from "./Timer";

export default () => {
  return (
    <div className="flex items-center h-full justify-center">
      <Timer />
    </div>
  );
};
