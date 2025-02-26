import { myPlayer } from "playroomkit";
import { useGameEngine } from "../hooks/useGameEngine";

export default () => {
  const me = myPlayer();
  const { phase, timer } = useGameEngine();
  return (
    <div className="navbar bg-base-300 gap-2 align-middle h-1/10">
      {/* <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div className="btn-circle avatar">
            <div className="w-15 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={me.getProfile().photo}
              />
            </div>
          </div>
        </div>
      </div> */}
      <div className="flex-1 flex-col items-start">
        <h2 className="text-lg text-primary text-start uppercase">
          {me.getProfile().name}
        </h2>
        <h2 className="text-sm text-start text-secondary  uppercase">
          {me.getState("role")}
        </h2>
      </div>
      <div className="flex flex-col">
        <h3 className="text-md capitalize">{phase}</h3>
        <h3>{timer}</h3>
      </div>
    </div>
  );
};
