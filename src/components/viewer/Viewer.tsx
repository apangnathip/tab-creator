import styles from "./Viewer.module.css";

export function Viewer({ children }: { children: React.ReactNode }) {
  return <div className={styles.root}>{children}</div>;
}
