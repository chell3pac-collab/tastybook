import { useEffect, useState } from 'react';

const IDLE = { status: 'idle', data: null, error: null };

/**
 * Универсальный хук загрузки данных.
 * fetcher — функция (signal) => Promise; каждый fetch получает свой AbortController.
 * При смене deps или размонтировании запрос отменяется — состояние не «гоняется».
 */
export function useFetch(fetcher, deps) {
  const [state, setState] = useState(IDLE);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading', data: null, error: null });

    fetcher(controller.signal)
      .then((data) => {
        setState({ status: 'success', data, error: null });
      })
      .catch((error) => {
        if (error && error.name === 'AbortError') {
          return; // запрос отменили — это не ошибка
        }
        setState({ status: 'error', data: null, error });
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
