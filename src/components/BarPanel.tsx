import { Bar } from "./Bar";

interface BarPanelProps {
  max: number;
  question: number;
  level: number;
  world: number;
}

export const BarPanel = ({ max, question, level, world }: BarPanelProps) => {
  return (
    <div
      style={{
        display: "flex",
        margin: "6vh 0",
        justifyContent: "space-evenly",
      }}
    >
      <Bar max={max} value={question} color="orange" label="pytanie" />
      <Bar max={max} value={level} color="purple" label="poziom" />
      <Bar max={max} value={world} color="green" label="świat" />
    </div>
  );
};
