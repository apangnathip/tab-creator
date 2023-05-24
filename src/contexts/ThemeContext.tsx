import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeContext = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  toggleTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeContext);

function getTheme() {
  const theme = localStorage.getItem("theme");
  if (theme) {
    return theme as Theme;
  } else {
    localStorage.setItem("theme", "light");
    return "light" as Theme;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(getTheme());
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
