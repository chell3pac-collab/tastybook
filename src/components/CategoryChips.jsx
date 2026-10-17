import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryChips({ categories, activeCategory = '' }) {
  return (
    <nav className="category-chips" aria-label="Категории рецептов">
      <ul className="category-chips__list">
        {categories.map((category) => (
          <li key={category}>
            <Link
              to={`/recipes?c=${encodeURIComponent(category)}`}
              className={`category-chips__chip${
                category === activeCategory ? ' category-chips__chip--active' : ''
              }`}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
