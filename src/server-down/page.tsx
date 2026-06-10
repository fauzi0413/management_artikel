import Link from "next/link";

export default function ServerDownPage() {
  return (
    <div className="error-page">
      <h1>503</h1>

      <h2>Service Temporarily Unavailable</h2>

      <p>
        We are currently performing maintenance.
        Please try again later.
      </p>

      <Link href="/" className="error-btn">
        Back Home
      </Link>
    </div>
  );
}