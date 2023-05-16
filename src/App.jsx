import { useState } from "react";
import { Fretboard } from "./components/Fretboard";
import { Tabsheet } from "./components/Tabsheet";
import "./styles.css";

function App() {
  // const [lines, setLines] = useState(Array(numStrings).fill("-"));
  const [fretboard, setFretboard] = useState({
    stringCount: 6,
    tuning: "E",
    fretCount: 24,
  });

  const [sheetNotation, setSheetNotation] = useState("");

  const addEmpty = () => {
    setLines((currLines) => {
      return currLines.map((line) => line + "-");
    });
  };

  return (
    <>
      <Fretboard fretboard={fretboard} sheetNotation={sheetNotation} />
      <select
        value={fretboard.tuning}
        onChange={(e) =>
          setFretboard((currFretboard) => {
            return { ...currFretboard, tuning: e.target.value };
          })
        }
      >
        <option value="E">Standard</option>
        <option value="Eb">Eb</option>
        <option value="Drop-D">Drop D</option>
      </select>
      {/* <Tabsheet lines={lines} /> */}
      {/* <button onClick={() => addEmpty()}>Empty</button> */}
    </>
  );
}

export default App;
