import { myPlayer, setState } from "playroomkit";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { Phases, Time, useGameEngine } from "../hooks/useGameEngine";
import { toast } from "react-toastify";

const getRoleTitle = (role) => {
  let roleTitle = "";
  switch (role) {
    case "goodWizard":
      roleTitle = "You are the Good Wizard";
      break;
    case "evilWizard":
      roleTitle = "You are the Evil Wizard";
      break;
    case "keyholder":
      roleTitle = "You are the Key Holder";
      break;
    case "guard":
      roleTitle = "You are a Guard";
      break;
    case "traitor":
      roleTitle = "You are the Traitor";
      break;
    default:
      break;
  }
  return roleTitle;
};
const getRoleDesc = (role) => {
  let roleDesc = "";
  switch (role) {
    case "goodWizard":
      roleDesc =
        "Your goal is to help the group complete their mission by identifying the Traitor.";
      break;
    case "evilWizard":
      roleDesc =
        "Your goal is to find out which player is the Key Holder and stop them from succeeding.";
      break;
    case "keyholder":
      roleDesc =
        "Your goal is to find the Good Wizard and secretly pass them the key.";
      break;
    case "guard":
      roleDesc = "Your goal is to protect the group by identifying the Traitor";
      break;
    case "traitor":
      roleDesc =
        "Your goal is to find out which player is evil wizard to reveal the identity keyholder";
      break;
    default:
      break;
  }
  return roleDesc;
};
export default () => {
  const navigate = useNavigate();
  const me = myPlayer();
  const role = me.getState("role");
  const roleTitle = useMemo(() => getRoleTitle(role), [role]);
  const roleDesc = useMemo(() => getRoleDesc(role), [role]);

  const { timer, phaseNo, phase } = useGameEngine();
  useEffect(() => {
    if (phase !== "lobby") navigate(phase);
  }, [phaseNo]);
  return (
    <div className="card bg-base-100 image-full w-96 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
  return (
    <div
      className="artboard  w-full h-full"
      style={{ backgroundColor: "#1B1F3B" }}
    >
      <div className="fixed top-5 right-5">
        <div className="stat-value">{timer}</div>
      </div>
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
        <h4 className="text-3xl mt-4">{roleTitle}</h4>
        <h4 className="text-3xl mt-4 text-center">{roleDesc}</h4>
        <button
          className="btn btn-wide btn-primary my-5 fixed bottom-0"
          onClick={() => navigate("/stop")}
        >
          Next phase
        </button>
      </div>
    </div>
  );
};
