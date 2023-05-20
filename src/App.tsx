import { BoardProvider } from "./components/contexts/BoardContext";
import { NotationProvider } from "./components/contexts/NotationContext";
import { Controls, Fretboard, Toolbar } from "./components/toolbar";
import { Viewer, Tabsheet } from "./components/viewer";
import { Editor } from "./Editor";
import "./styles.css";

function App() {
  return (
    <>
      <BoardProvider>
        <NotationProvider>
          <Editor>
            <Toolbar>
              <Controls />
              <Fretboard />
            </Toolbar>
            <Viewer>
              <Tabsheet />
            </Viewer>
          </Editor>
        </NotationProvider>
      </BoardProvider>
    </>
  );
}

export default App;
