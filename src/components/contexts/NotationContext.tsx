import { createContext, useReducer, useState } from "react";
import { techniques } from "../toolbar";

interface NotationContext {
  notation: string;
  technique: string;
  addNotation: (noteInfo: { string: number; fret: number }) => void;
  setTechnique: React.Dispatch<React.SetStateAction<string>>;
}

export const NotationContext = createContext({} as NotationContext);

function reducer(state: string, action: { string: number; fret: number; technique: string }) {
  const { string, fret, technique } = action;
  const mode = technique ? techniques[technique].mode : null;
  const lastAction = state.split(",").at(-1)!;
  const lastString = parseInt(lastAction.charAt(0));
  // const lastFret = parseInt(lastAction.split(/[A-Za-z]/).at(-1)!);

  switch (mode) {
    case "stack":
      if (lastString == string + 1) {
        return `${state}${technique}${fret}`;
      }
      return `${state},${string + 1}:${technique}${fret}`;
    // case "slide":
    //   if (lastString == string + 1) {
    //     const direction = fret > lastFret ? "/" : "\\";
    //     console.log(lastFret);
    //     return `${state}${direction}${fret}`;
    //   }
    //   return state;
    case "higher":

    case "chord":
      console.log("NOT IMPLEMENTED");
      return state;
    case "external":
      console.log("NOT IMPLEMENTED");
      return state;
    case "unrestrict":
    default:
      return `${state},${string + 1}:${fret}${technique}`;
  }
}

export function NotationProvider({ children }: { children: React.ReactNode }) {
  const [notation, dispatch] = useReducer(reducer, "");
  const [technique, setTechnique] = useState("");

  const addNotation = (noteInfo: { string: number; fret: number }) => {
    dispatch({ ...noteInfo, technique });
    setTechnique("");
    // setNotation(
    //   (currentNotation) =>
    //     `${currentNotation}${noteInfo.string + 1}:${technique}${noteInfo.fret},`
    // );
    // setTechnique("");
  };

  return (
    <NotationContext.Provider value={{ notation, addNotation, technique, setTechnique }}>
      {children}
    </NotationContext.Provider>
  );
}
