import { useState, useRef, useEffect } from "react";
import { Notes } from "./Notes";

const board = {
  numStrings: 6,
  numFrets: 24,
  fretWidth: 2,
  maxFretSpacing: 1.5,
  markerPos: new Set([3, 5, 7, 9, 12, 15, 17, 19, 21, 24]),
};

const setBoardDimensions = (width, height) => {
  board.width = width;
  board.height = height;
};

const createStrings = (numStrings) => {
  let strings = [];
  const stringWidth = Array.from({ length: numStrings }, (_, i) => i / 3 + 1);
  const stringSpacing = board.height / numStrings;

  for (let i = 0; i < numStrings; i++) {
    strings.push(<rect y={stringSpacing * (i + 0.5) - stringWidth[i] * 0.5} width={board.width} height={stringWidth[i]} fill="white" key={i} />);
  }

  return strings;
};

const createFrets = () => {
  let frets = [];
  let nutPos = board.width - 0.97 * board.width;
  let fretSpacing = ((board.width - nutPos) / (board.numFrets + 1)) * board.maxFretSpacing;
  let minFretSpacing = (board.width - nutPos) / (board.numFrets + 1);
  let fretDecrement = (minFretSpacing * (board.maxFretSpacing - 1)) / (board.numFrets + 1);
  let initPos = nutPos - board.fretWidth;

  frets.push(<rect x={nutPos} width={board.fretWidth * 2} height={board.height} fill="beige" key={"nut"} />);

  for (let i = 1; i < board.numFrets + 1; i++) {
    frets.push(<rect x={initPos + fretSpacing * i} width={board.fretWidth} height={board.height} fill="grey" key={i} />);
    fretSpacing -= fretDecrement;
  }
  return frets;
};

const createMarkers = (numStrings, frets) => {
  let markers = [];
  let markerSize = (board.height / numStrings) * 0.25;

  for (let i = 0; i < frets.length - 1; i++) {
    if (!board.markerPos.has(i + 1)) {
      continue;
    }

    let startFret = frets[i].props.x + board.fretWidth / 2;
    let endFret = frets[i + 1].props.x + board.fretWidth / 2;
    let midFret = startFret + (endFret - startFret) / 2;

    if ((i + 1) % 2) {
      markers.push(<circle cx={midFret} cy={board.height / 2} r={markerSize} fill="white" key={i + 1} />);
    } else {
      markers.push(<circle cx={midFret} cy={board.height / 4} r={markerSize} fill="white" key={"top " + i + 1} />);
      markers.push(<circle cx={midFret} cy={board.height * 0.75} r={markerSize} fill="white" key={"bot " + i + 1} />);
    }
  }

  return markers;
};

export const Fretboard = ({ numStrings }) => {
  const [dimensions, setDimensions] = useState([0, 0]);
  const ref = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setDimensions([ref.current.clientWidth, ref.current.clientHeight]);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  setBoardDimensions(...dimensions);
  const strings = createStrings(numStrings);
  const frets = createFrets();
  const markers = createMarkers(numStrings, frets);

  return (
    <div id="toolbar">
      <div id="fretboard-container" style={{ height: "100%" }} ref={ref}>
        <svg height="100%" width="100%">
          <rect height="100%" width="100%" fill="#202020" />
          {frets}
          {markers}
          {strings}
        </svg>
        <Notes board={board} frets={frets} />
      </div>
    </div>
  );
};
