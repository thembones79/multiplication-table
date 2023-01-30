import { FormEvent, ChangeEvent } from "react";
import { Pair, numberFormatter } from "../utils/helpers";
import leftArm from "../assets/left.png";
import rightArm from "../assets/right.png";
import dragon from "../assets/dragon.png";
import heart from "../assets/heart.png";

interface BossBattlePageProps {
  factors: Pair[];
  onSubmit: (e: FormEvent) => void;
  shrink: () => void;
  fade: string;
  pair: Pair;
  a: number;
  b: number;
  answer: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  score: number;
  showEffects: string;
  scale: string;
  points: number;
  rebirths: number;
  hidePoo: () => void;
  poo: string;
}

export const BossBattlePage = ({
  factors,
  onSubmit,
  shrink,
  fade,
  pair,
  a,
  b,
  answer,
  onChange,
  score,
  showEffects,
  rebirths,
  scale,
  points,
  hidePoo,
  poo,
}: BossBattlePageProps) => {
  const renderedHearts = factors.map((_, idx) => (
    <img key={idx} src={heart} className="heart" alt="heart" />
  ));
  return (
    <div>
      <div className="hearts">{renderedHearts}</div>
      <div className="dragon__canvas">
        <img src={leftArm} className="dragon__left-arm" alt="left arm" />
        <img src={rightArm} className="dragon__right-arm" alt="right arm" />
        <img src={dragon} className="dragon" alt="dragon" />
      </div>
      <div>
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
        </form>
        <h1>
          Punkty: <span className="blue">{numberFormatter(score)}</span>
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
    </div>
  );
};
