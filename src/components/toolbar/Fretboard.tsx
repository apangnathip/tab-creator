import { useState, useEffect, useRef } from "react";
import { Notes } from "./Notes";
import { BoardProps } from "../../App";

interface FretboardProps {
  boardProps: BoardProps;
  setNotation: React.Dispatch<React.SetStateAction<string>>;
}

interface Dimension {
  width: number;
  height: number;
}

const fretWidth = 2;
const markerPos = new Set([3, 5, 7, 9, 12, 15, 17, 19, 21, 24]);
const maxFretScaling = 1.5;

const createStrings = (dimension: Dimension, boardProps: BoardProps) => {
  const { width, height } = dimension;
  const { stringCount } = boardProps;

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
};

const createFrets = (dimension: Dimension, boardProps: BoardProps) => {
  const { width, height } = dimension;
  const { fretCount } = boardProps;

  let frets = [];
  let nutPos = width - 0.97 * width;
  let fretSpacing = ((width - nutPos) / (fretCount + 1)) * maxFretScaling;
  let minFretSpacing = (width - nutPos) / (fretCount + 1);
  let fretDecrement = (minFretSpacing * (maxFretScaling - 1)) / (fretCount + 1);
  let initPos = nutPos - fretWidth;

  frets.push(
    <rect x={nutPos} width={fretWidth * 2} height={height} fill="beige" key={"nut"} />
  );

  for (let i = 1; i < fretCount + 1; i++) {
    frets.push(
      <rect
        x={initPos + fretSpacing * i}
        width={fretWidth}
        height={height}
        fill="grey"
        key={i}
      />
    );
    fretSpacing -= fretDecrement;
  }
  return frets;
};

const createMarkers = (
  dimension: Dimension,
  frets: Array<JSX.Element>,
  boardProps: BoardProps
) => {
  const { height } = dimension;
  const { stringCount } = boardProps;
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
      markers.push(
        <circle cx={midFret} cy={height / 2} r={markerSize} fill="white" key={i + 1} />
      );
    } else {
      markers.push(
        <circle
          cx={midFret}
          cy={height / 4}
          r={markerSize}
          fill="white"
          key={"top " + i + 1}
        />
      );
      markers.push(
        <circle
          cx={midFret}
          cy={height * 0.75}
          r={markerSize}
          fill="white"
          key={"bot " + i + 1}
        />
      );
    }
  }

  return markers;
};

export const Fretboard = ({ boardProps, setNotation }: FretboardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [dimension, setDimension] = useState<Dimension>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setDimension({
          width: ref.current.clientWidth,
          height: ref.current.clientHeight,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const strings = createStrings(dimension, boardProps);
  const frets = createFrets(dimension, boardProps);
  const markers = createMarkers(dimension, frets, boardProps);

  return (
    <div id="fretboard-container" style={{ height: "100%" }} ref={ref}>
      <svg height="100%" width="100%">
        <rect height="100%" width="100%" fill="#202020" />
        {frets}
        {markers}
        {strings}
      </svg>
      <Notes
        boardProps={boardProps}
        fretWidth={fretWidth}
        frets={frets}
        setNotation={setNotation}
      />
    </div>
  );
};
