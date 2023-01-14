import { useState } from "react";
import { data } from "../data";

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
  const [question, setQuestion] = useState(data.question.get() || 1);
  const idx = getRandomIndex(factors);
  const onClick = () => setFactors((factors) => removePair(factors, idx));
  const onIncrement = () => {
    data.question.set(question + 1);
    setQuestion((question) => question + 1);
  };
  const onReset = () => {
    data.question.set(1);
    setQuestion(1);
  };
  return (
    <div>
      <div>
        <span>Question {question}</span>
      </div>
      <span>5 x 5</span>
      <input type="number" />
      <div>{JSON.stringify(factors)}</div>
      <div> x {JSON.stringify(factors[idx])}</div>
      <div>
        <button onClick={onClick}>Remove</button>
      </div>
      <div>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
};
