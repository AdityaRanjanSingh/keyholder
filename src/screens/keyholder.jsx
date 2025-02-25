import { myPlayer } from "playroomkit";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useGameEngine } from "../hooks/useGameEngine";

export default () => {
  const navigate = useNavigate();
  const me = myPlayer();

  const [flipped, set] = useState(false);
  const { phase, phaseNo } = useGameEngine();

  return (
    <div
      className="artboard  w-full h-full"
      style={{ backgroundColor: "#0D1B2A" }}
    >
      <div className="flex flex-col items-center ">
        <div className="avatar mt-10">
          <div className="w-28 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={me.getProfile().photo}
            />
          </div>
        </div>
        <h4 className="text-3xl text-center font-bold my-5 text-secondary">
          {me.getProfile().name}
        </h4>
        <h4 className="text-3xl mt-4 text-center">Assigning player roles</h4>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    </div>
  );
};
