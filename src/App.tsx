import { useEffect, useState, useRef, FormEvent, ChangeEvent } from "react";
import { Stats } from "./components/Stats";
import { BossBattlePage } from "./pages/BossBattlePage";
import { BarPanel } from "./components/BarPanel";
import { data } from "./data";
import {
  Pair,
  generateFactorsListForWorld,
  generateStats,
  getRandomIndex,
  removePair,
  numberFormatter,
} from "./utils/helpers";
import "./App.scss";

export const App = () => {
  const MAX = 10;
  const [userName, setUserName] = useState(data.userName.get() || "");
  const [question, setQuestion] = useState(data.question.get() || 1);
  const [answer, setAnswer] = useState("");
  const [level, setLevel] = useState(data.level.get() || 1);
  const [world, setWorld] = useState(data.world.get() || 1);
  const [score, setScore] = useState(data.score.get() || 0);
  const [rebirths, setRebirths] = useState(data.rebirths.get() || 0);
  const [errors, setErrors] = useState(data.errors.get() || 0);
  const [factors, setFactors] = useState<Pair[]>(
    data.factors.get() || generateFactorsListForWorld(world || 1)
  );
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState("fade1");
  const [hint, setHint] = useState("trans");
  const [scale, setScale] = useState("scale");
  const [poo, setPoo] = useState("");
  const showEffects = !scale || poo ? "flex" : "none";
  const [stats, setStats] = useState(data.stats.get() || generateStats());
  const [showStats, setShowStats] = useState(false);
  const pair = factors[idx];
  const [a, b] = pair;
  const result = pair ? a * b : 0;
  const points = 10 ** world * level * 2 ** rebirths;
  const shouldRegenerateList = factors.length === 1;
  const shouldRebirth = factors.length === 1;
  const shouldIncrementLevel = question > MAX;
  const shouldResetQuestion = question > MAX;
  const shouldIncrementWorld = level > MAX;
  const shouldResetLevel = level > MAX;
  const shouldShowBossBattle = world > MAX;
  const shouldResetBossBattle = shouldShowBossBattle && errors > 0;
  const shouldShowWelcome = !userName;
  const isCorrect = Number(answer) === result;
  const isEmpty = answer === "";
  const userNameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    userNameInput.current?.focus();
  }, []);

  useEffect(() => {
    !shouldShowBossBattle && shouldRegenerateList && regenerateList();
  }, [factors]);

  useEffect(() => {
    data.stats.set(stats);
  }, [stats]);

  useEffect(() => {
    shouldIncrementLevel && incrementLevel();
    shouldResetLevel && resetLevel();
    shouldResetQuestion && resetQuestion();
    shouldResetQuestion && resetErrors();
    shouldIncrementWorld && incrementWorld();
  }, [question]);

  useEffect(() => {
    shouldShowBossBattle && generateBossQuestions();
  }, [shouldShowBossBattle]);

  useEffect(() => {
    shouldResetBossBattle && resetBossBattle();
  }, [shouldResetBossBattle]);

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

  const generateBossQuestions = () => {
    const table = Object.entries(stats);
    const mostDifficult: Pair[] = table
      .filter((row) => row[1] > 0)
      //@ts-ignore
      .sort((a, b) => b[1] - a[1])
      .map((x) => JSON.parse(x[0]))
      .slice(0, 10);
    const newFactors = mostDifficult || generateFactorsListForWorld(10);
    data.factors.set(newFactors);
    setFactors(newFactors);
    pickNewQuestion(newFactors);
  };

  const resetBossBattle = () => {
    generateBossQuestions();
    resetErrors();
    resetQuestion();
  };

  const addQuadrupledWrongAnswer = () => {
    const newFactors = [...factors, pair, pair];
    data.factors.set(newFactors);
    setFactors(newFactors);
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

  const incrementRebirths = () => {
    data.rebirths.set(rebirths + 1);
    setRebirths((rebirths) => rebirths + 1);
  };

  const resetErrors = () => {
    data.errors.set(0);
    setErrors(0);
  };

  const resetQuestion = () => {
    data.question.set(1);
    setQuestion(1);
  };

  const resetLevel = () => {
    data.level.set(1);
    setLevel(1);
  };

  const saveName = (name: string) => {
    data.userName.set(name);
    setUserName(name);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAnswer(value);
    hideHint();
  };

  const inputName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    saveName(value);
  };

  const resetFade = () => setFade("fade1");

  const showHint = () => setHint("");

  const hideHint = () => setHint("trans");

  const hidePoo = () => setPoo("");

  const showPoo = () => setPoo("boom");

  const enlarge = () => setScale("");

  const shrink = () => {
    setFade("");
    setScale("scale");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    moveForward();
  };

  const sendName = (e: FormEvent) => {
    e.preventDefault();
    userNameInput.current?.blur();
  };

  const addErrorToStats = () => {
    const key = JSON.stringify(pair);
    setStats((stats) => {
      return { ...stats, [key]: stats[key as keyof typeof stats] + 1 };
    });
  };

  const rebirth = () => {
    resetQuestion();
    resetLevel();
    resetErrors();
    const newFactors = generateFactorsListForWorld(10);
    data.factors.set(newFactors);
    setFactors(newFactors);
    data.world.set(10);
    setWorld(10);
    incrementRebirths();
  };

  const moveForward = () => {
    if (isEmpty) return;
    if (isCorrect) {
      incrementQuestionNumber();
      removeQuestion();
      incrementScore();
      resetFade();
      hideHint();
      enlarge();
      shouldRebirth && rebirth();
    } else {
      incrementErrors();
      addQuadrupledWrongAnswer();
      showHint();
      showPoo();
      addErrorToStats();
    }
    setAnswer("");
  };

  if (showStats) {
    return (
      <Stats
        onClose={() => {
          setShowStats(false);
        }}
      />
    );
  } else if (shouldShowWelcome) {
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
  } else if (shouldShowBossBattle) {
    return (
      <div>
        <BossBattlePage
          factors={factors}
          onSubmit={onSubmit}
          shrink={shrink}
          fade={fade}
          pair={pair}
          a={a}
          b={b}
          answer={answer}
          onChange={onChange}
          score={score}
          showEffects={showEffects}
          scale={scale}
          rebirths={rebirths}
          points={points}
          hidePoo={hidePoo}
          poo={poo}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h1>
          Hej,{" "}
          <span onClick={() => setShowStats(true)} className="floatingTitle">
            {userName}
          </span>
          , a ile to jest...?
        </h1>
        <form onSubmit={onSubmit}>
          <span onAnimationEnd={shrink} className={"big-txt " + fade}>
            {pair ? `${a} x ${b} = ` : ""}
          </span>
          <input
            autoFocus
            className="big-txt"
            type="number"
            value={answer}
            onChange={onChange}
          />
          <div onAnimationEnd={hideHint} className={"error " + hint}>
            Prawidłowa odpowiedź to: <span className="fat">{result}</span>
          </div>
        </form>
        <BarPanel max={MAX} question={question} level={level} world={world} />
        <h1>
          Punkty: <span className="blue">{numberFormatter(score)}</span>
          {errors > 0 && (
            <span>
              <span>{`   Błędy: `}</span>
              <span className="error">{errors}</span>
            </span>
          )}
        </h1>
        {!!rebirths && (
          <h2>
            Odrodzenia: <span className="blue">{rebirths}</span> (wszystko{" "}
            <span className="blue">x{2 ** rebirths}</span>)
          </h2>
        )}
        <div style={{ display: showEffects }} className="points__wrapper">
          <div className={`points ${fade} ${scale}`}>
            +{numberFormatter(points)}
          </div>
          <div onAnimationEnd={hidePoo} className={`poo ${poo}`}>
            💩
          </div>
        </div>
      </div>
    );
  }
};
export default App;
