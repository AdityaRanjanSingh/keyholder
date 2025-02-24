import { myPlayer } from "playroomkit";
import { useNavigate } from "react-router";

export default () => {
  const navigate = useNavigate();
  const me = myPlayer();
  return (
    <div
      className="artboard  w-full h-full"
      style={{ backgroundColor: "#D87D4A" }}
    >
      <div className="w-full h-full">
        <div className="btn-circle avatar">
          <div className="w-15 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={me.getProfile().photo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
