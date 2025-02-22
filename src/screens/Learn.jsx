import { useNavigate } from "react-router";

export default () => {
  const navigate = useNavigate();
  return (
    <div className="artboard  w-full">
      <div className="carousel rounded-box w-full h-full">
        <div className="carousel-item w-full">
          <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">
                  Welcome to Are You the Traitor?
                </h1>
                <p className="py-6">
                  In this game of deception and deduction, trust is everything.
                  Each player has a secret role, but one among you is the
                  Traitor, working to mislead the group. At the center of the
                  game is the Key of Power—will it fall into the right hands or
                  be stolen?
                </p>
                <button
                  className="btn btn-outline"
                  onClick={() => navigate("/")}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item w-full">
          <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">Roles & Team Setup</h1>
                <p className="py-6">
                  Each player belongs to either the Good Team or the Evil Team.
                  Good wizard, guards, keyholder belong to the good team. Evil
                  wizard and traitor belong to the evil team. The Wizards must
                  receive the Key of Power to win, while the Guards try to
                  protect them.
                </p>
                <button
                  className="btn btn-outline"
                  onClick={() => navigate("/")}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item w-full">
          <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">Gameplay Overview</h1>
                <p className="py-6">
                  Players discuss who holds the Key of Power (keyholder) and who
                  should receive it. The Traitor tries to help the evil wizard
                  to identify the keyholder. At any moment, any player can end
                  the round.
                </p>
                <button
                  className="btn btn-outline"
                  onClick={() => navigate("/")}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item w-full">
          <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">
                  How to Win & Strategy Tips
                </h1>
                <p className="text-2xl font-bold py-6">Good team wins</p>
                <p>Guard identifies the traitor</p>
                <p>Keyholder identifies the good wizard</p>
                <p>Good wizard identifies the traitor</p>
                <p className="text-2xl font-bold py-6">Evil team wins</p>
                <p>Evil wizard identifies the keyholder</p>
                <p>Keyholder gives the key to evil wizard</p>
                <p className="py-6">Traitors cannot stop the game</p>
                <p className="py-6">
                  Watch for hesitation, misdirection, and overconfidence—anyone
                  could be the Traitor. In a game of lies and strategy, will you
                  see through the deception?
                </p>
                <button
                  className="btn btn-outline"
                  onClick={() => navigate("/")}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
