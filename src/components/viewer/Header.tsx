import { useState } from "react";
import styles from "./Header.module.css";

export function Header() {
  const [title, setTitle] = useState("Untitled");

  return (
    <div className={styles.root}>
      <h1
        contentEditable="true"
        suppressContentEditableWarning={true}
        onBlur={(e) => {
          const newTitle = (e.target as HTMLElement).textContent;
          if (newTitle) {
            setTitle(newTitle);
          }
        }}
      >
        {title}
      </h1>
    </div>
  );
}
