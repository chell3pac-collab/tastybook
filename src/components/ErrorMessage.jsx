import React from 'react';

export default function ErrorMessage({ onRetry }) {
  return (
    <div className="status-box" role="alert">
      <span className="status-box__emoji" aria-hidden="true">
        😵
      </span>
      <p className="status-box__text">
        Не удалось загрузить данные. Проверь соединение и попробуй ещё раз.
      </p>
      {onRetry && (
        <button type="button" className="status-box__button" onClick={onRetry}>
          Обновить
        </button>
      )}
    </div>
  );
}
