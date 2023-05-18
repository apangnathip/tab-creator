import { createContext, useState } from "react";

interface NotationContext {
  notation: string;
  addNotation: (noteInfo: { string: number; fret: number }) => void;
  technique: string;
  setTechnique: React.Dispatch<React.SetStateAction<string>>;
}

export const NotationContext = createContext({} as NotationContext);

export function NotationProvider({ children }: { children: React.ReactNode }) {
  const [notation, setNotation] = useState("");
  const [technique, setTechnique] = useState("");

  const addNotation = (noteInfo: { string: number; fret: number }) => {
    // if (!technique) {
    //   return;
    // }
    setNotation(
      (currentNotation) => `${currentNotation}${noteInfo.string + 1}:${noteInfo.fret},`
    );
  };

  return (
    <NotationContext.Provider value={{ notation, addNotation, technique, setTechnique }}>
      {children}
    </NotationContext.Provider>
  );
}
