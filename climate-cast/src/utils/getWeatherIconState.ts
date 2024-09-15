const getWeatherIconState = (weatherMain: string, isNight: boolean) => {
  switch (weatherMain) {
    case 'Thunderstorm':
      return 'lightning';
    case 'Drizzle':
      return 'rainy';
    case 'Rain':
      return 'rainy';
    case 'Snow':
      return 'snowy';
    case 'Mist':
      return 'fog';
    case 'Clear':
      return isNight ? 'clear-night' : 'sunny';
    case 'Clouds':
      return isNight ? 'cloudy' : 'partlycloudy';
    default:
      return 'cloudy';
  }
};

export default getWeatherIconState;
