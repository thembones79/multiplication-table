interface BarProps {
  value: number;
  max: number;
  color: string;
  label: string;
}
export const Bar = ({ value, max, color, label }: BarProps) => {
  const labelStyle = {
    color,
    fontWeight: 900,
    fontSize: "1.1em",
  };
  const scale = 4;
  const width = scale + "vw";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#7979791c",
          width,
          height: `${scale * max}vh`,
          margin: "1vw",
          borderRadius: width,
          minWidth: "40px",
          display: "flex",
          alignItems: "flex-end",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: color,
            width,
            height: `${scale * value}vh`,
            borderRadius: width,
            minWidth: "40px",
            transition: "3s",
            boxShadow: `0px 0px 13px 2px ${color}`,
          }}
        ></div>
      </div>
      <div>
        <div style={labelStyle}>{label}</div>
        <div>
          <span style={labelStyle}>{value}</span>
          <span>{` z `}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
};
