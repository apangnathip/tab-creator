import { Controls } from "./Controls";
import { Fretboard } from "./Fretboard";
import styles from "./Toolbar.module.css";

export function Toolbar() {
  return (
    <div className={styles.root}>
      <Controls />
      <Fretboard />
    </div>
  );
}
