import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch.js';
import { fetchCategories, fetchMealsByCategory, searchMeals } from '../lib/api.js';
import { paginate } from '../lib/utils.js';
import SearchForm from '../components/SearchForm.jsx';
import CategoryChips from '../components/CategoryChips.jsx';
import RecipeGrid from '../components/RecipeGrid.jsx';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import EmptyState from '../components/EmptyState.jsx';
import Pagination from '../components/Pagination.jsx';

export default function RecipesPage() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('q') ?? '').trim();
  const category = (searchParams.get('c') ?? '').trim();
  const requestedPage = Number(searchParams.get('page') ?? '1') || 1;

  const [attempt, setAttempt] = useState(0);

  const categoriesState = useFetch((signal) => fetchCategories(signal), [attempt]);
  const categoryNames = useMemo(
    () => (categoriesState.data ?? []).map((item) => item.strCategory),
    [categoriesState.data]
  );

  // Один источник данных: поиск, категория или галерея категорий
  const listState = useFetch(
    async (signal) => {
      if (query) {
        return searchMeals(query, signal);
      }
      if (category) {
        return fetchMealsByCategory(category, signal);
      }
      return null; // стартовый вид — покажем галерею категорий
    },
    [query, category, attempt]
  );

  const view = useMemo(() => {
    if (!listState.data) {
      return null;
    }
    return paginate(listState.data, requestedPage);
  }, [listState.data, requestedPage]);

  const isDefaultView = !query && !category;

  return (
    <section className="page-block" aria-labelledby="recipes-heading">
      <h1 className="page-title" id="recipes-heading">
        Рецепты
      </h1>

      <SearchForm />

      {!query && (
        <CategoryChips categories={categoryNames} activeCategory={category} />
      )}

      {query && (
        <p className="page-block__hint">
          Результаты поиска: «{query}»
        </p>
      )}
      {category && (
        <p className="page-block__hint">
          Категория: <Link to="/recipes">сбросить</Link>
        </p>
      )}

      {listState.status === 'loading' && <Loader />}

      {listState.status === 'error' && (
        <ErrorMessage onRetry={() => setAttempt((value) => value + 1)} />
      )}

      {listState.status === 'success' && listState.data === null && categoriesState.status === 'success' && (
        <section className="category-gallery" aria-label="Категории рецептов">
          <ul className="category-gallery__list">
            {categoriesState.data.map((item) => (
              <li key={item.idCategory}>
                <Link
                  to={`/recipes?c=${encodeURIComponent(item.strCategory)}`}
                  className="category-card"
                >
                  <img
                    className="category-card__image"
                    src={item.strCategoryThumb}
                    alt={item.strCategory}
                    loading="lazy"
                    width={240}
                    height={180}
                  />
                  <span className="category-card__name">{item.strCategory}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {listState.status === 'success' && listState.data && view && (
        view.items.length > 0 ? (
          <>
            <RecipeGrid meals={view.items} />
            <Pagination page={view.page} total={view.total} />
          </>
        ) : (
          <EmptyState>
            <p>
              Ничего не нашлось по запросу «{query || category}». Попробуй другое слово или выбери
              категорию.
            </p>
          </EmptyState>
        )
      )}

      {isDefaultView && categoriesState.status === 'success' && (
        <p className="page-block__hint page-block__hint--center">
          Выбери категорию или введи название блюда в поиск.
        </p>
      )}
    </section>
  );
}
