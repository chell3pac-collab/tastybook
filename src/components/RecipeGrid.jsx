import React from 'react';
import RecipeCard from './RecipeCard.jsx';

export default function RecipeGrid({ meals }) {
  return (
    <ul className="recipe-grid">
      {meals.map((meal) => (
        <li key={meal.idMeal}>
          <RecipeCard meal={meal} />
        </li>
      ))}
    </ul>
  );
}
