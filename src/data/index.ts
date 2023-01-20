import { create } from "../utils/storage";

export const data = {
  userName: create<string>("USER_NAME"),
  question: create<number>("QUESTION"),
  factors: create<[number, number][]>("FACTORS"),
  score: create<number>("SCORE"),
  pickedIndex: create<number>("PICKED_INDEX"),
  level: create<number>("LEVEL"),
  world: create<number>("WORLD"),
  allQuestionsCount: create<number>("ALL_QUESTIONS_COUNT"),
  errors: create<number>("ERRORS"),
  idx: create<number>("IDX"),
};
