import { ReactNode, useState } from "react";
import styles from "./Sheet.module.css";

export function Sheet({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState("Untitled");

  return (
    <div className={styles.root}>
      <div className={styles.title}>{title}</div>
      {children}
    </div>
  );
}
