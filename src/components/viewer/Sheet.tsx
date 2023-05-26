import { ReactNode } from "react";
import { Header } from "./Header";
import styles from "./Sheet.module.css";

export function Sheet({ children }: { children: ReactNode }) {
  return (
    <div className={styles.root}>
      <Header />
      {children}
    </div>
  );
}
