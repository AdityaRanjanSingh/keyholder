import { useEffect, useState } from "react";

import { myPlayer } from "playroomkit";
import Treasure from "./Treasure";

export default () => {
  const me = myPlayer();
  const treasureCards = me.getState("treasureCards") || [];
  const treasureCount = me.getState("treasureCount") || 0;

  const [treasure, setTreasure] = useState([]);

  useEffect(() => {
    const jewels = treasureCards.filter(({ type }) => type === "jewels").length;
    const platinum = treasureCards.filter(
      ({ type }) => type === "platinum"
    ).length;
    const gold = treasureCards.filter(({ type }) => type === "gold").length;
    const silver = treasureCards.filter(({ type }) => type === "silver").length;
    const copper = treasureCards.filter(({ type }) => type === "copper").length;
    const magicRing = treasureCards.filter(
      ({ type }) => type === "magicRing"
    ).length;
    const gildedStatue = treasureCards.filter(
      ({ type }) => type === "gildedStatue"
    ).length;

    const treasures = [];
    if (jewels) treasures.push({ type: "jewels", count: jewels });
    if (platinum) treasures.push({ type: "platinum", count: platinum });
    if (gold) treasures.push({ type: "gold", count: gold });
    if (silver) treasures.push({ type: "silver", count: silver });
    if (copper) treasures.push({ type: "copper", count: copper });
    if (magicRing) treasures.push({ type: "magicRing", count: magicRing });
    if (gildedStatue)
      treasures.push({ type: "gildedStatue", count: gildedStatue });
    setTreasure(treasures);
  }, [treasureCards.length]);

  return (
    <div className="absolute gap-2 bottom-5 left-5">
      <div className="flex flex-row items-center gap-2">
        <h2 className="text-xl font-semibold">Treasure</h2>
        <div className="badge badge-accent">{treasureCount}</div>
      </div>
      {treasure.map(({ type, count }) => (
        <div className="flex flex-row items-center gap-2" key={type}>
          <Treasure type={type}></Treasure>
          <h4>x {count}</h4>
        </div>
      ))}
    </div>
  );
};
