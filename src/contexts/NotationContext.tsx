import { Dispatch, ReactNode, SetStateAction, createContext, useReducer, useState } from "react";
import { techniques } from "../components/toolbar";

interface NotationContext {
  notation: string;
  technique: string;
  lock: boolean;
  setTechnique: Dispatch<SetStateAction<string>>;
  setLock: Dispatch<SetStateAction<boolean>>;
  addNotation: (noteInfo: { string: number; fret: number }) => void;
}

export const NotationContext = createContext({} as NotationContext);

function reducer(state: string, action: { string: number; fret: number; attribute: [string, boolean] }) {
  const { string, fret, attribute } = action;
  const [technique, lock] = attribute;
  const mode = technique ? techniques[technique].mode : null;
  const lastAction = state.split(",").at(-2)!;
  const lastString = lastAction ? parseInt(lastAction.charAt(0)) : "";
  const connector = lock ? "-" : ",";
  let currState = state;
  let newState = "";

  if (!lock && state.slice(-1) == "-") {
    currState = state.slice(0, -1) + ",";
  }

  switch (mode) {
    case "stack":
      if (lastString == string + 1) {
        currState = currState.at(-1) === "," ? currState.slice(0, -1) : currState;
        newState = `${technique}${fret}${connector}`;
        break;
      }
      newState = `${string + 1}:${technique}${fret}${connector}`;
      break;
    case "unrestrict":
      newState = `${string + 1}:${fret}${technique}${connector}`;
  }

  if (lock) {
    const states = currState.split(",");
    const lastState = states[states.length - 1].split("-");
    const duplicatesRemoved = lastState.filter((note) => note.charAt(0) !== (string + 1).toString());
    states.pop();
    currState = states.join(",") + "," + duplicatesRemoved.join("-");
  }
  return currState + newState;
}

export function NotationProvider({ children }: { children: ReactNode }) {
  const [notation, dispatch] = useReducer(reducer, "");
  const [technique, setTechnique] = useState("");
  const [lock, setLock] = useState(false);

  const addNotation = (noteInfo: { string: number; fret: number }) => {
    dispatch({ ...noteInfo, attribute: [technique, lock] });
    setTechnique("");
  };

  return (
    <NotationContext.Provider value={{ notation, addNotation, technique, setTechnique, lock, setLock }}>
      {children}
    </NotationContext.Provider>
  );
}
