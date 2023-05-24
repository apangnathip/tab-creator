import { useContext } from "react";
import { BoardContext } from "../contexts/BoardContext";
import styles from "./Scroller.module.css";

type ScrollerProps = {
  fontSize: { width: number; height: number };
  scrollPos: { x: number; y: number };
};

export function Scroller({ fontSize, scrollPos }: ScrollerProps) {
  const { board } = useContext(BoardContext);
  return (
    <div
      className={styles.root}
      style={{
        transform: `translate(${fontSize.width * (scrollPos.x + 1)}px, 0)`,
        width: fontSize.width,
        height: fontSize.height * board.stringCount,
      }}
    />
  );
}
