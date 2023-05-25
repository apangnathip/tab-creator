import { useEffect, useState } from "react";

export type Dimension = [number, number];

export function useResize(ref: React.RefObject<HTMLElement>) {
  const [dimension, setDimension] = useState([0, 0] satisfies Dimension);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setDimension([ref.current.clientWidth, ref.current.clientHeight]);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return dimension;
}
