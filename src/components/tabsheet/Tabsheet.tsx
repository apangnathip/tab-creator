import { useContext, useEffect, useState } from "react";
import { Board, BoardContext } from "../contexts/BoardContext";
import { NotationContext } from "../contexts/NotationContext";
import styles from "./Tabsheet.module.css";

function readNotation(board: Board, notation: string) {
  let rest = "-".repeat(1);
  let lines = Array(board.stringCount).fill("|");
  let notes = notation.split(",");

  for (let i = 0; i < notes.length - 1; i++) {
    console.log(notation);
    let [string, fret] = notes[i].split(":");

    for (let j = 0; j < board.stringCount; j++) {
      lines[j] += rest;
      lines[j] += j == parseInt(string) - 1 ? fret : "-".repeat(fret.length);
    }
  }

  return lines;
}

export function Tabsheet() {
  const { board } = useContext(BoardContext);
  const { notation } = useContext(NotationContext);
  const [asciiTab, setAsciiTab] = useState([] as string[]);

  useEffect(() => {
    setAsciiTab(readNotation(board, notation));
  }, [notation]);

  return (
    <>
      {asciiTab.map((line, i) => (
        <div className={styles.root} key={i}>
          {line}
        </div>
      ))}
      {notation}
    </>
  );
}
