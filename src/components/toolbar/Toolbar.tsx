import { ReactNode } from "react";
import styles from "./Toolbar.module.css";

export function Toolbar({ children }: { children: ReactNode }) {
  return <div className={styles.root}>{children}</div>;
}
