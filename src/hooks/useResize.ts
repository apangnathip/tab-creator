import { useEffect, useState } from "react";

type Dimension = {
  width: number;
  height: number;
};

export function useResize(ref: React.RefObject<HTMLElement>) {
  const [dimension, setDimension] = useState({
    width: 0,
    height: 0,
  } as Dimension);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setDimension({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return dimension;
}
