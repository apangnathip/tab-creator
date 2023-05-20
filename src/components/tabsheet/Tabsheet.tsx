import { useContext, useEffect, useRef, useState } from "react";
import { useResize } from "../../hooks/useResize";
import { Board, BoardContext } from "../contexts/BoardContext";
import { NotationContext } from "../contexts/NotationContext";
import styles from "./Tabsheet.module.css";

function readNotation(maxChar: number, board: Board, notation: string) {
  const rest = "-".repeat(1);
  const notes = notation.split(",");
  const staffs = [];
  const border = Array(board.stringCount).fill("|");
  let lines = border.slice();

  for (let i = 1; i < notes.length; i++) {
    if (lines[0].length >= maxChar - 3) {
      lines = lines.map((line) => line + "-".repeat(Math.abs(maxChar - line.length - 1)) + "|");
      staffs.push(lines);
      lines = border.slice();
    }

    const [string, fret] = notes[i].split(":");
    for (let j = 0; j < board.stringCount; j++) {
      lines[j] += rest;
      lines[j] += j == parseInt(string) - 1 ? fret : "-".repeat(fret.length);
    }
  }

  lines = lines.map((line) => line + "-".repeat(Math.abs(maxChar - line.length - 1)) + "|");
  staffs.push(lines);
  return staffs;
}

export function Tabsheet() {
  const { board } = useContext(BoardContext);
  const { notation } = useContext(NotationContext);
  const [asciiTab, setAsciiTab] = useState([[]] as string[][]);
  const divRef = useRef<HTMLDivElement | null>(null);
  const { width } = useResize(divRef);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (spanRef.current) {
      const maxChar = Math.floor(width / spanRef.current.offsetWidth);
      setAsciiTab(readNotation(maxChar, board, notation));
    }
  }, [notation, width]);

  return (
    <div className={styles.root} ref={divRef}>
      {asciiTab.map((staff, i) => {
        return (
          <div className={styles.staff} key={i}>
            {staff.map((line, j) => (
              <p className={styles.tabLine} key={j}>
                {line}
              </p>
            ))}
          </div>
        );
      })}
      <span ref={spanRef} className={styles.fontCalibrator}>
        0
      </span>
    </div>
  );
}
