import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const linkClass = ({ isActive }) =>
    `header__link${isActive ? ' header__link--active' : ''}`;

  return (
    <header className="header">
      <div className="header__inner container">
        <Link to="/" className="header__logo">
          Tasty<span className="header__logo-accent">Book</span>
        </Link>
        <nav className="header__nav" aria-label="Основная навигация">
          <NavLink to="/" end className={linkClass}>
            Главная
          </NavLink>
          <NavLink to="/recipes" className={linkClass}>
            Рецепты
          </NavLink>
          <NavLink to="/favorites" className={linkClass}>
            Избранное
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
