import { useState } from "react";
import { Controls, Fretboard, Toolbar } from "./components/toolbar";
import { Viewer, Staff } from "./components/viewer";
import { Sheet } from "./components/viewer/Sheet";
import styles from "./Editor.module.css";

export function Editor() {
  const [scrollPos, setScrollPos] = useState({ x: 0, y: 0 });
  const [limits, setLimits] = useState({ char: 0, staff: 0 });

  console.log(scrollPos);

  return (
    <div className={styles.root}>
      <Toolbar>
        <Controls limits={limits} setScrollPos={setScrollPos} />
      </Toolbar>
      <Fretboard />
      <Viewer>
        <Sheet>
          <Staff limits={limits} setLimits={setLimits} scrollPos={scrollPos} setScrollPos={setScrollPos} />
        </Sheet>
      </Viewer>
    </div>
  );
}
