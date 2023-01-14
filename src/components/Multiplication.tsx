import { useState, FormEvent, ChangeEvent } from "react";
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

const shouldRegenerateList = () => true;
const shouldRemovePair = () => true;
const shouldIncrementQuestion = () => true;
const shouldIncrementLevel = () => true;
const shouldIncrementWorld = () => true;

export const Multiplication = () => {
  const [question, setQuestion] = useState(data.question.get() || 1);
  const [answer, setAnswer] = useState("");
  const [level, setLevel] = useState(data.level.get() || 1);
  const [world, setWorld] = useState(data.world.get() || 1);
  const [factors, setFactors] = useState<[number, number][]>(
    generateFactorsListForLevel(level || 1)
  );
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
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAnswer(value);
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <div>
      <div>
        <span>Question {question}</span>
        <span>Level {level}</span>
        <span>World {world}</span>
      </div>
      <form onSubmit={onSubmit}>
        <span>5 x 5</span>
        <input type="number" value={answer} onChange={onChange} />
      </form>
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
