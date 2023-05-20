import { useState, useEffect, useRef, useContext, useMemo } from "react";
import { Board, BoardContext } from "../contexts/BoardContext";
import { NotationContext } from "../contexts/NotationContext";
import { Notes } from "./Notes";
import styles from "./Fretboard.module.css";
import { useResize } from "../../hooks/useResize";

interface Fretboard {
  addNotation: (noteInfo: { string: number; fret: number }) => void;
}

interface Dimension {
  width: number;
  height: number;
}

const fretWidth = 2;
const markerPos = new Set([3, 5, 7, 9, 12, 15, 17, 19, 21, 24]);
const maxFretScaling = 1.5;

function createStrings(dimension: Dimension, board: Board) {
  const { width, height } = dimension;
  const { stringCount } = board;

  let strings = [];
  const stringWidth = Array.from({ length: stringCount }, (_, i) => i / 3 + 1);
  const stringSpacing = height / stringCount;

  for (let i = 0; i < stringCount; i++) {
    strings.push(
      <rect
        y={stringSpacing * (i + 0.5) - stringWidth[i] * 0.5}
        width={width}
        height={stringWidth[i]}
        fill="white"
        key={i}
      />
    );
  }

  return strings;
}

function createFrets(dimension: Dimension, board: Board) {
  const { width, height } = dimension;
  const { fretCount } = board;

  let frets = [];
  let nutPos = width - 0.97 * width;
  let fretSpacing = ((width - nutPos) / (fretCount + 1)) * maxFretScaling;
  let minFretSpacing = (width - nutPos) / (fretCount + 1);
  let fretDecrement = (minFretSpacing * (maxFretScaling - 1)) / (fretCount + 1);
  let initPos = nutPos - fretWidth;

  frets.push(<rect className={styles.nut} x={nutPos} width={fretWidth * 2} height={height} key={"nut"} />);

  for (let i = 1; i < fretCount + 1; i++) {
    frets.push(
      <rect className={styles.fret} x={initPos + fretSpacing * i} width={fretWidth} height={height} key={i} />
    );
    fretSpacing -= fretDecrement;
  }
  return frets;
}

function createMarkers(dimension: Dimension, frets: React.ReactElement[], board: Board) {
  const { height } = dimension;
  const { stringCount } = board;
  let markers = [];
  let markerSize = (height / stringCount) * 0.25;

  for (let i = 0; i < frets.length - 1; i++) {
    if (!markerPos.has(i + 1)) {
      continue;
    }

    let startFret = frets[i].props.x + fretWidth / 2;
    let endFret = frets[i + 1].props.x + fretWidth / 2;
    let midFret = startFret + (endFret - startFret) / 2;

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

export function Fretboard() {
  const { board } = useContext(BoardContext);
  const { addNotation } = useContext(NotationContext);
  const ref = useRef<HTMLDivElement | null>(null);
  const dimension = useResize(ref);

  const strings = createStrings(dimension, board);
  const frets = createFrets(dimension, board);
  const markers = createMarkers(dimension, frets, board);

  return (
    <div className={styles.root} ref={ref}>
      <svg className={styles.wrapper}>
        <rect className={styles.wood} />
        {frets}
        {markers}
        {strings}
      </svg>
      <Notes fretWidth={fretWidth} frets={frets} addNotation={addNotation} />
    </div>
  );
}
