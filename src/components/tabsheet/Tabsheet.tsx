// "[1:5,-,3:7,-,3:5,-,3:7,-,-,3:5,3:7,-,1:8,-,1:5]"
// 4:0,4:h2,3:0,3:h2,3:0h2,5:0,4:2,1:0-2:1-3:2-4:2-5:0,=,=,=,=,1:0-2:1-3:2-4:2,2:1,2:h3,2:p1,2:p0,2:h1

import { useEffect, useState } from "react";
import { BoardProps } from "../../App";

interface TabsheetProps {
  boardProps: BoardProps;
  notation: string;
}

const readNotation = (boardProps: BoardProps, notation: string) => {
  let rest = "-".repeat(1);
  let lines = Array(boardProps.stringCount).fill("|");
  let nt = notation.split(",");

  for (let i = 0; i < nt.length - 1; i++) {
    let [string, fret] = nt[i].split(":");

    for (let j = 0; j < boardProps.stringCount; j++) {
      lines[j] += rest;
      lines[j] += j == parseInt(string) - 1 ? fret : "-".repeat(fret.length);
    }
  }

  return lines;
};

export const Tabsheet = ({ boardProps, notation }: TabsheetProps) => {
  const [asciiTab, setAsciiTab] = useState([] as Array<string>);

  useEffect(() => {
    setAsciiTab(readNotation(boardProps, notation));
  }, [notation]);

  return (
    <>
      {asciiTab.map((line, i) => (
        <div style={{ fontFamily: "Monospace" }} key={i}>
          {line}
        </div>
      ))}
      {notation}
    </>
  );
};
