import { useContext, useEffect, useRef, useState } from "react";
import { useResize } from "../../hooks/useResize";
import { Board, BoardContext } from "../contexts/BoardContext";
import { NotationContext } from "../contexts/NotationContext";
import { Scroller } from "./Scroller";
import styles from "./Tabsheet.module.css";

function translateNotation(maxChar: number, board: Board, notation: string): any[] {
  const rest = "-";
  const notes = notation ? notation.split(",") : [];
  const staffs = [];
  const border = Array(board.stringCount).fill("|");
  let lines = border.slice();

  for (let i = 1; i < notes.length; i++) {
    if (lines[0].length + 4 >= maxChar) {
      console.log(lines[0].length, maxChar);
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

  const currNotePos = lines[0].length;
  lines = lines.map((line) => line + "-".repeat(Math.abs(maxChar - line.length - 1)) + "|");
  staffs.push(lines);
  return [staffs, currNotePos];
}

export function Tabsheet() {
  const { board } = useContext(BoardContext);
  const { notation } = useContext(NotationContext);
  const [asciiTab, setAsciiTab] = useState([[]] as string[][]);
  const [scrollPos, setScrollPos] = useState(0);
  const divRef = useRef<HTMLDivElement | null>(null);
  const containerWidth = useResize(divRef).width;
  const fontRef = useRef<HTMLSpanElement | null>(null);
  const { width, height } = fontRef.current ? fontRef.current.getBoundingClientRect() : { width: 1, height: 1 };

  useEffect(() => {
    const maxChar = Math.floor((containerWidth - 16 * 2) / width);
    const [staffs, currNotePos] = translateNotation(maxChar, board, notation);
    setAsciiTab(staffs);
    setScrollPos(currNotePos);
  }, [notation, containerWidth]);

  return (
    <>
      <div className={styles.root} ref={divRef}>
        {asciiTab.map((staff, i) => {
          return (
            <div className={styles.staff} key={i}>
              {i == asciiTab.length - 1 && <Scroller fontSize={{ width, height }} scrollPos={scrollPos} />}
              {staff.map((line, j) => (
                <p className={styles.tabLine} key={j}>
                  {line}
                </p>
              ))}
            </div>
          );
        })}
        <span ref={fontRef} className={styles.fontCalibrator}>
          0
        </span>
      </div>
    </>
  );
}
