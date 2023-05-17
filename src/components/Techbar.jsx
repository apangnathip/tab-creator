const techniques = {
  c: "Chord",
  h: "Hammer-on",
  p: "Pull-off",
  b: "Bend",
  r: "r",
  "/": "Slide",
  "~": "Vibrato",
  t: "Tap",
};

export const Techbar = ({ notation, setNotation }) => {
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
