import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import axios from 'axios';
import {
  WeatherContextType,
  ProviderPropsType,
  DayType,
  WeatherDayDataType,
} from '../types/types';
import getWeeklyData from '../utils/getWeeklyData';
import CityContext from './CityContext';

const WeatherContext = createContext<WeatherContextType>({
  infoData: {},
  dailyData: [],
  weeklyData: [],
  modalData: [],
  hasError: false,
  isDataReady: false,
  loading: false,
  titleCity: '',
  setCity: () => {},
});

export function WeatherProvider({ children }: ProviderPropsType) {
  const { city, setCity } = useContext(CityContext);

  const [infoData, setInfoData] = useState<object>({});
  const [dailyData, setDailyData] = useState<{ dt: number }[]>([]);
  const [weeklyData, setWeeklyData] = useState<DayType[]>([]);
  const [modalData, setModalData] = useState<WeatherDayDataType[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isDataReady, setIsDataReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [titleCity, setTitleCity] = useState<string>(city);

  const apiKey = import.meta.env.VITE_PUBLIC_WEATHER_API_KEY;

  const fetchWeatherData = useCallback(
    async (lat: number, lon: number) => {
      try {
        setLoading(true);
        setHasError(false);
        setIsDataReady(false);

        const [responseCurrent, responseWeekly] = await Promise.all([
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`
          ),
          axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`
          ),
        ]);

        const todayFilteredData = responseWeekly.data.list.slice(0, 8);
        const weeklyFilteredData = getWeeklyData(responseWeekly.data.list);

        setInfoData(responseCurrent.data);
        setDailyData(todayFilteredData);
        setWeeklyData(weeklyFilteredData);
        setModalData(responseWeekly.data.list);
        setTitleCity(city);

        setTimeout(() => {
          setIsDataReady(true);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setHasError(true);
        setInfoData({});
        setDailyData([]);
        setWeeklyData([]);
        setModalData([]);
        setLoading(false);
      }
    },
    [apiKey, city]
  );

  const fetchLatLonForCity = useCallback(
    async (cityName: string) => {
      try {
        setLoading(true);
        setHasError(false);
        setIsDataReady(false);

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
        );
        const { lat, lon } = response.data.coord;
        fetchWeatherData(lat, lon);
      } catch (error) {
        setHasError(true);
        setInfoData({});
        setDailyData([]);
        setWeeklyData([]);
        setModalData([]);
        setLoading(false);
      }
    },
    [fetchWeatherData, apiKey]
  );

  useEffect(() => {
    if (city) {
      fetchLatLonForCity(city);
    }
  }, [city, fetchLatLonForCity]);

  const value = useMemo(
    () => ({
      infoData,
      dailyData,
      weeklyData,
      modalData,
      hasError,
      isDataReady,
      loading,
      titleCity,
      setTitleCity,
      city,
      setCity,
    }),
    [
      infoData,
      dailyData,
      weeklyData,
      modalData,
      hasError,
      isDataReady,
      loading,
      titleCity,
      city,
      setCity,
    ]
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}

export default WeatherContext;
