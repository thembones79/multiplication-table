import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { data } from "./data";
import "./App.css";

type Pair = [number, number];
const generateFactorsListForWorld = (world: number) => {
  let factors = [];
  for (let i = 2; i < 11; i++) {
    for (let j = 2; j < 11; j++) {
      if (i * j > world * 10) break;
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

export const App = () => {
  const [userName, setUserName] = useState(data.userName.get() || "");
  const [question, setQuestion] = useState(data.question.get() || 1);
  const [answer, setAnswer] = useState("");
  const [level, setLevel] = useState(data.level.get() || 1);
  const [world, setWorld] = useState(data.world.get() || 1);
  const [errors, setErrors] = useState(data.errors.get() || 0);
  const [factors, setFactors] = useState<Pair[]>(
    data.factors.get() || generateFactorsListForWorld(level || 1)
  );
  const [idx, setIdx] = useState(data.idx.get() || getRandomIndex(factors));
  const pair = factors[idx];
  const [a, b] = pair;
  const result = pair ? a * b : 0;
  const shouldRegenerateList = factors.length === 1;
  const shouldIncrementLevel = question > 10 && errors === 0;
  const shouldResetQuestion = question > 10;
  const shouldIncrementWorld = level > 10;
  const shouldShowThankYou = world > 10;
  const shouldShowWelcome = !userName;
  const isCorrect = Number(answer) === result;

  useEffect(() => {
    shouldRegenerateList && regenerateList();
  }, [factors]);

  useEffect(() => {
    shouldIncrementLevel && incrementLevel();
    shouldResetQuestion && resetQuestion();
    shouldResetQuestion && resetErrors();
  }, [question]);

  useEffect(() => {
    shouldIncrementWorld && incrementWorld();
  }, [level]);

  const regenerateList = () => {
    const newFactors = generateFactorsListForWorld(world);
    data.factors.set(newFactors);
    setFactors(newFactors);
  };

  const removeQuestion = () => {
    const newFactors = removePair(factors, idx);
    data.factors.set(newFactors);
    setFactors(newFactors);
    pickNewQuestion(newFactors);
  };

  const pickNewQuestion = (factors: Pair[]) => {
    const newIdx = getRandomIndex(factors);
    data.idx.set(newIdx);
    setIdx(newIdx);
  };

  const incrementQuestionNumber = () => {
    data.question.set(question + 1);
    setQuestion((question) => question + 1);
  };

  const incrementErrors = () => {
    data.errors.set(errors + 1);
    setErrors((errors) => errors + 1);
  };

  const incrementLevel = () => {
    data.level.set(level + 1);
    setLevel((level) => level + 1);
  };

  const incrementWorld = () => {
    data.world.set(world + 1);
    setWorld((world) => world + 1);
  };

  const resetErrors = () => {
    data.errors.set(0);
    setErrors(0);
  };

  const resetQuestion = () => {
    data.question.set(1);
    setQuestion(1);
  };

  const saveName = (name: string) => {
    data.userName.set(name);
    setUserName(name);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAnswer(value);
  };

  const inputName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    saveName(value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    moveForward();
  };

  const sendName = (e: FormEvent) => {
    e.preventDefault();
  };

  const moveForward = () => {
    if (isCorrect) {
      incrementQuestionNumber();
      removeQuestion();
    } else {
      incrementErrors();
    }
    setAnswer("");
  };

  if (shouldShowWelcome) {
    return (
      <form>
        <span>Wpisz swoje imię: </span>
        <input type="text" onBlur={inputName} />
      </form>
    );
  } else if (shouldShowThankYou) {
    return <div>Thank You</div>;
  } else {
    return (
      <div>
        <h1>Hej, {userName}, a ile to jest...?</h1>
        <div>
          <span>Question {question}</span>
          <span>Level {level}</span>
          <span>World {world}</span>
        </div>
        <form onSubmit={onSubmit}>
          <span>{pair ? `${a} x ${b} = ` : ""}</span>
          <input type="number" value={answer} onChange={onChange} />
        </form>
        <div>{JSON.stringify(factors)}</div>
        <div>
          <button onClick={() => localStorage.clear()}>Reset</button>
        </div>
        <div>Errors: {errors}</div>
      </div>
    );
  }
};
export default App;
