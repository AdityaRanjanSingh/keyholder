import { useEffect, useMemo, useState } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import gold from "../assets/photos/bagsOfGold.jpg";
import jewels from "../assets/photos/crownJewels.jpg";
import copper from "../assets/photos/chestOfCopper.jpg";
import gildedStatue from "../assets/photos/gildedStatue.jpg";
import magicRing from "../assets/photos/magicRing.jpg";
import platinum from "../assets/photos/platinumPyramids.jpg";
import silver from "../assets/photos/silverGoblets.jpg";
import { myPlayer } from "playroomkit";

export default ({ type = "gold" }) => {
  const [photo, setPhoto] = useState(gold);
  const [title, setTitle] = useState("Bag of gold");

  const me = myPlayer();
  useEffect(() => {
    let newPhoto = gold;
    let newTitle = "Gold";
    switch (type) {
      case "gold":
        newPhoto = gold;
        newTitle = "Gold";
        break;
      case "copper":
        newPhoto = copper;
        newTitle = "Copper";

        break;
      case "jewels":
        newPhoto = jewels;
        newTitle = "Jewels";

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
        newTitle = "Platinum";

        break;
      case "silver":
        newPhoto = silver;
        newTitle = "Silver";
        break;
    }
    setPhoto(newPhoto);
    setTitle(newTitle);
  }, [type]);

  const onTreasureClick = () => {
    if (type !== "magicRing") return;

    const treasureCards = me.getState("treasureCards") || [];
    const isUsed = treasureCards.some(
      (card) => card.type === "magicRing" && !card.used
    );
    if (isUsed) {
      me.setState("toastMessage", "Choose a player to use the magic ring");
    }
  };
  return (
    <button
      onClick={onTreasureClick}
      className="flex flex-row items-center gap-2"
    >
      <img className="rounded-full  w-10" src={photo} />
      <h4 className="text-base">{title}</h4>
    </button>
  );
};
