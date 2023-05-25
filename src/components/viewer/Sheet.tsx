import { ReactNode } from "react";
import styles from "./Sheet.module.css";
import { Header } from "./Header";

export function Sheet({ children }: { children: ReactNode }) {
  return (
    <div className={styles.root}>
      <Header />
      {children}
    </div>
  );
}
