import { BoardProvider } from "./components/contexts/BoardContext";
import { NotationProvider } from "./components/contexts/NotationContext";
import { Controls, Fretboard, Toolbar } from "./components/toolbar";
import { Tabsheet } from "./components/tabsheet";
import "./styles.css";

function App() {
  return (
    <>
      <BoardProvider>
        <NotationProvider>
          <Toolbar>
            <Controls />
            <Fretboard />
          </Toolbar>
          <Tabsheet />
        </NotationProvider>
      </BoardProvider>
    </>
  );
}

export default App;
