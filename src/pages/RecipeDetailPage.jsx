import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch.js';
import { fetchMealById, extractIngredients, splitInstructions } from '../lib/api.js';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import EmptyState from '../components/EmptyState.jsx';
import FavoriteButton from '../components/FavoriteButton.jsx';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [attempt, setAttempt] = useState(0);

  const { status, data: meal } = useFetch((signal) => fetchMealById(id, signal), [id, attempt]);

  const tags = (meal?.strTags ?? '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  return (
    <article className="recipe-detail">
      <Link to="/recipes" className="recipe-detail__back">
        ← Ко всем рецептам
      </Link>

      {status === 'loading' && <Loader count={1} />}
      {status === 'error' && <ErrorMessage onRetry={() => setAttempt((value) => value + 1)} />}
      {status === 'success' && !meal && (
        <EmptyState emoji="🍽️">
          <p>Рецепт не найден. Возможно, ссылка устарела.</p>
          <p>
            <Link to="/recipes">Вернуться к списку рецептов</Link>
          </p>
        </EmptyState>
      )}

      {status === 'success' && meal && (
        <>
          <div className="recipe-detail__head">
            <img
              className="recipe-detail__image"
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width={480}
              height={360}
            />
            <div className="recipe-detail__info">
              <h1 className="recipe-detail__title">{meal.strMeal}</h1>
              <p className="recipe-detail__meta">
                {meal.strCategory} · {meal.strArea}
              </p>
              {tags.length > 0 && (
                <ul className="recipe-detail__tags">
                  {tags.map((tag) => (
                    <li key={tag} className="recipe-detail__tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
              <div className="recipe-detail__actions">
                <FavoriteButton
                  meal={{
                    idMeal: meal.idMeal,
                    strMeal: meal.strMeal,
                    strMealThumb: meal.strMealThumb,
                    strCategory: meal.strCategory ?? '',
                  }}
                />
                {meal.strYoutube && (
                  <a
                    className="recipe-detail__video-link"
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ▶ Видеорецепт
                  </a>
                )}
              </div>
            </div>
          </div>

          <section className="recipe-detail__section" aria-labelledby="ingredients-heading">
            <h2 className="recipe-detail__subtitle" id="ingredients-heading">
              Ингредиенты
            </h2>
            <ul className="recipe-detail__ingredients">
              {extractIngredients(meal).map(({ name, measure }) => (
                <li key={name} className="recipe-detail__ingredient">
                  <span className="recipe-detail__ingredient-name">{name}</span>
                  <span className="recipe-detail__ingredient-measure">{measure}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="recipe-detail__section" aria-labelledby="instructions-heading">
            <h2 className="recipe-detail__subtitle" id="instructions-heading">
              Как готовить
            </h2>
            {splitInstructions(meal).map((paragraph, index) => (
              <p key={index} className="recipe-detail__step">
                {paragraph}
              </p>
            ))}
          </section>
        </>
      )}
    </article>
  );
}
