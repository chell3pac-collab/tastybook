import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <p className="footer__text">
          TastyBook — учебный проект. Данные предоставлены
          {' '}
          <a
            className="footer__link"
            href="https://www.themealdb.com/api.php"
            target="_blank"
            rel="noreferrer"
          >
            TheMealDB
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
