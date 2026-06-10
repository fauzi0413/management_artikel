import Link from "next/link";
import { getPageNumbers } from "@/lib/pagination";

interface PaginationProps {
  page: number;
  totalPages: number;
  basePath: string;
  search?: string;
}

export default function Pagination({
  page,
  totalPages,
  basePath,
  search,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const createUrl = (pageNum: number) => {
    const query = new URLSearchParams();

    query.set("page", String(pageNum));

    if (search) {
      query.set("search", search);
    }

    return `${basePath}?${query.toString()}`;
  };

  return (
    <div className="pagination">
      {page > 1 && (
        <Link
          href={createUrl(page - 1)}
          className="pagination-nav"
        >
          ← Prev
        </Link>
      )}

      {getPageNumbers(
        page,
        totalPages,
      ).map((item, index) =>
        item === "..." ? (
          <span
            key={index}
            className="pagination-dots"
          >
            ...
          </span>
        ) : (
          <Link
            key={index}
            href={createUrl(Number(item))}
            className={`pagination-number ${
              page === item
                ? "active"
                : ""
            }`}
          >
            {item}
          </Link>
        )
      )}

      {page < totalPages && (
        <Link
          href={createUrl(page + 1)}
          className="pagination-nav"
        >
          Next →
        </Link>
      )}
    </div>
  );
}