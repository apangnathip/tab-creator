import { Controls } from "./Controls";
import { Fretboard } from "./Fretboard";
import styles from "./Toolbar.module.css";

export function Toolbar({ children }: { children: React.ReactNode }) {
  return <div className={styles.root}>{children}</div>;
}
