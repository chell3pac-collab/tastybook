import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch.js';
import { fetchCategories, fetchRandomMeal } from '../lib/api.js';
import SearchForm from '../components/SearchForm.jsx';
import CategoryChips from '../components/CategoryChips.jsx';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

export default function HomePage() {
  const [attempt, setAttempt] = useState(0);

  const randomState = useFetch((signal) => fetchRandomMeal(signal), [attempt]);
  const categoriesState = useFetch((signal) => fetchCategories(signal), []);
  const categoryNames = (categoriesState.data ?? []).map((category) => category.strCategory);

  const meal = randomState.data;

  return (
    <>
      <section className="hero">
        <div className="hero__inner container">
          <h1 className="hero__title">Готовим без суеты</h1>
          <p className="hero__text">
            Ищи рецепты по названию или выбирай категорию — TastyBook подскажет, как это готовить.
          </p>
          <SearchForm placeholder="Что приготовим сегодня?" />
        </div>
      </section>

      <section className="container page-block" aria-labelledby="dish-of-day-heading">
        <h2 className="section-title" id="dish-of-day-heading">
          Блюдо дня
        </h2>

        {randomState.status === 'loading' && <Loader count={1} />}
        {randomState.status === 'error' && (
          <ErrorMessage onRetry={() => setAttempt((value) => value + 1)} />
        )}
        {randomState.status === 'success' && meal && (
          <div className="dish-of-day">
            <img
              className="dish-of-day__image"
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width={480}
              height={360}
            />
            <div className="dish-of-day__info">
              <h3 className="dish-of-day__name">{meal.strMeal}</h3>
              <p className="dish-of-day__meta">
                {meal.strCategory} · {meal.strArea}
              </p>
              <div className="dish-of-day__actions">
                <Link className="dish-of-day__link" to={`/recipes/${meal.idMeal}`}>
                  Смотреть рецепт
                </Link>
                <button
                  type="button"
                  className="dish-of-day__refresh"
                  onClick={() => setAttempt((value) => value + 1)}
                >
                  Другое блюдо
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="container page-block" aria-labelledby="home-categories-heading">
        <h2 className="section-title" id="home-categories-heading">
          Категории
        </h2>
        <CategoryChips categories={categoryNames} />
        <p className="home-hint">
          <Link className="home-hint__link" to="/recipes">
            Смотреть все рецепты →
          </Link>
        </p>
      </section>
    </>
  );
}
