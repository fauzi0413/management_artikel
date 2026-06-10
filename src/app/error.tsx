"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="error-page">
      <h1>500</h1>

      <h2>Something Went Wrong</h2>

      <p>
        An unexpected error occurred while processing
        your request.
      </p>

      <div className="error-actions">
        <button
          onClick={() => reset()}
          className="error-btn"
        >
          Try Again
        </button>

        <Link
          href="/"
          className="error-btn secondary"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}