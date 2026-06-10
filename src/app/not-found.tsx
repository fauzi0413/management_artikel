import Link from "next/link";

export default function NotFound() {
  return (
    <div className="error-page">
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>
        Sorry, the page you are looking for does not exist
        or may have been moved.
      </p>

      <Link href="/" className="error-btn">
        Back to Home
      </Link>
    </div>
  );
}