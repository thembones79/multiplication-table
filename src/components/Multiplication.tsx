import { useState } from "react";

const generateFactorsListForLevel = (level: number) => {
  let factors = [];
  for (let i = 2; i < 11; i++) {
    for (let j = 2; j < 11; j++) {
      if (i * j > level * 10) break;
      factors.push([i, j]);
    }
  }
  return factors as [number, number][];
};

const getRandomIndex = (factors: [number, number][]) =>
  Math.floor(Math.random() * factors.length);

const removePair = (factors: [number, number][], idx: number) => {
  const newFactors = [...factors];
  newFactors.splice(idx, 1);
  return newFactors;
};
export const Multiplication = () => {
  const [factors, setFactors] = useState<[number, number][]>(
    generateFactorsListForLevel(1)
  );
  const idx = getRandomIndex(factors);
  const onClick = () => setFactors((factors) => removePair(factors, idx));
  return (
    <div>
      <span>5 x 5</span>
      <input type="number" />
      <div>{JSON.stringify(factors)}</div>
      <div> x      {JSON.stringify(factors[idx])}</div>
      <div>
        <button onClick={onClick}>Remove</button>
      </div>
    </div>
  );
};
