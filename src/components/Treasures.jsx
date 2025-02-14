import { useEffect, useState } from "react";

import { myPlayer } from "playroomkit";
import Treasure from "./Treasure";

export default () => {
  const me = myPlayer();
  const treasureCards = me.getState("treasureCards") || [];
  const treasureCount = me.getState("treasureCount") || 0;

  useEffect(() => {
    const jewels = treasureCards.filter(
      (treasure) => treasure === "jewels"
    ).length;
    const platinum = treasureCards.filter(
      (treasure) => treasure === "platinum"
    ).length;
    const gold = treasureCards.filter((treasure) => treasure === "gold").length;
    const silver = treasureCards.filter(
      (treasure) => treasure === "silver"
    ).length;
    const copper = treasureCards.filter(
      (treasure) => treasure === "copper"
    ).length;
    const magicRing = treasureCards.filter(
      (treasure) => treasure === "magicRing"
    ).length;
    const gildedStatue = treasureCards.filter(
      (treasure) => treasure === "gildedStatue"
    ).length;

    const count =
      5 * jewels +
      4 * platinum +
      3 * gold +
      2 * silver +
      1 * copper +
      magicRing * 1 +
      gildedStatue * 0;
    me.setState("treasureCount", count);
  }, [treasureCards]);

  return (
    <div className="absolute gap-2 bottom-5 left-5">
      <div className="flex flex-row items-center gap-2">
        <h2 className="text-xl font-semibold">Treasures</h2>
        <div className="badge badge-accent">{treasureCount}</div>
      </div>
      {treasureCards.map((type) => (
        <Treasure key={type} type={type}></Treasure>
      ))}
    </div>
  );
};
