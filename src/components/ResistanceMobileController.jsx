import { isHost, isStreamScreen, myPlayer } from "playroomkit";
import { useEffect, useState } from "react";
import { NB_MISSIONS, useGameEngine } from "../hooks/useGameEngine";
import ResistanceCharacter from "./ResistanceCharacter";

const audios = {
  background: new Audio("/audios/Drunken Sailor - Cooper Cannell.mp3"),
  introductions: new Audio("/audios/introduction.mp3"),
  punch: new Audio("/audios/punch.mp3"),
  shield: new Audio("/audios/shield.mp3"),
  grab: new Audio("/audios/grab.mp3"),
  fail: new Audio("/audios/fail.mp3"),
  cards: new Audio("/audios/cards.mp3"),
};

const introductions = {
  goodWizard:
    "You are the Good Wizard! Your goal is to help the group complete their mission and identify the Traitor.",
  evilWizard:
    "You are the Evil Wizard! You secretly work against the group, but they don’t know it. Your goal is to find out which player is the Key Holder and stop them from succeeding.",
  keyHolder:
    "You are the Key Holder! Your goal is to find the Good Wizard and secretly pass them the key. Be careful—if you give it to the wrong person, disaster may follow! Watch the players, look for signs of trust, and make your choice wisely.",
  guard:
    "You are a Guard! Your goal is to protect the group by identifying the Bad Wizard. Pay close attention to everyone’s actions and words—someone is working against you. Work with the team, trust wisely, and uncover the traitor before it's too late!",
  wizard:
    "You are a Guard! Your goal is to protect the group by identifying the Bad Wizard. Pay close attention to everyone’s actions and words—someone is working against you. Work with the team, trust wisely, and uncover the traitor before it's too late!",
  traitor:
    "You are the Traitor! You secretly work with the Bad Wizard to find the Key Holder, but the group thinks you're on their side. Earn their trust, gather information, and subtly guide the Bad Wizard to their target. Be careful—if they suspect you, your plan could fall apart!",
};

export default () => {
  const { phase, players, wizards } = useGameEngine();

  const [chats, setChats] = useState([]);

  const me = myPlayer();

  useEffect(() => {
    const role = me.getState("role");
    setChats((existing) => [...existing, introductions[role]]);
  }, [wizards.length]);
  // AUDIO MANAGER
  const [audioEnabled, setAudioEnabled] = useState(false);
  const toggleAudio = () => {
    setAudioEnabled((prev) => !prev);
  };

  useEffect(() => {
    if (!audioEnabled) {
      return;
    }
    let audioToPlay;
    if (phase === "introductions") {
      audioToPlay = audios.introductions;
    }

    if (phase === "voting") {
      audioToPlay = audios.cards;
    }
    if (audioToPlay) {
      audioToPlay.currentTime = 0;
      audioToPlay.play();
    }
  }, [phase, audioEnabled]);
  return (
    <div className="flex justify-center py-5">
      <div className="artboard phone-1">
        <div className="my-10 justify-center">
          <h2 className="text-2xl">Wizards</h2>
          <div className="grid grid-cols-3 gap-2 my-5">
            {wizards.map((index) => (
              <ResistanceCharacter
                key={index}
                index={index}
              ></ResistanceCharacter>
            ))}
          </div>
        </div>
        <div className="my-10 justify-center">
          <h2 className="text-2xl">Adventurers</h2>
          <div className="grid grid-cols-3 gap-2 my-5">
            {players.map((player, index) => (
              <ResistanceCharacter
                key={index}
                index={index}
              ></ResistanceCharacter>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 mx-5">
        {chats.map((chat) => (
          <div className="chat chat-start">
            <div className="chat-bubble">{chat}</div>
          </div>
        ))}
        <ResistanceCharacter key={0} index={0}></ResistanceCharacter>
        <button className="btn btn-primary w-full">Stop</button>
      </div>
    </div>
  );
};
