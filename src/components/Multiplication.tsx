import { useState } from "react";

const generateFactorsForLevel = (level: number) => {
  let factors = [];
  for (let i = 2; i < 11; i++) {
    for (let j = 2; j < 11; j++) {
      if (i * j > level * 10) break;
      factors.push([i, j]);
    }
  }
  return factors;
};

const pickFactors = (factors: number[][]) => {
  const idx = Math.floor(Math.random() * factors.length);
  console.log(idx, factors.length, factors[idx])
  return factors[idx]
}

export const Multiplication = () => {
  const [factors, setFactors] = useState<number[][]>(generateFactorsForLevel(1));
  return (
    <div>
      <span>5 x 5</span>
      <input type="number" />
      <div>{JSON.stringify(factors)}</div>
      <div> x   {JSON.stringify(pickFactors(factors))}</div>
    </div>
  );
};
