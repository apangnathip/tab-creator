import { useState } from "react";
import { Toolbar } from "./components/toolbar";
import { Tabsheet } from "./components/tabsheet/Tabsheet";
import "./styles.css";

export interface BoardProps {
  stringCount: number;
  fretCount: number;
  tuning: string;
}

function App() {
  const [notation, setNotation] = useState("");
  const [boardProps, setBoardProps] = useState<BoardProps>({
    stringCount: 6,
    fretCount: 24,
    tuning: "E",
  });

  return (
    <>
      <Toolbar boardProps={boardProps} setNotation={setNotation} />
      <select
        value={boardProps.tuning}
        onChange={(e) =>
          setBoardProps((currBoardProps) => {
            return { ...currBoardProps, tuning: e.target.value };
          })
        }
      >
        <option value="E">Standard</option>
        <option value="Eb">Eb</option>
        <option value="Drop-D">Drop D</option>
      </select>
      <Tabsheet boardProps={boardProps} notation={notation} />
    </>
  );
}

export default App;
