import { createContext, useState } from "react";
import { Player } from "../Models/Player";

export const Context = createContext<{
  player: Player;
  bot: Player;
  setPlayer: (player: Player) => void;
  setBot: (bot: Player) => void;
} | null>(null); // Assure-toi que TypeScript comprend bien le contexte

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [player, setPlayer] = useState<Player>({ isComputer: false, score: 0, choice: undefined });
  const [bot, setBot] = useState<Player>({ isComputer: true, score: 0, choice: undefined });

  return (
    <Context.Provider value={{ player, bot, setPlayer, setBot }}>
      {children}
    </Context.Provider>
  );
};
