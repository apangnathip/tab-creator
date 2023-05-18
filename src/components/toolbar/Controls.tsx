import { useContext } from "react";
import { NotationContext } from "../contexts/NotationContext";
import styles from "./Controls.module.css";

const techniques: { [name: string]: string } = {
  c: "Chord",
  h: "Hammer-on",
  p: "Pull-off",
  b: "Bend",
  r: "r",
  "/": "Slide",
  "~": "Vibrato",
  t: "Tap",
};

export function Controls() {
  const { setTechnique } = useContext(NotationContext);
  return (
    <div className={styles.root}>
      {Object.entries(techniques).map(([tech, desc]) => {
        return (
          <button value={tech} onClick={() => setTechnique(tech)} title={desc} key={tech}>
            {tech}
          </button>
        );
      })}
    </div>
  );
}
