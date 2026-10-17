import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Pagination({ page, total }) {
  const [searchParams, setSearchParams] = useSearchParams();

  if (total <= 1) {
    return null;
  }

  function goTo(newPage) {
    if (newPage === page) {
      return;
    }
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', String(newPage));
    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const pages = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <nav className="pagination" aria-label="Постраничная навигация">
      <button
        type="button"
        className="pagination__arrow"
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        aria-label="Предыдущая страница"
      >
        ←
      </button>

      <ul className="pagination__list">
        {pages.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              type="button"
              className={`pagination__page${
                pageNumber === page ? ' pagination__page--current' : ''
              }`}
              onClick={() => goTo(pageNumber)}
              aria-current={pageNumber === page ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="pagination__arrow"
        onClick={() => goTo(page + 1)}
        disabled={page === total}
        aria-label="Следующая страница"
      >
        →
      </button>
    </nav>
  );
}
