import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext.jsx';
import RecipeGrid from '../components/RecipeGrid.jsx';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <section className="page-block" aria-labelledby="favorites-heading">
      <h1 className="page-title" id="favorites-heading">
        Избранное
      </h1>

      {favorites.length === 0 ? (
        <div className="status-box">
          <span className="status-box__emoji" aria-hidden="true">
            🤍
          </span>
          <p className="status-box__text">
            Пока пусто. Нажимай на сердечко на карточке рецепта — он появится здесь.
          </p>
          <Link to="/recipes" className="status-box__button">
            К рецептам
          </Link>
        </div>
      ) : (
        <RecipeGrid meals={favorites} />
      )}
    </section>
  );
}
