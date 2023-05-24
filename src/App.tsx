import { useState } from "react";
import { BoardProvider } from "./components/contexts/BoardContext";
import { NotationProvider } from "./components/contexts/NotationContext";
import { Controls, Fretboard, Toolbar } from "./components/toolbar";
import { Viewer, Tabsheet } from "./components/viewer";
import { Editor } from "./Editor";
import "./styles.css";

function App() {
  const [showFretboard, setShowFretboard] = useState(true);
  const [scrollPos, setScrollPos] = useState({ x: 0, y: 0, max: 0 });
  const [maxChar, setMaxChar] = useState(0);

  return (
    <>
      <BoardProvider>
        <NotationProvider>
          <Editor>
            <Toolbar>
              <Controls maxChar={maxChar} setScrollPos={setScrollPos} setShowFretboard={setShowFretboard} />
            </Toolbar>
            {showFretboard && <Fretboard />}
            <Viewer>
              <Tabsheet maxChar={maxChar} setMaxChar={setMaxChar} scrollPos={scrollPos} setScrollPos={setScrollPos} />
            </Viewer>
          </Editor>
        </NotationProvider>
      </BoardProvider>
    </>
  );
}

export default App;
