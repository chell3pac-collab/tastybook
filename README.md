## Стек

- **Vite 5** + **React 18** (JavaScript)
- **React Router v6** — переходы между страницами, URL-состояние (поиск, категория, страница пагинации — всё в query-параметрах)
- **SCSS + БЭМ** (один блок — один файл)
- Данные: **TheMealDB API** (fetch + AbortController), избранное — **localStorage**

## Страницы

- `/` — главная: поиск, «Блюдо дня» (случайный рецепт с кнопкой обновления), категории
- `/recipes` — галерея категорий; с параметрами `?q=поиск`, `?c=категория`, `?page=N` — результаты с клиентской пагинацией
- `/recipes/:id` — детальная карточка: фото, категория, кухня, теги, ингредиенты с мерами, пошаговые инструкции, ссылка на видеорецепт
- `/favorites` — избранное из localStorage
- `*` — страница 404

## Что внутри (технически интересное)

- Кастомный хук `useFetch(fetcher, deps)`: состояния loading/error/success, отмена запросов через AbortController
- Единый API-модуль `lib/api.js` — единственное место, знающее про TheMealDB
- Контекст `FavoritesContext` с ленивой инициализацией и синхронизацией в localStorage
- Состояние списка рецептов полностью в URL (`useSearchParams`) — ссылку с поиском можно скинуть другу
- Скелетоны загрузки, обработка ошибок с ретраем, пустые состояния, 404
- Доступность: `role="search"`, `aria-label`, `aria-pressed` на кнопках избранного, `aria-current` в пагинации, focus-visible, `prefers-reduced-motion`
- Адаптив mobile-first: контейнер через `min()`, сетки через `auto-fill` + `minmax`, детальная страница перестраивается от 760px

## Запуск

```bash
npm install
npm run dev
```

Открой http://localhost:5173

## Структура

```
src/
  main.jsx              — точка входа: роутер, провайдер избранного, стили
  App.jsx               — каркас: шапка, Routes, футер
  pages/                — 5 страниц (Home, Recipes, Detail, Favorites, 404)
  components/           — 10 переиспользуемых компонентов
  context/              — FavoritesContext
  hooks/                — useFetch
  lib/                  — api.js (единственный слой доступа к API), favorites.js, utils.js
  styles/
    main.scss           — точка сборки стилей
    globals.scss        — токены, reset, утилиты
    blocks/             — по одному SCSS-файлу на БЭМ-блок
```
