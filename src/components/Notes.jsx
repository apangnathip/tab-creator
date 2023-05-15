const createNotes = (board, frets) => {
  let notes = [];

  for (let i = 0; i < board.numFrets + 1; i++) {
    let fret = [];
    let gapWidth = frets[i].props.x;

    if (i == 0) {
      gapWidth += board.fretWidth * 2;
    } else if (i == 1) {
      gapWidth -= frets[i - 1].props.x + board.fretWidth;
    } else {
      gapWidth -= frets[i - 1].props.x;
    }

    for (let j = 0; j < board.numStrings; j++) {
      fret.push(
        <div style={{ width: gapWidth }} key={j}>
          {i}
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

export const Notes = ({ board, frets }) => {
  return <ul id="fretboard-notes">{createNotes(board, frets)}</ul>;
};
