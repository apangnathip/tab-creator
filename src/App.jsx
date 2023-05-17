import { useState } from "react";
import { Toolbar } from "./components/Toolbar";
import { Tabsheet } from "./components/Tabsheet";
import "./styles.css";

function App() {
  const [notation, setNotation] = useState("");
  const [fretboard, setFretboard] = useState({
    stringCount: 6,
    tuning: "E",
    fretCount: 24,
  });

  return (
    <>
      <Toolbar fretboard={fretboard} setNotation={setNotation} />
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
      <Tabsheet fretboard={fretboard} notation={notation} />
    </>
  );
}

export default App;
