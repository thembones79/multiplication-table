import { useEffect, useState, useRef, FormEvent, ChangeEvent } from "react";
import { BarPanel } from "./components/BarPanel";
import { data } from "./data";
import "./App.scss";

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
  const MAX = 10;
  const [userName, setUserName] = useState(data.userName.get() || "");
  const [question, setQuestion] = useState(data.question.get() || 1);
  const [answer, setAnswer] = useState("");
  const [level, setLevel] = useState(data.level.get() || 1);
  const [world, setWorld] = useState(data.world.get() || 1);
  const [score, setScore] = useState(data.score.get() || 0);
  const [errors, setErrors] = useState(data.errors.get() || 0);
  const [factors, setFactors] = useState<Pair[]>(
    data.factors.get() || generateFactorsListForWorld(level || 1)
  );
  const [idx, setIdx] = useState(data.idx.get() || getRandomIndex(factors));
  const [fade, setFade] = useState("fade1");
  const pair = factors[idx];
  const [a, b] = pair;
  const result = pair ? a * b : 0;
  const points = 10 ** world * level;
  const shouldRegenerateList = factors.length === 1;
  const shouldIncrementLevel = question > MAX && errors === 0;
  const shouldResetQuestion = question > MAX;
  const shouldIncrementWorld = level > MAX;
  const shouldShowThankYou = world > MAX;
  const shouldShowWelcome = !userName;
  const isCorrect = Number(answer) === result;
  const userNameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    userNameInput.current?.focus();
  }, []);

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

  const incrementScore = () => {
    data.score.set(score + points);
    setScore((score) => score + points);
  };

  const decrementScore = () => {
    data.score.set(score - points);
    setScore((score) => score - points);
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

  const resetFade = () => setFade("fade1");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    moveForward();
  };

  const sendName = (e: FormEvent) => {
    e.preventDefault();
    userNameInput.current?.blur();
  };

  const moveForward = () => {
    if (isCorrect) {
      incrementQuestionNumber();
      removeQuestion();
      incrementScore();
      resetFade();
    } else {
      incrementErrors();
      decrementScore();
    }
    setAnswer("");
  };

  if (shouldShowWelcome) {
    return (
      <form onSubmit={sendName}>
        <h1>Wpisz swoje imię: </h1>
        <input
          className="big-txt"
          type="text"
          onBlur={inputName}
          ref={userNameInput}
        />
      </form>
    );
  } else if (shouldShowThankYou) {
    return <div>Thank You</div>;
  } else {
    return (
      <div>
        <h1>
          Hej, <span className="floatingTitle">{userName}</span>, a ile to
          jest...?
        </h1>
        <form onSubmit={onSubmit}>
          <span
            onAnimationEnd={() => setFade("")}
            className={"big-txt " + fade}
          >
            {pair ? `${a} x ${b} = ` : ""}
          </span>
          <input
            autoFocus
            className="big-txt"
            type="number"
            value={answer}
            onChange={onChange}
          />
          {/* <div className={question % 2 === 0 ? "hint" : "diff"}>Hint :)</div> */}
        </form>
        <BarPanel max={MAX} question={question} level={level} world={world} />
        <h1>
          Punkty: <span className="blue">{score}</span>
        </h1>
      </div>
    );
  }
};
export default App;
