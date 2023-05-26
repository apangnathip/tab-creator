import { Controls, Fretboard, Toolbar } from "./components/toolbar";
import { Viewer, Staff } from "./components/viewer";
import { Sheet } from "./components/viewer/Sheet";
import styles from "./Editor.module.css";

export function Editor() {
  return (
    <div className={styles.root}>
      <Toolbar>
        <Controls />
      </Toolbar>
      <Fretboard />
      <Viewer>
        <Sheet>
          <Staff />
        </Sheet>
      </Viewer>
    </div>
  );
}
