import { Dispatch, ReactNode, SetStateAction, createContext, useReducer, useState } from "react";
import { techniques } from "../components/toolbar";

interface NotationContext {
  notation: string;
  addNotation: (noteInfo: { string: number; fret: number }) => void;
  technique: string;
  setTechnique: Dispatch<SetStateAction<string>>;
  active: number;
  changeActive: (pos: number, type: "click" | "scroll") => void;
}

export const NotationContext = createContext({} as NotationContext);

function modSplit(str: string | undefined, separator: string): string[] {
  if (!str) return [];
  return str.split(separator);
}

function reducer(state: string, action: { string: number; fret: number; attribute: [string, number] }) {
  const { string, fret, attribute } = action;
  const [technique, active] = attribute;
  const mode = technique ? techniques[technique].mode : "unrestrict";
  const notation = modSplit(state, ",");
  let past = notation;
  let next: string[] = [];
  let curr: string[] = [];

  if (active !== -1) {
    past = notation.slice(0, active);
    next = notation.slice(active + 1);
    curr = modSplit(notation.at(active), "-");
  }

  switch (mode) {
    case "non-open":
      if (fret === 0) {
        break;
      }
    case "stack":
      let match = null;
      for (let i = 0; i < curr.length; i++) {
        const currString = modSplit(curr[i], ":")[0];
        if (currString === string.toString()) {
          match = i;
          break;
        }
      }

      if (match != null) {
        curr[match] += `${technique}${fret}`;
      } else {
        curr.push(`${string}:${technique}${fret}`);
      }
      break;
    case "unrestrict":
      curr = curr.filter((n) => n.split(":")[0] !== string.toString());
      curr.push(`${string}:${fret}${technique}`);
  }

  const joinedCurr = curr.join("-");
  const combined = [];
  combined.push(...past);
  if (joinedCurr) combined.push(joinedCurr);
  combined.push(...next);
  return combined.join(",");
}

export function NotationProvider({ children }: { children: ReactNode }) {
  const [notation, dispatch] = useReducer(reducer, "");
  const [technique, setTechnique] = useState("");
  const [lock, setLock] = useState(false);
  const [active, setActive] = useState(0);

  const addNotation = (noteInfo: { string: number; fret: number }) => {
    dispatch({ ...noteInfo, attribute: [technique, active] });
    setTechnique("");
  };

  const changeActive = (pos: number, type: "scroll" | "click") => {
    if (type === "click") {
      setLock(true);
      if (active === pos) {
        setLock(false);
      }
    }

    if (lock && type === "scroll") {
      setActive((curr) => (curr === -1 && pos === -1 ? notation.split(",").length - 1 : curr));
    } else {
      setActive((curr) => (curr === pos ? -1 : pos));
    }
  };

  return (
    <NotationContext.Provider value={{ notation, addNotation, technique, setTechnique, active, changeActive }}>
      {children}
    </NotationContext.Provider>
  );
}
