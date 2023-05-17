const techniques: { [name: string]: string } = {
  c: "Chord",
  h: "Hammer-on",
  p: "Pull-off",
  b: "Bend",
  r: "r",
  "/": "Slide",
  "~": "Vibrato",
  t: "Tap",
};

type TechniquesProps = {
  setNotation: React.Dispatch<React.SetStateAction<string>>;
};

export const Controls = ({ setNotation }: TechniquesProps) => {
  return (
    <div id="techbar">
      {Object.entries(techniques).map(([tech, desc]) => {
        return (
          <button value={tech} onClick={() => setNotation(tech)} title={desc} key={tech}>
            {tech}
          </button>
        );
      })}
    </div>
  );
};
