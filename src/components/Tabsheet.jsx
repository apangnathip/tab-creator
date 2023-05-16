// "[1:5,-,3:7,-,3:5,-,3:7,-,-,3:5,3:7,-,1:8,-,1:5]"
// 4:0,4:h2,3:0,3:h2,3:0h2,5:0,4:2,1:0-2:1-3:2-4:2-5:0,=,=,=,=,1:0-2:1-3:2-4:2,2:1,2:h3,2:p1,2:p0,2:h1

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
