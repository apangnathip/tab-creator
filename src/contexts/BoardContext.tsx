import { ReactNode, createContext, useState } from "react";

export type Board = {
  stringCount: number;
  fretCount: number;
  tuning: string;
};

type BoardContext = {
  board: Board;
  changeTuning: (newTuning: string) => void;
};

export const BoardContext = createContext({} as BoardContext);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [board, setBoard] = useState({
    stringCount: 6,
    fretCount: 24,
    tuning: "E",
  });

  const changeTuning = (newTuning: string) => {
    setBoard((currentBoard) => ({ ...currentBoard, tuning: newTuning }));
  };

  return <BoardContext.Provider value={{ board, changeTuning }}>{children}</BoardContext.Provider>;
}
