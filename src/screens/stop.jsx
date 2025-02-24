import { myPlayer } from "playroomkit";
import { useNavigate } from "react-router";

export default () => {
  const navigate = useNavigate();
  const me = myPlayer();
  return (
    <div
      className="artboard  w-full h-full"
      style={{ backgroundColor: "#B22222" }}
    >
      <div className="flex flex-col items-center ">
        <div className="avatar my-10">
          <div className="w-20 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={me.getProfile().photo}
            />
          </div>
        </div>
        <h4 className="text-2xl mt-4">You are the Traitor!</h4>
        <h4 className="text-2xl mt-4 text-center">
          Your goal is to identify the evil wizard!
        </h4>
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
