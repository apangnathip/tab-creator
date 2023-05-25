import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { BoardProvider } from "./contexts/BoardContext";
import { NotationProvider } from "./contexts/NotationContext";
import { Editor } from "./Editor";
import "./App.css";
import "./themes.css";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme}>
      <BoardProvider>
        <NotationProvider>
          <Editor />
        </NotationProvider>
      </BoardProvider>
    </div>
  );
}

export default App;
