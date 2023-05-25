import { useState } from "react";
import { Controls, Fretboard, Toolbar } from "./components/toolbar";
import { Viewer, Staff } from "./components/viewer";
import { Sheet } from "./components/viewer/Sheet";
import styles from "./Editor.module.css";

export function Editor() {
  const [scrollPos, setScrollPos] = useState({ x: 0, y: 0, max: 0 });
  const [maxChar, setMaxChar] = useState(0);

  return (
    <div className={styles.root}>
      <Toolbar>
        <Controls maxChar={maxChar} setScrollPos={setScrollPos} />
      </Toolbar>
      <Fretboard />
      <Viewer>
        <Sheet>
          <Staff maxChar={maxChar} setMaxChar={setMaxChar} scrollPos={scrollPos} setScrollPos={setScrollPos} />
        </Sheet>
      </Viewer>
    </div>
  );
}
