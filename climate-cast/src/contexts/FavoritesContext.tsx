import { createContext, useState, useEffect, useMemo } from 'react';
import { FavoriteContextType, ProviderPropsType } from '../types/types';

const FavoriteContext = createContext<FavoriteContextType>({
  favoritesList: [''],
  addFavorite: () => {},
  removeFavorite: () => {},
});

export function FavoriteProvider({ children }: ProviderPropsType) {
  const [favoritesList, setFavoritesList] = useState<string[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoritesList');
    if (savedFavorites) {
      setFavoritesList(JSON.parse(savedFavorites));
    }
  }, []);

  const addFavorite = (city: string) => {
    setFavoritesList((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, city];
      localStorage.setItem('favoritesList', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const removeFavorite = (city: string) => {
    setFavoritesList((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((fav) => fav !== city);
      localStorage.setItem('favoritesList', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const value = useMemo(
    () => ({
      favoritesList,
      addFavorite,
      removeFavorite,
    }),
    [favoritesList]
  );

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export default FavoriteContext;
