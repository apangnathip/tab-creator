import { Dispatch, SetStateAction, useContext } from "react";
import { NotationContext } from "../../contexts/NotationContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import styles from "./Controls.module.css";

type ControlsProps = {
  maxChar: number;
  setScrollPos: Dispatch<SetStateAction<{ x: number; y: number; max: number }>>;
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

export function Controls({ maxChar, setScrollPos }: ControlsProps) {
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
          setScrollPos(({ x, ...other }) => {
            if (x! > 0) {
              return { x: --x, ...other };
            }
            return { x: x, ...other };
          })
        }
      >
        {"<"}
      </button>

      <button
        className={styles.btn}
        onClick={() =>
          setScrollPos(({ x, ...other }) => {
            if (x! < maxChar - 3) {
              return { x: ++x, ...other };
            }
            return { x: x, ...other };
          })
        }
      >
        {">"}
      </button>

      <button
        className={styles.btn}
        onClick={() =>
          setScrollPos(({ y, ...other }) => {
            if (y > 0) {
              return { y: --y, ...other };
            }
            return { y: y, ...other };
          })
        }
      >
        {"up"}
      </button>

      <button
        className={styles.btn}
        onClick={() =>
          setScrollPos(({ y, max, ...other }) => {
            if (y < max) {
              return { y: ++y, max: max, ...other };
            }
            return { y: y, max: max, ...other };
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
