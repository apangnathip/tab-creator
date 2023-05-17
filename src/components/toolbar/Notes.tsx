import React from "react";
import { BoardProps } from "../../App";

interface NotesProps {
  boardProps: BoardProps;
  frets: Array<JSX.Element>;
  fretWidth: number;
  setNotation: React.Dispatch<React.SetStateAction<string>>;
}

const tuningNotes: { [tuning: string]: Array<string> } = {
  E: ["E4", "B3", "G3", "D3", "A2", "E2"],
  Eb: ["Eb4", "Bb3", "Gb3", "Db3", "Ab2", "Eb2"],
  "Drop-D": ["E4", "B3", "G3", "D3", "A2", "D2"],
};

const nextNote = (currNote: string) => {
  let octave: string = currNote.slice(-1);

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
};

const createNotes = (
  setNotation: React.Dispatch<React.SetStateAction<string>>,
  boardProps: BoardProps,
  fretWidth: number,
  frets: Array<JSX.Element>
) => {
  const { fretCount, tuning, stringCount } = boardProps;
  let notes = [];
  let noteMemo = [tuningNotes[tuning]];

  for (let i = 0; i < fretCount + 1; i++) {
    let fret = [];
    let gapWidth = frets[i].props.x;
    noteMemo.push([]);

    if (i == 0) {
      gapWidth += fretWidth * 2;
    } else if (i == 1) {
      gapWidth -= frets[i - 1].props.x + fretWidth;
    } else {
      gapWidth -= frets[i - 1].props.x;
    }

    for (let j = 0; j < stringCount; j++) {
      if (i > 0) {
        noteMemo[i][j] = nextNote(noteMemo[i - 1][j]);
      }
      fret.push(
        <div
          className="fret-button"
          onClick={() =>
            setNotation((currentNotation) => `${currentNotation}${j + 1}:${i},`)
          }
          style={{ width: gapWidth }}
          key={j}
        >
          <p style={{ visibility: "hidden" }}>{noteMemo[i][j]}</p>
        </div>
      );
    }

    notes.push(
      <li className="fret-col" key={i}>
        {fret}
      </li>
    );
  }

  return notes;
};

export const Notes = ({ boardProps, fretWidth, frets, setNotation }: NotesProps) => {
  return (
    <ul id="fretboard-notes">{createNotes(setNotation, boardProps, fretWidth, frets)}</ul>
  );
};
