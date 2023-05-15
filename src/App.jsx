import { useState } from "react";
import { Fretboard } from "./components/Fretboard";
import { Tabsheet } from "./components/Tabsheet";
import "./styles.css";

function App() {
  const [numStrings, setNumStrings] = useState(6);
  const [lines, setLines] = useState(Array(numStrings).fill("-"));

  const addEmpty = () => {
    setLines((currLines) => {
      return currLines.map((line) => line + "-");
    });
  };

  return (
    <>
      <Fretboard numStrings={numStrings} />
      <Tabsheet lines={lines} />
      <button onClick={() => addEmpty()}>Empty</button>
    </>
  );
}

export default App;
