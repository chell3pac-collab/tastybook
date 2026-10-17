import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SearchForm({ placeholder = 'Например, «паста»' }) {
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('q') ?? '');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const query = value.trim();
    navigate(query ? `/recipes?q=${encodeURIComponent(query)}` : '/recipes');
  }

  return (
    <form className="search-form" role="search" onSubmit={handleSubmit}>
      <label className="search-form__label visually-hidden" htmlFor="recipe-search">
        Поиск рецептов по названию
      </label>
      <input
        className="search-form__input"
        id="recipe-search"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        maxLength={60}
      />
      <button type="submit" className="search-form__submit">
        Найти
      </button>
    </form>
  );
}
