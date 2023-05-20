import { useContext } from "react";
import { NotationContext } from "../contexts/NotationContext";
import styles from "./Controls.module.css";

type Mode = "unrestrict" | "slide" | "stack" | "higher" | "chord" | "external";
type TechniqueRecord = { [id: string]: Technique };

class Technique {
  desc: string;
  mode: Mode;

  constructor(desc: string, mode: Mode) {
    this.desc = desc;
    this.mode = mode;
  }
}

export const techniques: TechniqueRecord = {
  c: new Technique("Chord", "chord"),
  h: new Technique("Hammer-on", "stack"),
  p: new Technique("Pull-off", "stack"),
  b: new Technique("Bend", "higher"),
  r: new Technique("Release", "stack"),
  "/": new Technique("Slide Up", "stack"),
  "\\": new Technique("Slide Down", "stack"),
  "~": new Technique("Vibrato", "unrestrict"),
  t: new Technique("Tap", "external"),
};

export function Controls() {
  const { technique, setTechnique } = useContext(NotationContext);
  return (
    <div className={styles.root}>
      {Object.entries(techniques).map(([id, tech]) => {
        if (technique === id) {
        }
        return (
          <button
            className={technique == id ? styles.btnActive : styles.btn}
            value={id}
            onClick={() => setTechnique(id)}
            title={tech.desc}
            key={id}
          >
            {id}
          </button>
        );
      })}
    </div>
  );
}
