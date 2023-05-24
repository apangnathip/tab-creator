import { ReactNode } from "react";
import styles from "./Viewer.module.css";

export function Viewer({ children }: { children: ReactNode }) {
  return <div className={styles.root}>{children}</div>;
}
