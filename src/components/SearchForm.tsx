"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";

interface SearchFormProps {
  initialSearch: string;
  basePath: string;
}

export default function SearchForm({
  initialSearch,
  basePath,
}: SearchFormProps) {
  const [search, setSearch] =
    useState(initialSearch);

  return (
    <form
      action={basePath}
      className="search-form"
    >
      <div className="search-wrapper">
        <input
          type="text"
          name="search"
          placeholder="Cari artikel..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="search-input"
        />

        {search && (
          <Link
            href={basePath}
            className="clear-search"
            onClick={() => {
              setSearch("");
            }}
          >
            <FaTimes />
          </Link>
        )}
      </div>

      <button
        type="submit"
        className="search-btn"
      >
        Search
      </button>
    </form>
  );
}