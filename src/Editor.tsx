import styles from "./Editor.module.css";

export function Editor({ children }: { children: React.ReactNode }) {
  return <div className={styles.root}>{children}</div>;
}
