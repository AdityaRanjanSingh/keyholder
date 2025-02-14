import { useEffect, useMemo, useState } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import bagsOfGold from "../assets/photos/bagsOfGold.jpg";
import chestOfCopper from "../assets/photos/chestOfCopper.jpg";
import gildedStatue from "../assets/photos/gildedStatue.jpg";
import magicRing from "../assets/photos/magicRing.jpg";
import platinumPyramids from "../assets/photos/platinumPyramids.jpg";
import silverGoblets from "../assets/photos/silverGoblets.jpg";

export default ({ type = "bagsOfGold" }) => {
  const [photo, setPhoto] = useState(bagsOfGold);
  const [title, setTitle] = useState("Bag of gold");

  useEffect(() => {
    let newPhoto = bagsOfGold;
    let newTitle = "Bag of gold";
    switch (type) {
      case "bagsOfGold":
        newPhoto = bagsOfGold;
        newTitle = "Bag of gold";
        break;
      case "chestOfCopper":
        newPhoto = chestOfCopper;
        newTitle = "Chest of copper";

        break;
      case "crownJewels":
        newPhoto = crownJewels;
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
      case "platinumPyramids":
        newPhoto = platinumPyramids;
        newTitle = "Platinum pyramids";

        break;
      case "silverGoblets":
        newPhoto = silverGoblets;
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
