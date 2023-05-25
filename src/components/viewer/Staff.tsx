import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useResize } from "../../hooks/useResize";
import { Board, BoardContext } from "../../contexts/BoardContext";
import { NotationContext } from "../../contexts/NotationContext";
import { Scroller } from "./Scroller";
import styles from "./Staff.module.css";

type StaffProps = {
  maxChar: number;
  scrollPos: { x: number; y: number; max: number };
  setMaxChar: Dispatch<SetStateAction<number>>;
  setScrollPos: Dispatch<SetStateAction<{ x: number; y: number; max: number }>>;
};

function translateNotation(maxChar: number, board: Board, notation: string): any[] {
  const rest = "-";
  const notes = notation ? notation.split(",") : [];
  const staffs = [];
  const border = Array(board.stringCount).fill("|");
  let lines = border.slice();

  if (!notes[notes.length - 1]) {
    notes.pop();
  }

  for (let i = 0; i < notes.length; i++) {
    if (!notes[i]) {
      continue;
    }

    if (lines[0].length + 4 >= maxChar) {
      lines = lines.map((line) => line + "-".repeat(Math.abs(maxChar - line.length - 1)) + "|");
      staffs.push(lines);
      lines = border.slice();
    }

    const concurrentNotes = notes[i].split("-");
    if (concurrentNotes.length > 1) {
      for (let j = 0; j < concurrentNotes.length; j++) {
        const [string, fret] = concurrentNotes[j].split(":");
        lines[parseInt(string) - 1] += rest + fret;
      }
    } else {
      const [string, fret] = notes[i].split(":");
      lines[parseInt(string) - 1] += rest + fret;
    }

    const longestLine = lines.reduce((a, b) => (a.length > b.length ? a : b));
    for (let j = 0; j < lines.length; j++) {
      lines[j] += rest.repeat(longestLine.length - lines[j].length);
    }
  }

  const currNotePos = { x: lines[0].length, y: staffs.length, max: staffs.length };
  lines = lines.map((line) => line + "-".repeat(Math.abs(maxChar - line.length - 1)) + "|");
  staffs.push(lines);
  return [staffs, currNotePos];
}

export function Staff({ maxChar, setMaxChar, scrollPos, setScrollPos }: StaffProps) {
  const { board } = useContext(BoardContext);
  const { notation } = useContext(NotationContext);
  const [asciiTab, setAsciiTab] = useState([[]] as string[][]);
  const divRef = useRef<HTMLDivElement | null>(null);
  const containerWidth = useResize(divRef)[0];
  const fontRef = useRef<HTMLSpanElement | null>(null);
  const { width, height } = fontRef.current ? fontRef.current.getBoundingClientRect() : { width: 1, height: 1 };

  useEffect(() => {
    setMaxChar(Math.floor(containerWidth / width));
  }, [containerWidth]);

  useEffect(() => {
    const [staffs, currNotePos] = translateNotation(maxChar, board, notation);
    setAsciiTab(staffs);
    setScrollPos(currNotePos);
  }, [notation, maxChar]);

  return (
    <>
      <div className={styles.root} ref={divRef}>
        {asciiTab.map((staff, i) => {
          return (
            <div className={styles.staff} key={i}>
              {i === scrollPos.y && <Scroller fontSize={{ width, height }} scrollPos={scrollPos} />}
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
