import { ReactNode } from 'react';

type InfoDataType = {
  main: {
    temp_max: number;
    temp_min: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  rain?: {
    '1h': number;
  };
  clouds: {
    all: number;
  };
};

// EXPORTED TYPES

export type DayType = {
  dt: number;
  weather: { main: string }[];
  main: {
    temp_max: number;
    temp_min: number;
  };
};

export type ProviderPropsType = {
  children: ReactNode;
};

export type CityContextType = {
  city: string;
  setCity: (city: string) => void;
};

export type FavoriteContextType = {
  favoritesList: string[];
  addFavorite: (city: string) => void;
  removeFavorite: (city: string) => void;
};

export type WeatherContextType = {
  infoData: object;
  dailyData: { dt: number }[];
  weeklyData: DayType[];
  hasError: boolean;
  modalData: WeatherDayDataType[];
  isDataReady: boolean;
  loading: boolean;
  titleCity: string;
  setCity: (city: string) => void;
};

export type HeaderPropsType = {
  scrollToTop: () => void;
};

export type FormDataType = {
  name: string;
  surname: string;
  birthdate: string;
  city: string;
  email: string;
  phone: string | number;
  [key: string]: string | number;
};

export type InfoSectionPropsType = {
  infoData: any;
  titleCity: string;
};

export type ConditionType = {
  icon: React.ElementType;
  label: string;
  data: string | number;
};

export type ConditionsPropsType = {
  infoData: InfoDataType;
};

export type DailySectionPropsType = {
  dailyData: { dt: number }[];
};

export type WeatherDayDataType = {
  dt: number;
};

export type WeeklySectionPropsType = {
  weeklyData: DayType[];
  modalData: WeatherDayDataType[];
};
