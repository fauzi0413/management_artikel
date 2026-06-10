export function getPageNumbers(
  page: number,
  totalPages: number
): (number | string)[] {
  const pages: (number | string)[] = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

  if (page <= 3) {
    pages.push(
      1,
      2,
      3,
      4,
      "...",
      totalPages
    );
  } else if (page >= totalPages - 2) {
    pages.push(
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    );
  } else {
    pages.push(
      1,
      "...",
      page - 1,
      page,
      page + 1,
      "...",
      totalPages
    );
  }

  return pages;
}