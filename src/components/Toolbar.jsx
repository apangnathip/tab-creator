import { Fretboard } from "./Fretboard";
import { Techbar } from "./Techbar";

export const Toolbar = ({ fretboard, setNotation }) => {
  return (
    <div id="toolbar">
      <Techbar setNotation={setNotation} />
      <Fretboard fretboard={fretboard} setNotation={setNotation} />
    </div>
  );
};
