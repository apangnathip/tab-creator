import { useContext, useEffect, useRef, useState } from "react";
import { Board, BoardContext } from "../../contexts/BoardContext";
import { NotationContext } from "../../contexts/NotationContext";
import styles from "./Staff.module.css";

function translateNotation(board: Board, notation: string, charLimit: number, changeActive: (pos: number) => void) {
  const notes = notation.split(",") ?? [];
  const staffs = [];
  let staff: (string | string[])[] = ["border"];
  let staffLength = 1;
  let nonEmptyLength = 1;

  for (const note of notes) {
    if (!note) continue;
    nonEmptyLength++;
    staff.push("empty");
    const concurrent = note.split("-");
    if (!concurrent.at(-1)) concurrent.pop();

    const longestLength = concurrent.reduce((a, c) => (a.length > c.length ? a : c)).length - 2;
    const line = Array(board.stringCount).fill("-".repeat(longestLength));

    for (const concurNote of concurrent) {
      const [string, fret] = concurNote.split(":");
      const stringIndex = parseInt(string) - 1;
      line[stringIndex] = fret + "-".repeat(longestLength - fret.length);
    }

    staff.push(line);
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
          staff.push("border");
        } else {
          staff.push("empty");
        }
      }

      staffs.push(staff);
      staff = ["border", "empty", endLine];
      staffLength = 2 + endLine[0].length;
    }
  }

  changeActive(staff.length >= charLimit ? charLimit : nonEmptyLength);

  // Autofill to reach page margins
  for (let i = 0; i < charLimit - staffLength; i++) {
    staff.push(i === 1 ? "current" : "empty");
  }

  staff.push("border");
  staffs.push(staff);

  return staffs;
}

function createNoteElements(stringCount: number, line: string | string[]) {
  const elements = [];
  let empty = false;

  for (let k = 0; k < stringCount; k++) {
    let note = line[k];

    if (line === "empty") {
      empty = true;
      note = "-";
    } else if (line === "current") {
      note = "-";
    } else if (line === "border") {
      note = "|";
    }

    elements.push(
      <div className={styles.note} key={k}>
        {note}
      </div>
    );
  }

  return [elements, empty];
}

function renderTab(board: Board, tab: (string | string[])[][], active: number, changeActive: (pos: number) => void) {
  const staffElements = [];
  let count = 0;

  for (let i = 0; i < tab.length; i++) {
    const staff = tab[i];
    const lineElements = [];

    for (let j = 0; j < staff.length; j++) {
      const line = staff[j];
      const [noteElements, empty] = createNoteElements(board.stringCount, line);
      if (!empty) count++;

      console.log(count);

      if (empty && line !== "current" && line != "border") {
        lineElements.push(<span key={j}>{noteElements}</span>);
      } else {
        lineElements.push(
          <span
            className={active === count ? styles.lineActive : styles.line}
            onClick={(e) => changeActive(parseInt(e.currentTarget.id))}
            id={count.toString()}
            key={j}
          >
            {noteElements}
          </span>
        );
      }
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
  const { notation, lock } = useContext(NotationContext);
  const [sheetSize, setSheetSize] = useState<[number, number]>([500, 1200]);
  const [charLimit, setCharLimit] = useState(0);
  const [tab, setTab] = useState<(string | string[])[][]>([[[""]]]);
  const [active, setActive] = useState(0);
  const fontRef = useRef<HTMLSpanElement>(null);
  const fontSize = fontRef.current ? fontRef.current.clientWidth : 1;

  const changeActive = (pos: number) => {
    if (!lock) setActive(pos);
  };

  useEffect(() => {
    setCharLimit(Math.round(sheetSize[0] / fontSize));
  }, [sheetSize, fontSize]);

  useEffect(() => {
    setTab(translateNotation(board, notation, charLimit, changeActive));
  }, [notation, charLimit]);

  return (
    <div className={styles.root} style={{ width: sheetSize[0], minHeight: sheetSize[1] }}>
      {renderTab(board, tab, active, changeActive)}
      <span className={styles.fontCalibrator} ref={fontRef}>
        x
      </span>
    </div>
  );
}
