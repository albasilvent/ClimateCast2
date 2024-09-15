function getWeeklyData(list: object[]) {
  const groupedByDate = list.reduce((acc: any, item: any) => {
    const date = item.dt_txt.split(' ')[0];

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(item);

    return acc;
  }, {});

  const weeklyData = Object.keys(groupedByDate)
    .map((date) => {
      const items = groupedByDate[date];

      const max = Math.max(...items.map((item: any) => item.main.temp_max));
      const min = Math.min(...items.map((item: any) => item.main.temp_min));

      const itemAt18 = items.find((item: any) => item.dt_txt.includes('18:00'));

      if (!itemAt18) {
        return null;
      }

      return {
        ...itemAt18,
        main: {
          ...itemAt18.main,
          temp_max: max,
          temp_min: min,
        },
      };
    })
    .filter((item: any) => item !== null);

  return weeklyData.slice(0, 5);
}

export default getWeeklyData;
