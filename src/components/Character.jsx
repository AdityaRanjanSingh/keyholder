import Birb from "./Birb";
import Cat from "./Cat";
import Chicken from "./Chicken";
import Dog from "./Dog";
import Fish from "./Fish";
import GreenBlob from "./GreenBlob";
import Mushnub from "./Mushnub";
import Ninja from "./Ninja";
import Orc from "./Orc";
import Yeti from "./Yeti";

export const Character = ({ character = 0, animation = "Idle", ...props }) => {
  switch (character) {
    case 0:
      return <Birb {...props} />;
    case 1:
      return <Cat {...props} />;
    case 2:
      return <Chicken {...props} />;
    case 3:
      return <Dog {...props} />;
    case 4:
      return <Fish {...props} />;
    case 5:
      return <GreenBlob />;
    case 6:
      return <Mushnub {...props} />;
    case 7:
      return <Ninja {...props} />;
    case 8:
      return <Orc {...props} />;
    case 9:
      return <Yeti {...props} />;
    default:
      return <GreenBlob {...props} />;
  }
};
