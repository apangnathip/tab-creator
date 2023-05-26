import { useContext } from "react";
import { NotationContext } from "../../contexts/NotationContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import styles from "./Controls.module.css";

type Mode = "unrestrict" | "stack" | "non-open";
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
  h: new Technique("Hammer-on", "non-open"),
  p: new Technique("Pull-off", "stack"),
  b: new Technique("Bend", "non-open"),
  r: new Technique("Release", "stack"),
  "~": new Technique("Vibrato", "unrestrict"),
  "/": new Technique("Slide Up", "stack"),
  "\\": new Technique("Slide Down", "stack"),
};

export function Controls() {
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
        onClick={() => setLock((currentState) => !currentState)}
      >
        lock
      </button>

      <button className={styles.btn} onClick={() => toggleTheme()}>
        {theme}
      </button>
    </>
  );
}
