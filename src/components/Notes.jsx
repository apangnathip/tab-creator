const tuningNotes = {
  E: ["E4", "B3", "G3", "D3", "A2", "E2"],
  Eb: ["Eb4", "Bb3", "Gb3", "Db3", "Ab2", "Eb2"],
  "Drop-D": ["E4", "B3", "G3", "D3", "A2", "D2"],
};

const nextNote = (currNote) => {
  let octave = currNote.slice(-1);

  if (currNote.charAt(0) == "B" && currNote.charAt(1) != "b") {
    octave = parseInt(octave) + 1;
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

const createNotes = (fretboard, fretWidth, frets) => {
  const { fretCount, tuning, stringCount } = fretboard;
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
        <div note={noteMemo[i][j]} onClick={(e) => console.log(`${j + 1}:${i}`)} style={{ width: gapWidth }} key={j}>
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

export const Notes = ({ fretboard, sheetNotation, fretWidth, frets }) => {
  return <ul id="fretboard-notes">{createNotes(fretboard, fretWidth, frets)}</ul>;
};
