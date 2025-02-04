import { useState } from "react";

const audios = {
  background: new Audio("/audios/Drunken Sailor - Cooper Cannell.mp3"),
  introductions: new Audio("/audios/introduction.mp3"),
  punch: new Audio("/audios/punch.mp3"),
  shield: new Audio("/audios/shield.mp3"),
  grab: new Audio("/audios/grab.mp3"),
  fail: new Audio("/audios/fail.mp3"),
  cards: new Audio("/audios/cards.mp3"),
};
export const Audio = (phase) => {
  // AUDIO MANAGER
  const [audioEnabled, setAudioEnabled] = useState(false);
  const toggleAudio = () => {
    setAudioEnabled((prev) => !prev);
  };

  useEffect(() => {

    if (audioEnabled) {
      audios[phase].play();
      audios[phase].loop = true;
    } else {
      audios[phase].pause();
    }
    return () => {
      audios[phase].pause();
    };
  }, [audioEnabled, phase]);
};
