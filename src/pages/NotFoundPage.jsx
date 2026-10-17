import React from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';

export default function NotFoundPage() {
  return (
    <EmptyState emoji="🧭">
      <p>Такой страницы нет. Попробуй начать с главной.</p>
      <p>
        <Link to="/">На главную</Link>
      </p>
    </EmptyState>
  );
}
