export const PER_PAGE = 12;

/** Клиентская пагинация: режем массив на страницы и защищаемся от кривого номера */
export function paginate(items, page, perPage = PER_PAGE) {
  const total = Math.max(1, Math.ceil(items.length / perPage));
  const safePage = Math.min(Math.max(1, page), total);
  const start = (safePage - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    page: safePage,
    total,
  };
}
