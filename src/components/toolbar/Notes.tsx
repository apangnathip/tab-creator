import { ReactElement, useContext } from "react";
import { Board, BoardContext } from "../../contexts/BoardContext";
import { NotationContext } from "../../contexts/NotationContext";
import styles from "./Notes.module.css";

type NotesProps = {
  frets: ReactElement[];
  fretWidth: number;
};

const tuningNotes: { [tuning: string]: string[] } = {
  E: ["E4", "B3", "G3", "D3", "A2", "E2"],
  Eb: ["Eb4", "Bb3", "Gb3", "Db3", "Ab2", "Eb2"],
  "Drop-D": ["E4", "B3", "G3", "D3", "A2", "D2"],
};

function nextNote(currNote: string) {
  let octave = currNote.slice(-1);

  if (currNote.charAt(0) == "B" && currNote.charAt(1) != "b") {
    octave = (parseInt(octave) + 1).toString();
  }
  if (currNote.charAt(0) == "G" && currNote.charAt(1) != "b") {
    return "A" + "b" + octave;
  }
  if (currNote.charAt(1) == "b") {
    return currNote.charAt(0) + octave;
  }

  let nextNote = String.fromCharCode(currNote.charCodeAt(0) + 1);
  if (!["B", "E"].includes(currNote.charAt(0))) {
    nextNote += "b";
  }
  return nextNote + octave;
}

function createNotes(
  addNotation: (note: { string: number; fret: number }) => void,
  boardProps: Board,
  fretWidth: number,
  frets: ReactElement[]
) {
  const { fretCount, tuning, stringCount } = boardProps;
  const notes = [];
  const noteMemo = [tuningNotes[tuning]];

  for (let fret = 0; fret < fretCount + 1; fret++) {
    const fretButtons = [];
    let gapWidth = frets[fret].props.x;

    noteMemo.push([]);

    if (fret == 0) {
      gapWidth += fretWidth * 2;
    } else if (fret == 1) {
      gapWidth -= frets[fret - 1].props.x + fretWidth;
    } else {
      gapWidth -= frets[fret - 1].props.x;
    }

    for (let string = 0; string < stringCount; string++) {
      if (fret > 0) {
        noteMemo[fret][string] = nextNote(noteMemo[fret - 1][string]);
      }
      fretButtons.push(
        <div
          className={styles.button}
          onClick={() => addNotation({ string: string, fret })}
          style={{ width: gapWidth }}
          key={string}
        >
          <p className={styles.noteOverlay}>{noteMemo[fret][string]}</p>
        </div>
      );
    }

    notes.push(
      <li className={styles.col} key={fret}>
        {fretButtons}
      </li>
    );
  }

  return notes;
}

export function Notes({ fretWidth, frets }: NotesProps) {
  const { addNotation } = useContext(NotationContext);
  const { board } = useContext(BoardContext);
  return <ul className={styles.note}>{createNotes(addNotation, board, fretWidth, frets)}</ul>;
}
