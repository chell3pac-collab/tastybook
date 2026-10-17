import React from 'react';
import { useFavorites } from '../context/FavoritesContext.jsx';

export default function FavoriteButton({ meal }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(meal.idMeal);

  return (
    <button
      type="button"
      className={`favorite-button${active ? ' favorite-button--active' : ''}`}
      onClick={() => toggleFavorite(meal)}
      aria-pressed={active}
      aria-label={active ? 'Убрать из избранного' : 'Добавить в избранное'}
    >
      <span aria-hidden="true">{active ? '♥' : '♡'}</span>
    </button>
  );
}
