import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton.jsx';

export default function RecipeCard({ meal }) {
  const summary = {
    idMeal: meal.idMeal,
    strMeal: meal.strMeal,
    strMealThumb: meal.strMealThumb,
    strCategory: meal.strCategory ?? '',
  };

  return (
    <article className="recipe-card">
      <Link to={`/recipes/${meal.idMeal}`} className="recipe-card__link">
        <img
          className="recipe-card__image"
          src={meal.strMealThumb}
          alt={meal.strMeal}
          loading="lazy"
          width={320}
          height={240}
        />
        <div className="recipe-card__body">
          <h3 className="recipe-card__title">{meal.strMeal}</h3>
          {summary.strCategory && <p className="recipe-card__meta">{summary.strCategory}</p>}
        </div>
      </Link>
      <FavoriteButton meal={summary} />
    </article>
  );
}
