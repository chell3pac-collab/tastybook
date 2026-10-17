const FAVORITES_KEY = 'tastybook.favorites.v1';

/** Проверка, что объект похож на краткую карточку рецепта */
export function isMealSummary(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.idMeal === 'string' &&
    typeof value.strMeal === 'string' &&
    typeof value.strMealThumb === 'string'
  );
}

export function loadFavorites() {
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isMealSummary) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites) {
  try {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch {
    // Приватный режим или переполнение — приложение продолжает работать без сохранения
  }
}
