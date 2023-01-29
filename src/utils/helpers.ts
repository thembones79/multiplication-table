export type Pair = [number, number];

export const generateFactorsListForWorld = (world: number) => {
  let factors = [];
  for (let i = 2; i < 11; i++) {
    for (let j = 2; j < 11; j++) {
      if (i * j > world * 10) break;
      factors.push([i, j]);
    }
  }
  return factors as Pair[];
};

export const generateStats = () => {
  const keys = generateFactorsListForWorld(11);
  const stats = {};
  keys.forEach((key) => {
    //@ts-ignore
    stats[JSON.stringify(key)] = 0;
  });
  return stats;
};

export const getRandomIndex = (factors: Pair[]) =>
  Math.floor(Math.random() * factors.length);

export const removePair = (factors: Pair[], idx: number) => {
  const newFactors = [...factors];
  newFactors.splice(idx, 1);
  return newFactors;
};
