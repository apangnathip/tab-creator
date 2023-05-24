import { Dispatch, SetStateAction, useContext } from "react";
import { NotationContext } from "../contexts/NotationContext";
import styles from "./Controls.module.css";

type ControlsProps = {
  maxChar: number;
  setScrollPos: Dispatch<SetStateAction<{ x: number; y: number; max: number }>>;
  setShowFretboard: Dispatch<SetStateAction<boolean>>;
};

type Mode = "new" | "unrestrict" | "stack" | "higher" | "external";
type TechniqueList = { [id: string]: Technique };

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

export function Controls({ maxChar, setScrollPos, setShowFretboard }: ControlsProps) {
  const { technique, setTechnique, lock, setLock } = useContext(NotationContext);
  return (
    <>
      {Object.entries(techniques).map(([id, tech]) => {
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

      <button
        className={lock ? styles.btnToggled : styles.btn}
        onClick={() => {
          setLock((currentState) => !currentState);
        }}
      >
        lock
      </button>

      <button
        className={styles.btn}
        onClick={() =>
          setScrollPos(({ x, y, max }) => {
            if (x! > 0) {
              return { x: --x, y: y, max: max };
            }
            return { x: x, y: y, max: max };
          })
        }
      >
        {"<"}
      </button>

      <button
        className={styles.btn}
        onClick={() =>
          setScrollPos(({ x, y, max }) => {
            if (x! < maxChar - 3) {
              return { x: ++x, y: y, max: max };
            }
            return { x: x, y: y, max: max };
          })
        }
      >
        {">"}
      </button>

      <button
        className={styles.btn}
        onClick={() =>
          setScrollPos(({ x, y, max }) => {
            if (y > 0) {
              return { x: x, y: --y, max: max };
            }
            return { x: x, y: y, max: max };
          })
        }
      >
        {"up"}
      </button>

      <button
        className={styles.btn}
        onClick={() =>
          setScrollPos(({ x, y, max }) => {
            if (y < max) {
              return { x: x, y: ++y, max: max };
            }
            return { x: x, y: y, max: max };
          })
        }
      >
        {"down"}
      </button>

      <button className={styles.btn} onClick={() => setShowFretboard((currentState) => !currentState)}>
        {"F"}
      </button>
    </>
  );
}
