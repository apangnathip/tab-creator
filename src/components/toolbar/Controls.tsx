import { Dispatch, SetStateAction, useContext } from "react";
import { NotationContext } from "../../contexts/NotationContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import styles from "./Controls.module.css";

type ControlsProps = {
  limits: { char: number; staff: number };
  setScrollPos: Dispatch<SetStateAction<{ x: number; y: number }>>;
};

type Mode = "unrestrict" | "stack";
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
  b: new Technique("Bend", "stack"),
  r: new Technique("Release", "stack"),
  "~": new Technique("Vibrato", "unrestrict"),
  "/": new Technique("Slide Up", "stack"),
  "\\": new Technique("Slide Down", "stack"),
};

export function Controls({ limits, setScrollPos }: ControlsProps) {
  const { technique, setTechnique, lock, setLock } = useContext(NotationContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      {Object.entries(techniques).map(([id, tech]) => {
        return (
          <button
            className={technique === id ? styles.btnToggled : styles.btn}
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
          setScrollPos(({ x, y }) => {
            if (x > 0) {
              return { x: --x, y: y };
            }
            return { x: x, y: y };
          })
        }
      >
        {"<"}
      </button>

      <button
        className={styles.btn}
        onClick={() =>
          setScrollPos(({ x, y }) => {
            if (x < limits.char - 3) {
              return { x: ++x, y: y };
            }
            return { x: x, y: y };
          })
        }
      >
        {">"}
      </button>

      <button
        className={styles.btn}
        onClick={() =>
          setScrollPos(({ x, y }) => {
            if (y > 0) {
              return { x: x, y: --y };
            }
            return { x: x, y: y };
          })
        }
      >
        {"up"}
      </button>

      <button
        className={styles.btn}
        onClick={() =>
          setScrollPos(({ x, y }) => {
            if (y < limits.staff) {
              return { x: x, y: ++y };
            }
            return { x: x, y: y };
          })
        }
      >
        {"down"}
      </button>

      <button className={styles.btn} onClick={() => toggleTheme()}>
        {theme}
      </button>
    </>
  );
}
