import { BoardProvider } from "./components/contexts/BoardContext";
import { NotationProvider } from "./components/contexts/NotationContext";
import { Toolbar } from "./components/toolbar";
import { Tabsheet } from "./components/tabsheet";
import "./styles.css";

function App() {
  return (
    <>
      <BoardProvider>
        <NotationProvider>
          <Toolbar />
          {/* <select
          value={boardProps.tuning}
          onChange={(e) =>
            setBoardProps((currBoardProps) => {
              return { ...currBoardProps, tuning: e.target.value };
            })
          }
        >
          <option value="E">Standard</option>
          <option value="Eb">Eb</option>
          <option value="Drop-D">Drop D</option>
        </select> */}
          <Tabsheet />
        </NotationProvider>
      </BoardProvider>
    </>
  );
}

export default App;
