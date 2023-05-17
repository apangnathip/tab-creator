import { BoardProps } from "../../App";
import { Fretboard } from "./Fretboard";
import { Controls } from "./Controls";

interface ToolbarProps {
  boardProps: BoardProps;
  setNotation: React.Dispatch<React.SetStateAction<string>>;
}

export const Toolbar = ({ boardProps, setNotation }: ToolbarProps) => {
  return (
    <div id="toolbar">
      <Controls setNotation={setNotation} />
      <Fretboard boardProps={boardProps} setNotation={setNotation} />
    </div>
  );
};
