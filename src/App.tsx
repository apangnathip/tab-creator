import { useContext, useState } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { BoardProvider } from "./contexts/BoardContext";
import { NotationProvider } from "./contexts/NotationContext";
import { Controls, Fretboard, Toolbar } from "./components/toolbar";
import { Viewer, Tabsheet } from "./components/viewer";
import { Editor } from "./Editor";
import "./App.css";
import "./themes.css";

function App() {
  const { theme } = useContext(ThemeContext);
  const [showFretboard, setShowFretboard] = useState(true);
  const [scrollPos, setScrollPos] = useState({ x: 0, y: 0, max: 0 });
  const [maxChar, setMaxChar] = useState(0);

  return (
    <div className={theme}>
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
    </div>
  );
}

export default App;
