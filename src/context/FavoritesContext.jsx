import React from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadFavorites, saveFavorites, isMealSummary } from '../lib/favorites.js';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  // Ленивая инициализация: localStorage читается один раз при старте
  const [favorites, setFavorites] = useState(() => loadFavorites());

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const contextValue = useMemo(
    () => ({
      favorites,
      isFavorite: (mealId) => favorites.some((item) => item.idMeal === mealId),
      toggleFavorite: (meal) => {
        setFavorites((prevFavorites) => {
          if (!isMealSummary(meal)) {
            return prevFavorites;
          }

          const alreadySaved = prevFavorites.some((item) => item.idMeal === meal.idMeal);
          return alreadySaved
            ? prevFavorites.filter((item) => item.idMeal !== meal.idMeal)
            : [meal, ...prevFavorites];
        });
      },
    }),
    [favorites]
  );

  return <FavoritesContext.Provider value={contextValue}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites можно использовать только внутри FavoritesProvider');
  }
  return context;
}
