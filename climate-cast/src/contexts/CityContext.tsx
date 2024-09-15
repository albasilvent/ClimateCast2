import { createContext, useState, useEffect, useMemo } from 'react';
import { CityContextType, ProviderPropsType } from '../types/types';

const CityContext = createContext<CityContextType>({
  city: '',
  setCity: () => {},
});

export function CityProvider({ children }: ProviderPropsType) {
  const [city, setCity] = useState<string>(localStorage.getItem('city') || '');
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    const savedCity = localStorage.getItem('city');
    if (savedCity) {
      setCity(savedCity);
    }
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!isInitialLoad && city) {
      localStorage.setItem('city', city);
    }
  }, [city, isInitialLoad]);

  const value = useMemo(() => ({ city, setCity }), [city]);

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
}

export default CityContext;
