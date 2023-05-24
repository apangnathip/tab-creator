import { useRef, useContext, useMemo } from "react";
import { useResize } from "../../hooks/useResize";
import { Board, BoardContext } from "../contexts/BoardContext";
import { Notes } from "./Notes";
import styles from "./Fretboard.module.css";

type Dimension = {
  width: number;
  height: number;
};

const fretWidth = 2;
const markerPos = new Set([3, 5, 7, 9, 12, 15, 17, 19, 21, 24]);
const maxFretScaling = 1.5;

function getFretPos(width: number, board: Board) {
  const { fretCount } = board;
  const fretPos = [];
  const nutPos = width - 0.97 * width;
  const minFretSpacing = (width - nutPos) / (fretCount + 1);
  const fretDecrement = (minFretSpacing * (maxFretScaling - 1)) / (fretCount + 1);
  const initPos = nutPos - fretWidth;
  let fretSpacing = ((width - nutPos) / (fretCount + 1)) * maxFretScaling;

  fretPos.push(nutPos);
  for (let i = 1; i < fretCount + 1; i++) {
    fretPos.push(initPos + fretSpacing * i);
    fretSpacing -= fretDecrement;
  }

  return fretPos;
}

function createFrets(dimension: Dimension, board: Board) {
  const { width, height } = dimension;
  const fretPos = getFretPos(width, board);
  const frets = fretPos.map((pos, i) => {
    return (
      <rect
        className={i ? styles.fret : styles.nut}
        x={pos}
        width={i ? fretWidth : fretWidth * 2}
        height={height}
        key={i}
      />
    );
  });

  return frets;
}

function createMarkers(dimension: Dimension, board: Board) {
  const { width, height } = dimension;
  const { stringCount } = board;
  const markers = [];
  const markerSize = (height / stringCount) * 0.25;
  const fretPos = getFretPos(width, board);

  for (let i = 0; i < fretPos.length - 1; i++) {
    if (!markerPos.has(i + 1)) continue;

    const startFret = fretPos[i] + fretWidth / 2;
    const endFret = fretPos[i + 1] + fretWidth / 2;
    const midFret = startFret + (endFret - startFret) / 2;

    if ((i + 1) % 2) {
      markers.push(<circle className={styles.marker} cx={midFret} cy={height / 2} r={markerSize} key={i + 1} />);
    } else {
      markers.push(
        <circle className={styles.marker} cx={midFret} cy={height / 4} r={markerSize} key={"top " + i + 1} />
      );
      markers.push(
        <circle className={styles.marker} cx={midFret} cy={height * 0.75} r={markerSize} key={"bot " + i + 1} />
      );
    }
  }

  return markers;
}

function createStrings(dimension: Dimension, board: Board) {
  const { width, height } = dimension;
  const { stringCount } = board;
  const strings = [];
  const stringWidth = Array.from({ length: stringCount }, (_, i) => i / 3 + 1);
  const stringSpacing = height / stringCount;

  for (let i = 0; i < stringCount; i++) {
    strings.push(
      <rect
        className={styles.string}
        y={stringSpacing * (i + 0.5) - stringWidth[i] * 0.5}
        width={width}
        height={stringWidth[i]}
        key={i}
      />
    );
  }

  return strings;
}

export function Fretboard() {
  const { board } = useContext(BoardContext);
  const ref = useRef<HTMLDivElement | null>(null);
  const dimension = useResize(ref);

  const [strings, frets, markers] = useMemo(() => {
    return [createStrings(dimension, board), createFrets(dimension, board), createMarkers(dimension, board)];
  }, [dimension]);

  return (
    <div className={styles.root}>
      <div className={styles.wrapper} ref={ref}>
        <svg className={styles.board}>
          <rect className={styles.wood} />
          {frets}
          {markers}
          {strings}
        </svg>
        <Notes fretWidth={fretWidth} frets={frets} />
      </div>
    </div>
  );
}
