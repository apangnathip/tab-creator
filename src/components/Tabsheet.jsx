// "[1:5,-,3:7,-,3:5,-,3:7,-,-,3:5,3:7,-,1:8,-,1:5]"

export const Tabsheet = ({ lines }) => {
  const [width, height] = [500, 200];

  function renderLine(currLine, index) {
    return (
      <text y={index * 20} key={index}>
        {currLine}
      </text>
    );
  }

  return (
    <div>
      <svg width={width} height={height}>
        {lines.map((line, i) => renderLine(line, i))}
      </svg>
    </div>
  );
};
