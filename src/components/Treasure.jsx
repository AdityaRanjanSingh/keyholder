import { useEffect, useMemo, useState } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import gold from "../assets/photos/bagsOfGold.jpg";
import jewels from "../assets/photos/crownJewels.jpg";
import copper from "../assets/photos/chestOfCopper.jpg";
import gildedStatue from "../assets/photos/gildedStatue.jpg";
import magicRing from "../assets/photos/magicRing.jpg";
import platinum from "../assets/photos/platinumPyramids.jpg";
import silver from "../assets/photos/silverGoblets.jpg";

export default ({ type = "gold" }) => {
  const [photo, setPhoto] = useState(gold);
  const [title, setTitle] = useState("Bag of gold");
  useEffect(() => {
    let newPhoto = gold;
    let newTitle = "Bag of gold";
    switch (type) {
      case "gold":
        newPhoto = gold;
        newTitle = "Bag of gold";
        break;
      case "copper":
        newPhoto = copper;
        newTitle = "Chest of copper";

        break;
      case "jewels":
        newPhoto = jewels;
        newTitle = "Crown jewels";

        break;
      case "gildedStatue":
        newPhoto = gildedStatue;
        newTitle = "Gilded statue";

        break;
      case "magicRing":
        newPhoto = magicRing;
        newTitle = "Magic ring";

        break;
      case "platinum":
        newPhoto = platinum;
        newTitle = "Platinum pyramids";

        break;
      case "silver":
        newPhoto = silver;
        newTitle = "Silver goblets";
        break;
    }
    setPhoto(newPhoto);
    setTitle(newTitle);
  }, [type]);
  return (
    <div className="flex flex-row items-center gap-2">
      <img className="rounded-full  w-10" src={photo} />
      <h4 className="text-base">{title}</h4>
    </div>
  );
};
