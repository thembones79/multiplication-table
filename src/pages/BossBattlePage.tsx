import leftArm from "../assets/left.png";
import rightArm from "../assets/right.png";
import dragon from "../assets/dragon.png";
import heart from "../assets/heart.png";

export const BossBattlePage = () => {
  return (
    <div>
      <div className="hearts">
        <img src={heart} className="heart" alt="heart" />
        <img src={heart} className="heart" alt="heart" />
        <img src={heart} className="heart" alt="heart" />
        <img src={heart} className="heart" alt="heart" />
        <img src={heart} className="heart" alt="heart" />
        <img src={heart} className="heart" alt="heart" />
        <img src={heart} className="heart" alt="heart" />
        <img src={heart} className="heart" alt="heart" />
        <img src={heart} className="heart" alt="heart" />
        <img src={heart} className="heart" alt="heart" />
      </div>
      <div className="dragon__canvas">
        <img src={leftArm} className="dragon__left-arm" alt="left arm" />
        <img src={rightArm} className="dragon__right-arm" alt="right arm" />
        <img src={dragon} className="dragon" alt="dragon" />
      </div>
    </div>
  );
};
