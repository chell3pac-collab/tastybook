const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

async function request(url, signal) {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`);
  }
  return response.json();
}

/** Поиск рецептов по названию. Пустой результат — пустой массив. */
export async function searchMeals(query, signal) {
  const data = await request(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`, signal);
  return data.meals ?? [];
}

/** Рецепты выбранной категории */
export async function fetchMealsByCategory(category, signal) {
  const data = await request(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`, signal);
  return data.meals ?? [];
}

/** Полные данные рецепта по id или null */
export async function fetchMealById(id, signal) {
  const data = await request(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`, signal);
  return data.meals?.[0] ?? null;
}

/** Список категорий с картинками и описаниями */
export async function fetchCategories(signal) {
  const data = await request(`${BASE_URL}/categories.php`, signal);
  return data.categories ?? [];
}

/** Случайный рецепт — для «Блюда дня» */
export async function fetchRandomMeal(signal) {
  const data = await request(`${BASE_URL}/random.php`, signal);
  return data.meals?.[0] ?? null;
}

/** strIngredient1..20 + strMeasure1..20 → массив { name, measure } */
export function extractIngredients(meal) {
  const items = [];
  for (let i = 1; i <= 20; i += 1) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (typeof name === 'string' && name.trim()) {
      items.push({ name: name.trim(), measure: typeof measure === 'string' ? measure.trim() : '' });
    }
  }
  return items;
}

/** Инструкции API хранит одной строкой с переносами — делим на абзацы */
export function splitInstructions(meal) {
  const text = typeof meal.strInstructions === 'string' ? meal.strInstructions : '';
  return text
    .split(/\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
