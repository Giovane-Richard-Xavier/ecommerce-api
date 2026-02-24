export function buildPaginationMeta(
  totalItems: number,
  currentPage: number,
  itemsPerPage: number,
  itemCount: number,
) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return {
    totalItems,
    itemCount,
    itemsPerPage,
    totalPages,
    currentPage,
  };
}
