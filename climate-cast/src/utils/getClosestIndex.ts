const getClosestIndex = (dailyData: { dt: number }[]) => {
  const now = new Date();
  const currentTimestamp = now.getTime() / 1000;

  const closestIndex = dailyData.reduce(
    (closest: number, interval: { dt: number }, index: number) => {
      const intervalTime = interval.dt;
      const closestTime = dailyData[closest].dt;

      return Math.abs(intervalTime - currentTimestamp) <
        Math.abs(closestTime - currentTimestamp)
        ? index
        : closest;
    },
    0
  );

  return closestIndex;
};

export default getClosestIndex;
