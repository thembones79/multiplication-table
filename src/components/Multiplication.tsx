import { useState, FormEvent, ChangeEvent } from "react";
import { data } from "../data";

type Pair = [number, number];
const generateFactorsListForLevel = (level: number) => {
  let factors = [];
  for (let i = 2; i < 11; i++) {
    for (let j = 2; j < 11; j++) {
      if (i * j > level * 10) break;
      factors.push([i, j]);
    }
  }
  return factors as Pair[];
};

const getRandomIndex = (factors: Pair[]) =>
  Math.floor(Math.random() * factors.length);

const removePair = (factors: Pair[], idx: number) => {
  const newFactors = [...factors];
  newFactors.splice(idx, 1);
  return newFactors;
};

const shouldRegenerateList = () => true;
const shouldRemovePair = () => true;
const shouldIncrementQuestion = () => true;
const shouldIncrementLevel = () => true;
const shouldIncrementWorld = () => true;

const result = (pair: Pair) => pair[0] * pair[1];
const isCorrect = (answer: number, result: number) => answer === result;

export const Multiplication = () => {
  const [question, setQuestion] = useState(data.question.get() || 1);
  const [answer, setAnswer] = useState("");
  const [level, setLevel] = useState(data.level.get() || 1);
  const [world, setWorld] = useState(data.world.get() || 1);
  const [errors, setErrors] = useState(data.errors.get() || 0);
  const [factors, setFactors] = useState<Pair[]>(
    generateFactorsListForLevel(level || 1)
  );
  const [idx, setIdx] = useState(getRandomIndex(factors));
  const pair = factors[idx];
  const removeQuestion = () =>
    setFactors((factors) => removePair(factors, idx));
  const pickNewQuestion = () => setIdx(getRandomIndex(factors));
  const incrementQuestionNumber = () => {
    data.question.set(question + 1);
    setQuestion((question) => question + 1);
  };
  const incrementErrors = () => {
    data.errors.set(errors + 1);
    setErrors((errors) => errors + 1);
  };
  const resetErrors = () => {
    data.errors.set(0);
    setErrors(0);
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
    moveForward();
  };
  const moveForward = () => {
    if (isCorrect(Number(answer), result(pair))) {
      incrementQuestionNumber();
      removeQuestion();
      pickNewQuestion();
    } else {
      incrementErrors();
    }
    setAnswer("");
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
        <button onClick={removeQuestion}>Remove</button>
      </div>
      <div>
        <button onClick={incrementQuestionNumber}>Increment</button>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
};
