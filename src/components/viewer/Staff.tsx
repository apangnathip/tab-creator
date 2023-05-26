import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { Board, BoardContext } from "../../contexts/BoardContext";
import { NotationContext } from "../../contexts/NotationContext";
import styles from "./Staff.module.css";

function translateNotation(
  board: Board,
  notation: string,
  charLimit: number,
  setActive: Dispatch<SetStateAction<{ staff: number; line: number }>>
) {
  const notes = notation ? notation.split(",") : [];
  const border = Array(board.stringCount).fill("|");
  const empty = Array(board.stringCount).fill("-");
  const staffs = [];
  let staff = [border.slice()];
  let staffLength = 1;
  notes.pop();

  for (const note of notes) {
    const [string, fret] = note.split(":");
    const stringIndex = parseInt(string) - 1;
    const line = Array(board.stringCount).fill("-".repeat(fret ? fret.length : 1));
    line[stringIndex] = fret;
    staff.push(empty.slice(), line);

    staffLength = 0;
    for (const line of staff) {
      staffLength += line[0].length;
    }

    if (staffLength > charLimit) {
      const endLine = staff.pop() as string[];
      const offset = charLimit - staffLength + endLine[0].length + 2;
      staff.pop();

      for (let i = 0; i < offset; i++) {
        if (i === offset - 1) {
          staff.push(border.slice());
        } else {
          staff.push(empty.slice());
        }
      }

      staffs.push(staff);
      staff = [border.slice(), empty.slice(), endLine];
      staffLength = 2 + endLine[0].length;
    }
  }

  setActive({ staff: staffs.length, line: staff.length >= charLimit ? charLimit : staff.length + 1 });

  for (let i = 0; i < charLimit - staffLength; i++) {
    staff.push(empty.slice());
  }

  staff.push(border.slice());
  staffs.push(staff);

  return staffs;
}

function renderTab(
  tab: string[][][],
  active: { staff: number; line: number },
  setActive: Dispatch<SetStateAction<{ staff: number; line: number }>>
) {
  const staffElements = [];

  for (let i = 0; i < tab.length; i++) {
    const staff = tab[i];
    const lineElements = [];

    for (let j = 0; j < staff.length; j++) {
      const line = staff[j];
      const noteElements = [];

      for (let k = 0; k < line.length; k++) {
        const note = line[k];
        noteElements.push(
          <div className={styles.note} key={k}>
            {note}
          </div>
        );
      }

      lineElements.push(
        <span
          className={active.staff === i && active.line === j ? styles.lineActive : styles.line}
          onClick={() => setActive({ staff: i, line: j })}
          key={j}
        >
          {noteElements}
        </span>
      );
    }

    staffElements.push(
      <div className={styles.staff} key={i}>
        {lineElements}
      </div>
    );
  }

  return staffElements;
}

export function Staff() {
  const { board } = useContext(BoardContext);
  const { notation } = useContext(NotationContext);
  const [sheetSize, setSheetSize] = useState<[number, number]>([800, 1200]);
  const [charLimit, setCharLimit] = useState(0);
  const [tab, setTab] = useState([[[""]]]);
  const [active, setActive] = useState({ staff: 0, line: 2 });
  const fontRef = useRef<HTMLSpanElement>(null);
  const fontSize = fontRef.current ? fontRef.current.clientWidth : 1;

  useEffect(() => {
    setCharLimit(Math.round(sheetSize[0] / fontSize));
  }, [sheetSize, fontSize]);

  useEffect(() => {
    setTab(translateNotation(board, notation, charLimit, setActive));
  }, [notation, charLimit]);

  return (
    <div className={styles.root} style={{ width: sheetSize[0], minHeight: sheetSize[1] }}>
      {renderTab(tab, active, setActive)}
      <span className={styles.fontCalibrator} ref={fontRef}>
        x
      </span>
    </div>
  );
}
