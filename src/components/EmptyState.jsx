import React from 'react';

export default function EmptyState({ emoji = '🔍', children }) {
  return (
    <div className="status-box">
      <span className="status-box__emoji" aria-hidden="true">
        {emoji}
      </span>
      <div className="status-box__text">{children}</div>
    </div>
  );
}
