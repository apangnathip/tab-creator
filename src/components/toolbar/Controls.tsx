import { useContext } from "react";
import { NotationContext } from "../contexts/NotationContext";
import styles from "./Controls.module.css";

type ControlsProps = {
  setShowFretboard: React.Dispatch<React.SetStateAction<boolean>>;
};

type Mode = "unrestrict" | "stack" | "higher" | "external";
type TechniqueList = { [id: string]: Technique };
type ControlList = { [id: string]: string };

class Technique {
  desc: string;
  mode: Mode;

  constructor(desc: string, mode: Mode) {
    this.desc = desc;
    this.mode = mode;
  }
}

export const techniques: TechniqueList = {
  h: new Technique("Hammer-on", "stack"),
  p: new Technique("Pull-off", "stack"),
  b: new Technique("Bend", "higher"),
  r: new Technique("Release", "stack"),
  t: new Technique("Tap", "external"),
  "~": new Technique("Vibrato", "unrestrict"),
  "/": new Technique("Slide Up", "stack"),
  "\\": new Technique("Slide Down", "stack"),
};

const controls: ControlList = {
  "<": "Move Left",
  ">": "Move Right",
  F: "Fretboard",
};

export function Controls({ setShowFretboard }: ControlsProps) {
  const { technique, setTechnique } = useContext(NotationContext);
  return (
    <>
      {Object.entries(techniques).map(([id, tech]) => {
        if (technique === id) {
        }
        return (
          <button
            className={technique == id ? styles.btnToggled : styles.btn}
            onClick={() => setTechnique(id)}
            title={tech.desc}
            key={id}
          >
            {id}
          </button>
        );
      })}

      {Object.entries(controls).map(([id, desc]) => {
        return (
          <button
            className={styles.btn}
            onClick={
              id == "F" ? () => setShowFretboard((currentState: boolean) => !currentState) : () => console.log("temp")
            }
            title={desc}
            key={id}
          >
            {id}
          </button>
        );
      })}
    </>
  );
}
