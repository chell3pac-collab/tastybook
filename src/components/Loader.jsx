import React from 'react';

/** Скелетон-сетка на время загрузки */
export default function Loader({ count = 8 }) {
  return (
    <ul className="loader" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <li key={index} className="recipe-card recipe-card--skeleton" />
      ))}
    </ul>
  );
}
